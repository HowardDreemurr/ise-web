# Research Statement — Source Content

Extracted from `2024 Research Statement.pptx` and reorganized to match the website sections defined in `struct/`. This file is **content reference**, not a final schema — paste segments into `content/*.md` files as Keystatic data.

---

## 1. Home page — Vision (hero + intro)

### Hero headline
> Novel machine learning and intelligent sensing methods for acquiring and processing **environmental observations**.

### Hero subheading
We envision these scientific investigations to advance important real-world applications including **natural disaster management, environment protection, and digital economy**.

### Three Vision Pillars (current home page cards)
Used as the three Research Areas (`content/research-areas/`).

| Pillar | One-line | Goals |
|---|---|---|
| **Sensing & Observation** | Autonomous vehicles, IoT sensors and networking for environmental data acquisition | Better coverage |
| **Processing & Analysis** | Machine learning models and benchmark datasets for environmental data interpretation | Higher resolution, accuracy |
| **Decision Making** | Actionable insights for disaster response, environmental protection, sustainable development | Timelier processing |

The PPT keywords for the trio are: **better performance, timelier processing, higher resolution.**

### UN SDG alignment
The research directly contributes to multiple UN Sustainable Development Goals. Most-cited in projects:
- **SDG 2** — Zero Hunger (precision agriculture)
- **SDG 8** — Decent Work & Economic Growth (KTP, digital economy)
- **SDG 11** — Sustainable Cities & Communities
- **SDG 13** — Climate Action
- **SDG 15** — Life on Land (forestry, woodland creation)

---

## 2. Research roadmap (4 stages)

This is the narrative arc behind the group — useful as an "About / Story" section, or as a longer-form intro on `/research`.

| Stage | Focus | Topics |
|---|---|---|
| **Stage 1** | Single UAV systems | Localisation · Control · Communication · Emergency landing |
| **Stage 2** | Multi-UAV systems | Formation control · Swarm intelligence · Inter-vehicle communication · Cooperative behaviours |
| **Stage 3** | Heterogeneous autonomous systems | Collaborative frameworks across UAV / UGV / USV; communication architectures |
| **Stage 4 (current)** | Intelligent cooperative agents | Software + hardware agents · Federated agents · Cooperative agents · Distributed decision-making |

Long-form summary (paste into `/research` intro):

> My research initially focused on single unmanned aerial vehicle systems, with emphasis on localization, control, communication, and emergency landing strategies. It subsequently progressed to multi-UAV systems, addressing formation control, swarm intelligence, and inter-vehicle communication and cooperative behaviours. In the third stage, the research expanded to heterogeneous autonomous systems, involving the design of collaborative frameworks and communication architectures among unmanned aerial vehicles, unmanned ground vehicles, and unmanned surface vessels. The work has further advanced towards cooperative paradigms integrating software and hardware agents, with a particular focus on intelligent control, coordination, and distributed decision-making.
>
> In parallel, the group pushes the frontiers of processing and analysis of data acquired by unmanned vehicular systems and sensor platforms, addressing accurate and challenging problems in environmental monitoring, climate-change analysis, and related Earth-observation applications.

Applications & Impacts (downstream of stage 4): **Environmental monitoring · Climate-change analysis · Earth-observation applications**.

---

## 3. Research area: Sensing & Observations (`area-sensing-observations`)

**Subtitle** — Autonomous vehicles, IoT sensors, and networking for environmental monitoring.

**Description** — This area covers the data-acquisition stack: airborne and ground autonomous platforms, IoT sensor networks, and the wireless infrastructure that makes large-scale, real-time observation possible.

### Sub-themes & flagship work

#### A. Autonomous vehicles & optimisation strategies
- **UAV-based wireless network for disaster management** — Bridging communication where infrastructure is degraded
- **Vehicular network with mobile computing (Deep RL)** — Offloading scheduling for vehicular edge computing
- **Bird-flock-inspired autonomous vehicle coordination & formation**
- **Future networks supported by a swarm of autonomous vehicles**

Key papers:
- Zhan W. et al. *Deep-Reinforcement-Learning-Based Offloading Scheduling for Vehicular Edge Computing*, IEEE IoT Journal, 2020. **Highly Cited (340+ citations)**
- Luo C., Miao W., Ullah H., McClean S., Parr G., Min G. *UAVs for Disaster Management*. In *Geological Disaster Monitoring Based on Sensor Networks*, 83–107.
- Wu J., Luo C., Luo Y., Li K. *Distributed UAV swarm formation and collision avoidance over fixed and switching topologies*, IEEE Trans. Cybernetics, 2021.
- Miao W., Luo C., Min G., Zhao Z. *Lightweight 3-D Beamforming for 5G UAV Broadcasting*, IEEE Trans. Broadcasting, 2020.

