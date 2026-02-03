#!/usr/bin/env node
/**
 * CV Parser Pipeline
 *
 * Parses cv_web.docx and updates leadProfessor.ts and members.ts
 *
 * Usage:
 *   node scripts/parse-cv.js                    # Parse and update data files
 *   node scripts/parse-cv.js --dry-run          # Preview changes without writing
 *   node scripts/parse-cv.js --section members  # Only update members
 *   node scripts/parse-cv.js --section lead     # Only update lead professor
 *   node scripts/parse-cv.js --preserve-members # Keep existing members.ts, only update lead
 */

const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, 'cv-parser-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// CLI args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const preserveMembers = args.includes('--preserve-members');
const sectionFilter = args.includes('--section')
  ? args[args.indexOf('--section') + 1]
  : 'all';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function slugify(name) {
  return name.toLowerCase()
    .replace(/^dr\.?\s*/i, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\t/g, ' ')
    .trim();
}

function matchesAnyPattern(text, patterns) {
  const lowerText = text.toLowerCase();
  return patterns.some(p => lowerText.includes(p.toLowerCase()));
}

// ============================================================================
// DOCX PARSING
// ============================================================================

async function parseDocx(docxPath) {
  const fullPath = path.resolve(__dirname, '..', docxPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`DOCX file not found: ${fullPath}`);
  }

  console.log(`📄 Reading: ${fullPath}`);

  const result = await mammoth.extractRawText({ path: fullPath });
  const text = result.value;

  // Split into lines and clean
  const lines = text.split('\n')
    .map(line => cleanText(line))
    .filter(line => line.length > 0);

  console.log(`   Found ${lines.length} lines of text`);

  return { text, lines };
}

// ============================================================================
// SECTION DETECTION - More flexible matching
// ============================================================================

function detectSections(lines) {
  const sections = {};
  let currentSection = null;
  let currentItems = [];

  // Known section headers in order of appearance
  const sectionOrder = [
    'Research Focus and Objectives',
    'Externally Funded Projects (since 2015)',
    'Proposals under Review',
    'Proposals in Preparation',
    'Publications',
    'Chapters in Books',
    'Journal Papers',
    'Review Articles in Journals',
    'Selected Papers in Conferences',
    'Report',
    'Datasets and Codes',
    'Modules Taught',
    'New Programme / Modules Developed',
    'Teaching Innovation and Pedagogy',
    'Nomination and Awards',
    'Other Contributions',
    'Examination of BSc and MSc Programmes',
    'PhD/MPhil Examination',
    'Postgraduate Research', // Contains member data - excluded from lead profile
    'Administrative Responsibilities',
    'Theme Leads',
    'Honours and Awards',
    'Membership and Official Positions',
    'External Activities',
    'Invited Keynote Addresses and Talks',
    'Editorial Boards',
    'Conference Organisation and Chairing Roles',
    'Hosted Visitors and Guest Talks (since 2019)',
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Skip lines that are clearly content, not headers
    // (starts with year, contains "Now:", etc.)
    if (/^\d{4}\s*[-–]/.test(line) || lowerLine.includes('now:')) {
      if (currentSection) {
        if (line.length > 2) currentItems.push(line);
      }
      continue;
    }

    // Check if this line is a section header
    let foundSection = null;

    // First try exact match (line equals or starts with section name)
    for (const sectionName of sectionOrder) {
      const lowerSectionName = sectionName.toLowerCase();
      if (lowerLine === lowerSectionName ||
          (lowerLine.startsWith(lowerSectionName) && line.length < 60)) {
        foundSection = sectionName;
        break;
      }
    }

    // Then try pattern matching from config (more restrictive)
    if (!foundSection && line.length < 50) {
      for (const [sectionName, patterns] of Object.entries(config.sectionMappings)) {
        // For pattern matching, require line to be very short (header-like)
        // and pattern should match at word boundary
        for (const pattern of patterns) {
          const regex = new RegExp(`^${pattern}$|^${pattern}\\s|\\s${pattern}$`, 'i');
          if (regex.test(line) || lowerLine === pattern.toLowerCase()) {
            foundSection = sectionName;
            break;
          }
        }
        if (foundSection) break;
      }
    }

    if (foundSection) {
      // Save previous section
      if (currentSection && currentItems.length > 0) {
        sections[currentSection] = currentItems;
      }
      currentSection = foundSection;
      currentItems = [];
    } else if (currentSection) {
      // Add line to current section
      if (line.length > 2) {
        currentItems.push(line);
      }
    }
  }

  // Save last section
  if (currentSection && currentItems.length > 0) {
    sections[currentSection] = currentItems;
  }

  console.log(`   Detected ${Object.keys(sections).length} sections`);
  return sections;
}

// ============================================================================
// METRICS EXTRACTION
// ============================================================================

function extractMetrics(text) {
  const metrics = [];

  // Citations
  const citationsMatch = text.match(/Citations[:\s]*(\d[\d,]*)/i);
  if (citationsMatch) {
    const patentsMatch = text.match(/Times cited by patents[:\s]*(\d+)/i);
    metrics.push({
      label: 'Citations',
      value: citationsMatch[1].replace(/,/g, ''),
      note: patentsMatch ? `Times cited by patents: ${patentsMatch[1]}` : undefined
    });
  }

  // h-index
  const hIndexMatch = text.match(/h-index[:\s]*(\d+)/i);
  if (hIndexMatch) {
    const i10Match = text.match(/i10-index[:\s]*(\d+)/i);
    metrics.push({
      label: 'h-index',
      value: hIndexMatch[1],
      note: i10Match ? `i10-index: ${i10Match[1]}` : undefined
    });
  }

  // Highly Cited Papers
  const highlyCitedMatch = text.match(/(\d+)\s*(?:Web of Science\s*)?Highly Cited Papers/i);
  if (highlyCitedMatch) {
    const highestMatch = text.match(/Highest-cited paper[:\s=]*(\d+)/i);
    metrics.push({
      label: 'Highly Cited Papers',
      value: highlyCitedMatch[1],
      note: highestMatch ? `Highest-cited paper: ${highestMatch[1]}` : undefined
    });
  }

  // Total Funding
  const fundingMatch = text.match(/(?:in total|total)[:\s]*(?:GBP)?[:\s]*([\d.]+M)/i);
  if (fundingMatch) {
    const piMatch = text.match(/(\d+)\s*PI projects[^(]*\(([^)]+)\)/i);
    const coiMatch = text.match(/(\d+)\s*Co-I projects[^(]*\(([^)]+)\)/i);
    let note = '';
    if (piMatch) note += `${piMatch[1]} PI projects (${piMatch[2]})`;
    if (coiMatch) note += ` and ${coiMatch[1]} Co-I projects (${coiMatch[2]})`;

    metrics.push({
      label: 'Total Funding (GBP)',
      value: fundingMatch[1],
      note: note.trim() || undefined
    });
  }

  return metrics;
}

// ============================================================================
// MEMBER PARSING - Multiple strategies
// ============================================================================

function parseMembersFromCV(lines, text, sections) {
  const currentMembers = [];
  const graduatedMembers = [];

  // Use "Postgraduate Research" section if available
  const pgResearchLines = sections['Postgraduate Research'] || [];

  if (pgResearchLines.length === 0) {
    console.log('   No "Postgraduate Research" section found in CV');
    return { currentMembers, graduatedMembers };
  }

  let currentCategory = null;

  for (const line of pgResearchLines) {
    const lowerLine = line.toLowerCase();

    // Detect subsection headers
    if (lowerLine.includes('current lead supervision')) {
      currentCategory = 'currentPhD';
      continue;
    }
    if (lowerLine.includes('graduated phd') || lowerLine.includes('graduated mphil')) {
      currentCategory = 'graduatedPhD';
      continue;
    }
    if (lowerLine.includes('postdoctoral research fellow') && lowerLine.includes('lead supervision')) {
      // PostDocs section - we'll determine current vs graduated by period
      currentCategory = 'PostDoc';
      continue;
    }

    // Skip non-member lines
    if (!currentCategory) continue;
    if (line.length < 15) continue;
    if (lowerLine.startsWith('quote') || lowerLine.startsWith('leadership')) continue;

    // Parse member entry: "2024 – date Name, Research Topic (Funding)"
    const entryMatch = line.match(/^(\d{4})\s*[-–]\s*(date|present|\d{4})\s+(.+)$/i);
    if (!entryMatch) continue;

    const startYear = entryMatch[1];
    const endPart = entryMatch[2].toLowerCase();
    const isCurrent = endPart === 'date' || endPart === 'present';
    const period = `${startYear} - ${isCurrent ? 'present' : entryMatch[2]}`;
    const rest = entryMatch[3];

    // Extract name (up to first comma or research topic)
    let name = '';
    let research = '';
    let funding = '';
    let currentPosition = '';

    // Format: "Dr Name, Topic. Now: Position" or "Name, Topic (Funding)"
    const nameMatch = rest.match(/^(?:Dr\.?\s+|Mr\.?\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z-]+)+)/);
    if (nameMatch) {
      name = nameMatch[1].trim();
      if (rest.toLowerCase().startsWith('dr')) {
        name = 'Dr ' + name;
      }

      // Get the rest after name
      const afterName = rest.slice(nameMatch[0].length).replace(/^[,\s]+/, '');

      // Extract research topic
      const topicMatch = afterName.match(/^([^(]+?)(?:\(|Now:|$)/i);
      if (topicMatch) {
        research = cleanText(topicMatch[1].replace(/\.$/, ''));
      }

      // Extract funding (in parentheses)
      const fundingMatch = afterName.match(/\(([^)]+)\)/);
      if (fundingMatch) {
        funding = cleanText(fundingMatch[1]);
      }

      // Extract current position
      const posMatch = afterName.match(/Now:\s*(.+?)(?:\.|$)/i);
      if (posMatch) {
        currentPosition = cleanText(posMatch[1]);
      }
    }

    if (!name) continue;

    // Determine type
    let type = 'PhD';
    if (currentCategory === 'PostDoc') type = 'PostDoc';
    if (lowerLine.includes('mphil') || research.toLowerCase().includes('mphil')) type = 'MPhil';

    const member = {
      id: slugify(name),
      name,
      type,
      research: research || (type === 'PostDoc' ? `on ${funding}` : ''),
      period,
    };

    if (funding && type !== 'PostDoc') {
      member.funding = funding;
    }
    if (currentPosition) {
      member.currentPosition = currentPosition;
    }

    // Determine current vs graduated based on period, not just category
    if (isCurrent) {
      currentMembers.push(member);
    } else {
      graduatedMembers.push(member);
    }
  }

  return { currentMembers, graduatedMembers };
}