#### B. IoT sensors & networking
- **IoT sensor network for real-time monitoring of land/water movement (SENSUM project)**
- **Large-scale collaborative network for environment observation**
- **IoT hardware** — *Slidecube* (sensor part: 13×23 mm, 3 g) and motion-sensor tags

Key papers:
- Li Z., Min G., Ren P., Luo C. et al. *Ubiquitous and Robust UxV Networks: Overviews, Solutions, Challenges, and Opportunities*, IEEE Network, 2024.
- Zhang J., Luo C., Carpenter M., Min G. *Federated Learning for Distributed IIoT Intrusion Detection*, IEEE Trans. Industrial Informatics, 2022.
- Newby K., Bennett G., Roskilly K., Sgarabotto A., Luo C., Manzella I. *Smart boulders for real-time detection of hazardous landslide movement*, EGU 2024.
- Sgarabotto A., Manzella I., Roskilly K., Clark M.J., Bennett G.L., Luo C., Franco A.M. *Evaluating the use of smart sensors in ground-based monitoring of landslide movement*, EGUsphere, 2023.

---

## 4. Research area: Processing & Analysis (`area-processing-analysis`)

**Subtitle** — Machine learning models and benchmark datasets for accurate environmental data interpretation.

**Description** — This area builds the algorithmic and benchmark layer: from ML models trained on remote-sensing imagery to publicly released datasets that enable the community to make progress.

### Sub-themes & flagship work

#### A. Benchmark datasets (group-released)
- **VisualWind** — CCTV video dataset covering 11 categories of wind, for visual anemometry
- **SWED — Sentinel-2 Water Edges Dataset** — Coastline detection in satellite imagery
- **DisasterScope** — Disaster images captured by UAVs
- (See § 6 for download links)

#### B. ML models for environmental analysis
- **Remote-sensing scene classification using CNNs** — currently the 2nd highest-cited paper in the journal
- **Super-resolution of remote-sensing images** (Sentinel-2 + Planet)
- **ML models predicting whole-life carbon emissions** for buildings
- **Optical-flow-based assessment of movement** using deep flow networks

Key papers:
- Yu X., Wu X., Luo C., Ren P. *Deep learning in remote sensing scene classification: a data-augmentation enhanced CNN framework*, GIScience & Remote Sensing 54(5), 741–758.
- Zhang Q., Xu J., Crane M., Luo C. *See the wind: Wind-scale estimation with optical flow and the VisualWind dataset*, Science of the Total Environment vol. 846, 2022. (IF 10.2)
- Zhang H., Luo C., Wang Q., Kitchin M., Parmley A., Monge-Alvarez J. *Novel infrared video surveillance system using deep learning*, Multimedia Tools & Applications 77, 26657–26676.
- Seale C., Redfern T., Chatfield P., Luo C., Dempsey K. *Coastline detection in satellite imagery: a deep-learning approach on new benchmark data*, Remote Sensing of Environment vol. 278, 113044 (2022).
- Liu Z., Luo C., Min G., Liu Z., Li Z. *DisasterScope: A Comprehensive Dataset and RTMDet-based Methodology for Object Detection in Disaster-Related Remote Sensing Images*, IGARSS 2024.

---

## 5. Research area: Decision Making (`area-decision-making`)

This area is currently in `struct/` but has no PPT page — it's the integrative layer where sensing + processing produce actionable insights. Suggested description (drafted, please review):

**Subtitle** — Translating environmental observations and ML predictions into operational decisions for disaster response, sustainability, and policy.

**Description** —
> The Decision Making theme closes the loop from observation to action. We combine multimodal predictions, uncertainty quantification, and domain-specific decision frameworks to drive real-world outcomes: triggering early warnings for landslides, prioritising woodland-creation investment, optimising irrigation in rural communities, and quantifying climate-tipping risks. This pillar is where research outputs become impact.

Anchor projects: **INSTANT** (landslide prediction), **Wildfire Risk Minimisation with IBM/Met Office**, **NEOM Vegetation Change Detection**, **REFINE** (air-quality monitoring).

---

## 6. Industry Impacts (PPT slide 10)

These map directly to the `Impact.md` schema (`impact-*` files).