// ============================================================================
// LOAD EXISTING MEMBERS (fallback)
// ============================================================================

function loadExistingMembers() {
  const membersPath = path.resolve(__dirname, '..', config.outputDir, 'members.ts');

  if (!fs.existsSync(membersPath)) {
    return { currentMembers: [], graduatedMembers: [] };
  }

  try {
    const content = fs.readFileSync(membersPath, 'utf-8');

    // Extract arrays using regex (simple approach)
    const currentMatch = content.match(/export const currentMembers[^=]*=\s*(\[[\s\S]*?\])\s*(?=\/\/|export|$)/);
    const graduatedMatch = content.match(/export const graduatedMembers[^=]*=\s*(\[[\s\S]*?\])\s*(?=\/\/|export|$)/);

    // Use eval carefully (only on our own files)
    const currentMembers = currentMatch ? eval(currentMatch[1]) : [];
    const graduatedMembers = graduatedMatch ? eval(graduatedMatch[1]) : [];

    return { currentMembers, graduatedMembers };
  } catch (e) {
    console.warn('   ⚠️  Could not parse existing members.ts:', e.message);
    return { currentMembers: [], graduatedMembers: [] };
  }
}

function loadMembersOverride() {
  const overridePath = path.join(__dirname, 'members-override.json');

  if (!fs.existsSync(overridePath)) {
    return null;
  }

  try {
    const override = JSON.parse(fs.readFileSync(overridePath, 'utf-8'));
    if (override.enabled) {
      return {
        currentMembers: override.currentMembers || [],
        graduatedMembers: override.graduatedMembers || []
      };
    }
    return null;
  } catch (e) {
    console.warn('   ⚠️  Could not parse members-override.json:', e.message);
    return null;
  }
}

// ============================================================================
// CODE GENERATION
// ============================================================================