| ID seed | Title | Partner | Outcome |
|---|---|---|---|
| `impact-treescapes` | Automated AI-Generated 3-D Tree-Scapes for Woodland Creation | SpaceClipper Ltd. (UKRI Innovate UK) | Generative AI tool to visualise treescapes/forests for forest planning and carbon markets |
| `impact-rebuilds` | Automated rebuilding insurance estimation from satellite imagery | RiskStop / Rebuild Cost Assessment Ltd. (UKRI KTP) | ML pipeline that halves desktop survey time; KTP graded **Very Good** by Innovate UK |
| `impact-woodland-creation` | Woodland-creation suitability with ML + Earth observation | SpaceClipper Ltd. | Suitability-assessment algorithm for woodland investment |
| `impact-thales-atd-atr` | Thales Challenge — Low-pixel Automatic Target Detection & Recognition (ATD/ATR) | CENSIS + Thales (Scottish Funding Council) | Software product; **Knowledge Transfer Medal**; 0.5% market-share gain (~€455M). Showcase: NIR image for extremely small object detection |
| `impact-wildfire` | Wildfire Risk Minimisation with Geospatial Foundation Models | IBM Research UK + Met Office + PML | Integration into Met Office digital twin (TWINE); REF impact case study in development |
| `impact-neom` | NEOM Vegetation Change Detection Tool | NEOM Community | Remote-sensing-based change-detection software measuring re-greening in Saudi Arabia |
| `impact-digital-id` | Building Digital Identities | Coelition (ESRC IAA) | Report on digital identities for refugees; cited in ICRC Handbook on data protection in humanitarian action; talk at UN ID2020 Summit |

---

## 7. Code & Data Access (PPT slide 11) → `Resources`

Map to `content/resources/*.md`.

### Code repositories (`type: code`)
| ID | Title | Link |
|---|---|---|
| `res-sdvn-platform` | Software-Defined Vehicular Network simulator (SDVN) | https://github.com/a824899245/SDVN-platform |
| `res-fed-tradaboost` | Federated learning framework (FedTradaBoost) | https://github.com/LaplaceZhang/FedTradaBoost |
| `res-sentinel-classifier` | Deep-learning Sentinel-2 land-cover classifier | https://github.com/HowardDreemurr/SentinelClassifier |
| `res-disaster-display` | Global natural-disaster map | https://github.com/lc796/disaster_display_backend |

### Datasets (`type: dataset`)
| ID | Title | Link / Reference |
|---|---|---|
| `res-swed` | **SWED — Sentinel-2 Water Edges Dataset** (16 training + 98 test scenes, globally distributed) | https://openmldata.ukho.gov.uk · Seale et al., RSE 2022, 113044 |
| `res-visualwind` | **VisualWind** — 6,000 labelled video clips, 11 wind classes (Beaufort scale) | https://sme.uds.exeter.ac.uk/folders/48caf5102d6196b9645fab1f46e494ec · Zhang et al., STOTEN 2022 |
| `res-disasterscope` | **DisasterScope** — Aerial UAV dataset of natural disasters | Liu et al., IGARSS 2024 (Paper #2265) |
| `res-granite-ocean` | **Granite-geospatial-ocean** — Transformer-based geospatial foundation model on Sentinel-3 OLCI/SLSTR | https://huggingface.co/ibm-granite/granite-geospatial-ocean (11,000+ downloads in Oct 2025) |

> "The code and hard work were mostly done by my students and postdocs!" — credit line worth keeping on `/resources`.

---

## 8. Awards & Recognitions (PPT slide 12)

Map to `content/awards/*.md`.

- **Thales Award** — Scottish Funding Council Knowledge Transfer Medal (2018), for Thales-Challenge ATD/ATR project
- **UN Award** — UN Sustainability award (year per CV reference)
- **Highly Cited Author** — Web of Science Highly Cited (multiple papers)
- **Top 2% Stanford** — Top 2% Scientists list
- **Editorial roles** — multiple editorial board memberships (see CV § 2.D for full list)
- **Exeter–Tsinghua Fellowship** — 2017-2018

---

## 9. Collaborations (PPT slide 13)

Slide is graphical only — populate from CV: NEOM Community, Horizon Europe, IBM Research UK, Met Office, Plymouth Marine Laboratory, Ordnance Survey, BT, Thales, CENSIS, SpaceClipper, RCA, NEODAAS, Royal Society, EPSRC, NERC, Innovate UK, etc.

---

## 10. Contact (PPT slide 14)

Email: **C.Luo@Exeter.ac.uk**