function generateLeadProfessorTS(sections, metrics, fullText) {
  const prof = config.leadProfessor;

  // Extract focus from Research Focus section
  const focusSection = sections['Research Focus and Objectives'] || [];
  const focus = focusSection[0] || '';

  // Build sections array, preserving order
  const sectionOrder = [
    'Research Focus and Objectives',
    'Externally Funded Projects (since 2015)',
    'Proposals under Review',
    'Proposals in Preparation',
    'Publications',
    'Chapters in Books',
    'Journal Papers',
    'Review Articles in Journals',
    'Selected Papers in Conferences',
    'Report',
    'Datasets and Codes',
    'Modules Taught',
    'New Programme / Modules Developed',
    'Teaching Innovation and Pedagogy',
    'Nomination and Awards',
    'Other Contributions',
    'Examination of BSc and MSc Programmes',
    'PhD/MPhil Examination',
    'Administrative Responsibilities',
    'Theme Leads',
    'Honours and Awards',
    'Membership and Official Positions',
    'External Activities',
    'Invited Keynote Addresses and Talks',
    'Editorial Boards',
    'Conference Organisation and Chairing Roles',
    'Hosted Visitors and Guest Talks (since 2019)',
  ];

  // Sections to exclude from lead professor profile (member data, etc.)
  const excludedSections = [
    'Research Focus and Objectives', // Already used as focus text
    'Postgraduate Research', // Contains member data, parsed separately
  ];

  const sectionsList = [];
  for (const title of sectionOrder) {
    if (sections[title] && !excludedSections.includes(title)) {
      sectionsList.push({
        title,
        items: sections[title],
        open: ['Publications', 'Research Focus and Objectives'].includes(title) ? true : undefined
      });
    }
  }

  // Add any sections not in the order (excluding excluded ones)
  for (const [title, items] of Object.entries(sections)) {
    if (!sectionOrder.includes(title) && !excludedSections.includes(title)) {
      sectionsList.push({ title, items });
    }
  }

  // Format metrics
  const metricsFormatted = metrics.map(m => {
    const obj = { label: m.label, value: m.value };
    if (m.note) obj.note = m.note;
    return obj;
  });

  // Generate TS code
  let code = `export type LeadMetric = {
  label: string
  value: string
  note?: string
}

export type LeadSection = {
  title: string
  items: string[]
  open?: boolean
}

export type LeadProfessor = {
  id: string
  name: string
  role: string
  affiliation: string
  image?: string
  focus: string
  metrics: LeadMetric[]
  roleHighlights: string[]
  sections: LeadSection[]
}

export const leadProfessor: LeadProfessor = {
  id: "member-luo",
  name: ${JSON.stringify(prof.name)},
  role: ${JSON.stringify(prof.role)},
  affiliation: ${JSON.stringify(prof.affiliation)},
  // image: ${JSON.stringify(prof.image)}, // Add image when available
  focus:
    ${JSON.stringify(focus)},
  metrics: [\n`;

  for (const m of metricsFormatted) {
    code += `    {\n`;
    code += `      label: ${JSON.stringify(m.label)},\n`;
    code += `      value: ${JSON.stringify(m.value)},\n`;
    if (m.note) {
      code += `      note: ${JSON.stringify(m.note)},\n`;
    }
    code += `    },\n`;
  }

  code += `  ],
  roleHighlights: [
    "Deputy Director of Research and Impact, Computer Science (2024 - date)",
    "Theme Lead, Centre of Environmental Intelligence (2025 - date)",
    "Theme Lead, Institute of Data Science and Artificial Intelligence (2021 - 2025)",
  ],
  sections: [\n`;

  for (const section of sectionsList) {
    code += `    {\n`;
    code += `      title: ${JSON.stringify(section.title)},\n`;
    if (section.open) {
      code += `      open: true,\n`;
    }
    code += `      items: [\n`;
    for (const item of section.items) {
      code += `        ${JSON.stringify(item)},\n`;
    }
    code += `      ],\n`;
    code += `    },\n`;
  }

  code += `  ],
}
`;

  return code;
}

function generateMembersTS(currentMembers, graduatedMembers) {
  let code = `export type MemberType = "PhD" | "PostDoc" | "MPhil"

export type Member = {
  id: string
  name: string
  type: MemberType
  research: string
  period: string
  funding?: string
  currentPosition?: string // Current position for graduated members
}

// Current members (PhD students and PostDocs)
export const currentMembers: Member[] = [\n`;

  for (const m of currentMembers) {
    code += `  {\n`;
    code += `    id: ${JSON.stringify(m.id)},\n`;
    code += `    name: ${JSON.stringify(m.name)},\n`;
    code += `    type: ${JSON.stringify(m.type)},\n`;
    code += `    research: ${JSON.stringify(m.research || '')},\n`;
    code += `    period: ${JSON.stringify(m.period || '')},\n`;
    if (m.funding) code += `    funding: ${JSON.stringify(m.funding)},\n`;
    code += `  },\n`;
  }

  code += `]

// Graduated members (PhD, MPhil, and former PostDocs)
export const graduatedMembers: Member[] = [\n`;

  for (const m of graduatedMembers) {
    code += `  {\n`;
    code += `    id: ${JSON.stringify(m.id)},\n`;
    code += `    name: ${JSON.stringify(m.name)},\n`;
    code += `    type: ${JSON.stringify(m.type)},\n`;
    code += `    research: ${JSON.stringify(m.research || '')},\n`;
    code += `    period: ${JSON.stringify(m.period || '')},\n`;
    if (m.funding) code += `    funding: ${JSON.stringify(m.funding)},\n`;
    if (m.currentPosition) code += `    currentPosition: ${JSON.stringify(m.currentPosition)},\n`;
    code += `  },\n`;
  }

  code += `]

// For backward compatibility
export const members: Member[] = [...currentMembers, ...graduatedMembers]
`;

  return code;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🚀 CV Parser Pipeline');
  console.log('=' .repeat(50));

  if (isDryRun) {
    console.log('📋 DRY RUN MODE - No files will be written\n');
  }

  try {
    // Parse DOCX
    const { text, lines } = await parseDocx(config.docxPath);

    // Detect sections
    const sections = detectSections(lines);
    console.log('\n📑 Detected Sections:');
    for (const [name, items] of Object.entries(sections)) {
      console.log(`   - ${name} (${items.length} items)`);
    }

    // Extract metrics
    const metrics = extractMetrics(text);
    console.log('\n📊 Extracted Metrics:');
    for (const m of metrics) {
      console.log(`   - ${m.label}: ${m.value}`);
    }

    // Handle members
    let currentMembers = [];
    let graduatedMembers = [];

    // Check for override first
    const override = loadMembersOverride();
    if (override) {
      console.log('\n👥 Using members-override.json');
      currentMembers = override.currentMembers;
      graduatedMembers = override.graduatedMembers;
      console.log(`   - Current: ${currentMembers.length}`);
      console.log(`   - Graduated: ${graduatedMembers.length}`);
    } else if (preserveMembers || sectionFilter === 'lead') {
      console.log('\n👥 Preserving existing members.ts');
      const existing = loadExistingMembers();
      currentMembers = existing.currentMembers;
      graduatedMembers = existing.graduatedMembers;
      console.log(`   - Current: ${currentMembers.length}`);
      console.log(`   - Graduated: ${graduatedMembers.length}`);
    } else {
      // Try parsing from CV using the Postgraduate Research section
      const parsed = parseMembersFromCV(lines, text, sections);

      if (parsed.currentMembers.length > 0 || parsed.graduatedMembers.length > 0) {
        currentMembers = parsed.currentMembers;
        graduatedMembers = parsed.graduatedMembers;
        console.log('\n👥 Parsed Members from CV:');
      } else {
        // Fallback to existing
        console.log('\n👥 No members found in CV, using existing members.ts');
        const existing = loadExistingMembers();
        currentMembers = existing.currentMembers;
        graduatedMembers = existing.graduatedMembers;
      }
      console.log(`   - Current: ${currentMembers.length}`);
      console.log(`   - Graduated: ${graduatedMembers.length}`);
    }

    // Generate output files
    const outputDir = path.resolve(__dirname, '..', config.outputDir);

    if (sectionFilter === 'all' || sectionFilter === 'lead') {
      const leadCode = generateLeadProfessorTS(sections, metrics, text);
      const leadPath = path.join(outputDir, 'leadProfessor.ts');

      if (isDryRun) {
        console.log('\n📝 Would write leadProfessor.ts');
        console.log('   Preview (first 800 chars):');
        console.log(leadCode.slice(0, 800) + '...');
      } else {
        fs.writeFileSync(leadPath, leadCode, 'utf-8');
        console.log(`\n✅ Written: ${leadPath}`);
      }
    }

    if (sectionFilter === 'all' || sectionFilter === 'members') {
      if (!preserveMembers) {
        const membersCode = generateMembersTS(currentMembers, graduatedMembers);
        const membersPath = path.join(outputDir, 'members.ts');

        if (isDryRun) {
          console.log('\n📝 Would write members.ts');
          console.log('   Preview (first 800 chars):');
          console.log(membersCode.slice(0, 800) + '...');
        } else {
          fs.writeFileSync(membersPath, membersCode, 'utf-8');
          console.log(`\n✅ Written: ${membersPath}`);
        }
      }
    }

    console.log('\n🎉 Done!');
    console.log('\n💡 Tips:');
    console.log('   - Edit scripts/cv-parser-config.json to customize section parsing');
    console.log('   - Edit scripts/members-override.json and set enabled:true to use manual member data');
    console.log('   - Use --preserve-members to only update leadProfessor.ts');
    console.log('   - Members can also be directly edited in src/data/members.ts');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
