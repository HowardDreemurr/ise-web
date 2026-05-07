"""One-shot helper to seed content/projects, content/publications,
content/awards, content/impact, content/resources, content/events from
the data extracted in struct/source/cv-content.md.
Run: python scripts/gen-content.py
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"


def yq(v) -> str:
    """Quote a YAML scalar safely: wrap in double quotes, escape backslashes + quotes."""
    if v is None:
        return '""'
    s = str(v).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


def write_md(path: Path, frontmatter: list[str], body: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    text = "---\n" + "\n".join(frontmatter) + "\n---\n\n" + body.rstrip() + "\n"
    path.write_text(text, encoding="utf-8", newline="\n")


# -------- Projects --------------------------------------------------------- #

PROJECTS = [
    # (id, title, acronym, status, period, funder, amount, ref, partners, role, summary)
    ("proj-neom-vegetation", "NEOM: Vegetation Change Detection Tool", "NEOM",
     "active", "2025-09 - 2026-02", "NEOM Community", "£39,151", "",
     [], "PI",
     "Data-driven remote-sensing change-detection software measuring re-greening areas in Saudi Arabia's NEOM project. Integrates a foundation model. Relevant SDGs: 11, 13, 15."),
    ("proj-wildfire-foundation", "Wildfire risk minimisation using geospatial foundation models", "",
     "active", "2025-06 - 2026-05", "EPSRC IAA Impact Visionary Award", "£29,894", "",
     [("IBM Research UK", "Industry Partner"), ("Met Office", "Public Sector Partner"), ("Plymouth Marine Laboratory", "Research Partner")], "PI",
     "Integration of geospatial foundation models into the Met Office digital twin (TWINE) for wildfire risk forecasting. REF impact case study in development."),
    ("proj-instant", "INSTANT: Intelligent and Sustainable IoT Networks for Accurate and Real-Time Large-Scale Landslide Monitoring and Prediction", "INSTANT",
     "active", "2026-01 - 2029-12", "Horizon Europe", "€1,187,370", "",
     [], "PI",
     "Large-scale IoT-network landslide monitoring and prediction across Europe."),
    ("proj-treescapes", "Automated AI-Generated 3-D Tree-Scapes for Woodland Creation and Agroforestry Project Concept Designs", "",
     "completed", "2024-10 - 2025-03", "UKRI Innovate UK", "£49,714", "",
     [("SpaceClipper Ltd.", "Industry Partner")], "PI",
     "Software pipeline visualising regions for future woodlands and agroforestry. Relevant SDGs: 11, 13, 15."),
    ("proj-geospatial-ml", "Machine Learning for Geospatial Intelligence", "",
     "active", "2023-09 - 2027-10", "EPSRC Industrial CASE", "£125,115", "2866087",
     [("Ordnance Survey", "Industry Partner")], "PI",
     "Joint PhD with Ordnance Survey to compress high-spectral remote-sensing imagery and enable ML-ready data sharing."),
    ("proj-uav-flooding", "Integrating UAVs and Social Sensing for Timely Flooding Warning in Coastal Areas", "",
     "active", "2023-02 - 2025-01", "Royal Society", "£11,440", "",
     [], "PI",
     "UAV-based flooding warning combined with social sensing in coastal areas."),
    ("proj-rebuilds-cost", "Automated insurance rebuilds cost estimate for residential and commercial properties", "",
     "active", "2023-05 - 2025-06", "UKRI KTN", "£166,793", "10031767",
     [("Rebuild Cost Assessment Ltd.", "Industry Partner")], "PI",
     "KTP partnership delivering ML pipeline that halves desktop rebuild-cost survey time. Graded 'Very Good' by Innovate UK."),
    ("proj-rural-energy", "Optimising Energy Demand in Rural Communities via Precision Agriculture Technology", "",
     "completed", "2023-05 - 2024-03", "Innovate UK", "£44,537", "",
     [("LENKÉ: Space & Water Solutions Ltd.", "Industry Partner")], "PI",
     "Commercial ML product using remote-sensing data to predict irrigation demand in rural Ethiopia. SDGs: 2, 8, 15."),
    ("proj-cyber-attack-bt", "Multi-stage Cyber Attack detection using Machine Learning Approaches", "",
     "completed", "2019-10 - 2024-09", "EPSRC Industrial CASE", "£130,900", "19000043",
     [("British Telecommunications", "Industry Partner")], "PI",
     "Multi-stage malware and cyber-attack detection using machine learning, with British Telecommunications."),
    ("proj-deepwater", "DeepWater: Remote sensing and DEEP learning for early warning of WATER quality hazards", "DeepWater",
     "completed", "2018-09 - 2022-07", "Plymouth Marine Lab + ESA Dragon 4", "£60,870", "",
     [("Plymouth Marine Laboratory", "Research Partner")], "PI",
     "Remote sensing and deep learning for early warning of water-quality hazards."),
    ("proj-thales-atd-atr", "Thales-Challenge Low-pixel Automatic Target Detection and Recognition (ATD/ATR)", "",
     "completed", "2015 - 2016", "Scottish Funding Council", "£139,000", "",
     [("Thales", "Industry Partner"), ("CENSIS", "Research Partner")], "PI",
     "Deep-learning ATD/ATR pipeline. Won the Scottish Funding Council Knowledge Transfer Medal. Estimated 0.5% market-share increase to Thales."),
    ("proj-porsche-ev", "Development of Intelligent Charging Strategies for Electric Vehicles", "",
     "completed", "2016 - 2019", "Porsche AG", "£40,000", "",
     [("Porsche AG", "Industry Partner")], "PI",
     "Intelligent charging strategies for battery EVs."),
    ("proj-refine", "REFINE: Real-time Fine-grained Air Quality Monitoring with Intelligent and Robust Multi-UAV Networks", "REFINE",
     "active", "2024-12 - 2028-11", "Horizon Europe", "€897,000", "",
     [], "CoI",
     "Real-time fine-grained air-quality monitoring with multi-UAV networks (CoI role)."),
    ("proj-initiate", "INITIATE: Intelligent and Sustainable Aerial-Terrestrial IoT Networks", "INITIATE",
     "active", "2022-01 - 2025-12", "EU H2020 RISE", "€952,200", "101008297",
     [], "CoI",
     "Aerial-terrestrial IoT networks (CoI role)."),
    ("proj-sensum", "SENSUM: Smart SENSing of landscapes Undergoing hazardous hydrogeologic Movement", "SENSUM",
     "completed", "2020-09 - 2023-09", "NERC", "£1,200,000", "NE/V003402/1",
     [], "CoI",
     "Smart sensing of landscapes undergoing hazardous hydrogeologic movement (CoI role)."),
    ("proj-bigfoot", "BigFoot: BIG data methods for improving windstorm FOOTprint prediction", "BigFoot",
     "completed", "2017-04 - 2022-04", "NERC", "£1,530,230", "NE/P017436/1",
     [], "CoI",
     "Big-data methods for windstorm footprint prediction (CoI role)."),
    ("proj-huawei-sdn", "High-Performance Distributed Algorithms and Key Technologies for Processing SDN Big Data", "",
     "completed", "2017-08 - 2021-10", "Huawei Technologies", "£223,200", "YBN2016080110",
     [("Huawei Technologies", "Industry Partner")], "CoI",
     "Distributed algorithms for SDN big data (CoI role)."),
    ("proj-seecarbon", "SEECarbon: Cooperative unmanned surface and aerial vehicles for Safe, rEliable and timEly Carbon surveillance in marine farms", "SEECarbon",
     "under-review", "", "Horizon Europe", "£164,901", "",
     [], "PI",
     "Cooperative unmanned surface + aerial vehicles for carbon surveillance in marine farms (PI, under review)."),
    ("proj-i-thera", "I-THERA: Intelligent Home-Based Therapy Intervention Technology Tool for Treating Young Children with Speech Sound Disorders", "I-THERA",
     "under-review", "", "Horizon Europe", "£192,384", "",
     [], "CoI",
     "Home-based therapy intervention tool (CoI, under review)."),
    ("proj-insar-landslides", "Explainable machine learning and big InSAR data for accurate and fine-grained prediction of landslides over large areas", "",
     "under-review", "", "Royal Society", "£11,880", "",
     [], "PI",
     "Explainable ML and big InSAR data for landslide prediction (PI, under review)."),
]


def gen_projects():
    base = CONTENT / "projects"
    for pid, title, acro, status, period, funder, amount, ref, partners, role, summary in PROJECTS:
        fm = [f"title: {yq(title)}"]
        if acro:
            fm.append(f"acronym: {yq(acro)}")
        fm.append(f"status: {status}")
        if period:
            fm.append(f"period: {yq(period)}")
        if funder:
            fm.append(f"funder: {yq(funder)}")
        if amount:
            fm.append(f"amount: {yq(amount)}")
        if ref:
            fm.append(f"referenceNumber: {yq(ref)}")
        if role == "PI":
            fm.append("pi: member-luo")
        else:
            fm.append("coi:")
            fm.append("  - member-luo")
        if partners:
            fm.append("partners:")
            for n, prole in partners:
                fm.append(f"  - name: {yq(n)}")
                fm.append(f"    role: {yq(prole)}")
        write_md(base / f"{pid}.md", fm, summary)
    print(f"projects: {len(PROJECTS)} files")


# -------- Awards --------------------------------------------------------- #

AWARDS = [
    ("award-knowledge-transfer-medal", "Knowledge Transfer Medal", "Scottish Funding Council", 2018,
     "For the Thales-Challenge ATD/ATR project — recognising deep-learning research successfully transferred into a Thales product."),
    ("award-leadership-iucc", "Outstanding Leadership Award", "IEEE", 2021,
     "For chairing the 20th International Conference on Ubiquitous Computing and Communications."),
    ("award-leadership-icdss", "Outstanding Leadership Award", "IEEE", 2018,
     "For contributions to the 4th IEEE International Conference on Data Science and Systems."),
    ("award-above-and-beyond", "Above and Beyond Award", "University of Exeter", 2025,
     "Recognised seven times between 2021 and 2025 for outstanding contributions across research, teaching and service."),
    ("award-senior-member-ieee", "Senior Member of the IEEE", "IEEE", 2023,
     "Senior Member status — recognising sustained professional contributions."),
    ("award-fhea", "Fellow of the Higher Education Academy", "HEA", 2015,
     "Recognition of a sustained commitment to high-quality teaching in higher education."),
    ("award-best-paper-reading", "Best Paper Award", "University of Reading", 2011,
     "For 'Full Interference Cancellation for Two-Path Relay Cooperative Networks', IEEE TVT 60(1)."),
    ("award-highly-cited", "Web of Science Highly Cited Researcher", "Web of Science", 2024,
     "Multiple Web of Science Highly Cited papers recognised in 2024 (3 highly cited papers)."),
]


def gen_awards():
    base = CONTENT / "awards"
    for aid, title, org, year, desc in AWARDS:
        fm = [
            f"title: {yq(title)}",
            f"organization: {yq(org)}",
            f"year: {year}",
            "holders:",
            "  - member-luo",
        ]
        write_md(base / f"{aid}.md", fm, desc)
    print(f"awards: {len(AWARDS)} files")


# -------- Industry Impact -------------------------------------------------- #

IMPACTS = [
    ("impact-wildfire-foundation", "Wildfire Risk Minimisation Using Geospatial Foundation Models",
     "IBM Research UK + Met Office + PML", "2025 - present", "",
     ["proj-wildfire-foundation"], ["Climate", "Foundation Models", "Geospatial"],
     "Integration into Met Office digital twin (TWINE); REF impact case study in development. SDGs: 11, 13, 15."),
    ("impact-neom", "NEOM: Vegetation Change Detection Tool",
     "NEOM Community", "2025 - present", "",
     ["proj-neom-vegetation"], ["Remote Sensing", "Foundation Models", "Vegetation"],
     "Data-driven remote-sensing change-detection software measuring re-greening areas in Saudi Arabia's NEOM project. SDGs: 11, 13, 15."),
    ("impact-treescapes", "Automated AI-Generated 3-D Tree-Scapes for Woodland Creation and Agroforestry",
     "SpaceClipper Ltd. (UKRI Innovate UK)", "2024", "",
     ["proj-treescapes"], ["Generative AI", "Forestry"],
     "Software pipeline visualising regions for future woodlands and agroforestry. SDGs: 11, 13, 15."),
    ("impact-rapid-woodland", "Rapid assessment tool for Woodland Creation investment",
     "SpaceClipper Ltd. (UKRI Innovate UK)", "2023", "",
     [], ["Remote Sensing", "Forestry"],
     "Algorithmic solution to optimise woodland investment decisions."),
    ("impact-geospatial-os", "Machine learning for high-resolution aerial sensing data processing",
     "Ordnance Survey (EPSRC Industrial CASE)", "2023 - present", "",
     ["proj-geospatial-ml"], ["Compression", "Remote Sensing"],
     "Joint PhD with OS to compress high-spectral remote-sensing imagery, enabling ML-ready data sharing with lower storage."),
    ("impact-rural-energy", "Optimising Energy Demand in Rural Communities via Precision Agriculture",
     "LENKÉ: Space & Water Solutions Ltd. (Innovate UK)", "2023", "",
     ["proj-rural-energy"], ["Precision Agriculture", "Ethiopia"],
     "Commercial ML product using remote-sensing data to predict irrigation demand in rural Ethiopia. SDGs: 2, 8, 15."),
    ("impact-rebuilds-ktp", "Automated Insurance Rebuilds Cost Estimate (KTP)",
     "Rebuild Cost Assessment Ltd.", "2023 - 2025", "",
     ["proj-rebuilds-cost"], ["Insurance", "Computer Vision"],
     "ML pipeline halves desktop survey time; meets RCA's 10%/year growth target. KTP graded 'Very Good' by Innovate UK. REF impact case study in development. SDG: 8."),
    ("impact-digital-id", "Building Digital Identities",
     "Coelition (ESRC IAA)", "2017", "",
     [], ["Humanitarian", "Policy"],
     "Final report co-authored with Prof Ana Beduschi (Law) and Prof Jonathan Cinnamon (Geography). Presented at the UN ID2020 Summit. Cited in the ICRC Handbook on data protection in humanitarian action."),
    ("impact-thales-atd-atr", "Thales-Challenge Low-pixel Automatic Target Detection and Recognition (ATD/ATR)",
     "CENSIS + Thales (Scottish Funding Council)", "2015 - 2016", "£139K",
     ["proj-thales-atd-atr"], ["Defence", "Computer Vision"],
     "Deep-learning ATD/ATR pipeline. Won the Scottish Funding Council Knowledge Transfer Medal. Software product for the Thales ATD/ATR system; estimated 0.5% market-share gain (~€455M)."),
]


def gen_impacts():
    base = CONTENT / "impact"
    for iid, title, partner, period, amount, related_projs, tags, desc in IMPACTS:
        fm = [
            f"title: {yq(title)}",
            f"partner: {yq(partner)}",
        ]
        if period:
            fm.append(f"period: {yq(period)}")
        if amount:
            fm.append(f"amount: {yq(amount)}")
        fm.append("people:")
        fm.append("  - member-luo")
        if related_projs:
            fm.append("relatedProjs:")
            for r in related_projs:
                fm.append(f"  - {r}")
        if tags:
            fm.append("tags:")
            for t in tags:
                fm.append(f"  - {yq(t)}")
        write_md(base / f"{iid}.md", fm, desc)
    print(f"impact: {len(IMPACTS)} files")


# -------- Resources -------------------------------------------------------- #

RESOURCES = [
    ("res-sdvn-platform", "SDVN-platform — Software-Defined Vehicular Network simulator", "code",
     "https://github.com/a824899245/SDVN-platform", "", [], [], "Networks",
     "Simulator for software-defined vehicular networks; supports research on vehicular communication and routing."),
    ("res-fed-tradaboost", "FedTradaBoost — Federated learning framework", "code",
     "https://github.com/LaplaceZhang/FedTradaBoost", "", [], [], "Federated Learning",
     "Federated-learning framework with TrAdaBoost-style transfer."),
    ("res-sentinel-classifier", "SentinelClassifier — Sentinel-2 land-cover classifier", "code",
     "https://github.com/HowardDreemurr/SentinelClassifier", "", [], [], "Remote Sensing",
     "Deep-learning Sentinel-2 land-cover classifier; backbone of the NEOM Vegetation Change Detection Tool."),
    ("res-disaster-display", "Global natural-disaster map", "code",
     "https://github.com/lc796/disaster_display_backend", "", [], [], "Disaster",
     "Backend for a globally distributed natural-disaster visualisation map."),
    ("res-swed", "SWED — Sentinel-2 Water Edges Dataset", "dataset",
     "https://openmldata.ukho.gov.uk", "CC BY 4.0", [], [], "Coastal",
     "16 labelled training Sentinel-2 scenes plus 98 test label/image pairs covering many coastline types and features. Globally distributed."),
    ("res-visualwind", "VisualWind — Wind-scale video dataset", "dataset",
     "https://sme.uds.exeter.ac.uk/folders/48caf5102d6196b9645fab1f46e494ec", "Research use", [], [], "Wind",
     "6,000 labelled video clips covering eleven wind classes of the Beaufort scale, for visual anemometry research."),
    ("res-disasterscope", "DisasterScope — UAV disaster imagery dataset", "dataset",
     "https://2024.ieeeigarss.org/view_paper.php?PaperNum=2265", "Research use", [], [], "Disaster",
     "Aerial UAV dataset of natural-disaster scenes (Liu et al., IGARSS 2024)."),
    ("res-granite-ocean", "Granite-geospatial-ocean foundation model", "tools",
     "https://huggingface.co/ibm-granite/granite-geospatial-ocean", "Apache 2.0", [], [], "Foundation Model",
     "Transformer-based geospatial foundation model trained on Sentinel-3 OLCI and SLSTR imagery. Downloaded over 11,000 times in October 2025."),
]


def gen_resources():
    base = CONTENT / "resources"
    for rid, title, rtype, link, lic, related_pubs, related_projs, tag, desc in RESOURCES:
        fm = [
            f"title: {yq(title)}",
            f"type: {rtype}",
            f"link: {yq(link)}",
        ]
        if lic:
            fm.append(f"license: {yq(lic)}")
        if related_pubs:
            fm.append("relatedPubs:")
            for r in related_pubs:
                fm.append(f"  - {r}")
        if related_projs:
            fm.append("relatedProjs:")
            for r in related_projs:
                fm.append(f"  - {r}")
        if tag:
            fm.append("tags:")
            fm.append(f"  - {yq(tag)}")
        write_md(base / f"{rid}.md", fm, desc)
    print(f"resources: {len(RESOURCES)} files")


# -------- Publications (featured highlights) ------------------------------ #

PUBLICATIONS = [
    # (id, title, year, venue, type, [(member|external, name)], areas, featured, doi, abstract)
    ("paper-2021-vec-offloading", "Deep Reinforcement Learning-Based Offloading Scheduling for Vehicular Edge Computing", 2021,
     "IEEE Internet of Things Journal", "journal",
     [("external", "W. Zhan"), ("member", "member-luo"), ("external", "G. Min"), ("external", "et al.")],
     ["area-sensing-observations"], True, "10.1109/JIOT.2020.2978830",
     "Highest-cited group paper (340+ citations); Web of Science Highly Cited."),
    ("paper-2013-uav-ekf", "UAV Position Estimation and Collision Avoidance Using the Extended Kalman Filter", 2013,
     "IEEE Transactions on Vehicular Technology", "journal",
     [("member", "member-luo"), ("external", "S. McClean"), ("external", "G. Parr"), ("external", "L. Teacy"), ("external", "R. De Nardi")],
     ["area-sensing-observations"], True, "",
     "232 citations. Foundational UAV localisation work using extended Kalman filtering."),
    ("paper-2022-uav-swarm", "Distributed UAV Swarm Formation and Collision Avoidance Strategies Over Fixed and Switching Topologies", 2022,
     "IEEE Transactions on Cybernetics", "journal",
     [("external", "J. Wu"), ("member", "member-luo"), ("external", "Y. Luo"), ("external", "K. Li")],
     ["area-sensing-observations"], True, "",
     "124 citations. Distributed formation control for UAV swarms across fixed and switching topologies."),
    ("paper-2023-iiot-fed", "Federated Learning for Distributed IIoT Intrusion Detection Using Transfer Approaches", 2023,
     "IEEE Transactions on Industrial Informatics", "journal",
     [("member", "alumni-zhang-jiazhen"), ("member", "member-luo"), ("member", "member-carpenter"), ("external", "G. Min")],
     ["area-sensing-observations", "area-processing-analysis"], True, "",
     "73 citations. Federated learning for distributed IIoT intrusion detection using transfer approaches."),
    ("paper-2025-landslide-insar", "An interpretable attention-based deep learning method for landslide prediction based on multi-temporal InSAR time series", 2025,
     "Remote Sensing of Environment", "journal",
     [("external", "C. Zhou"), ("external", "M. Ye"), ("external", "Z. Xia"), ("external", "W. Wang"), ("member", "member-luo"), ("external", "J.P. Muller")],
     ["area-processing-analysis", "area-decision-making"], True, "10.1016/j.rse.2024.114580",
     "Web of Science Highly Cited. Interpretable attention-based deep learning for landslide prediction from multi-temporal InSAR."),
    ("paper-2025-mamba-hsi", "MambaHSISR: Mamba hyperspectral image super-resolution", 2025,
     "IEEE Transactions on Geoscience and Remote Sensing", "journal",
     [("external", "Y. Xu"), ("external", "H. Wang"), ("external", "F. Zhou"), ("member", "member-luo"), ("external", "X. Sun"), ("external", "S. Rahardja"), ("external", "P. Ren")],
     ["area-processing-analysis"], True, "",
     "Web of Science Highly Cited. State-space model for hyperspectral super-resolution."),
    ("paper-2024-carbon-buildings", "Whole-life carbon emissions for buildings using ML algorithms: a case study on residential properties in Cornwall", 2024,
     "Applied Energy", "journal",
     [("external", "L. Zheng"), ("external", "M. Mueller"), ("member", "member-luo"), ("external", "X. Yan")],
     ["area-decision-making"], True, "10.1016/j.apenergy.2023.122472",
     "35 citations. ML for whole-life carbon emissions of residential buildings in Cornwall."),
    ("paper-2022-coastline", "Coastline detection in satellite imagery: A deep learning approach on new benchmark data", 2022,
     "Remote Sensing of Environment", "journal",
     [("external", "C. Seale"), ("external", "T. Redfern"), ("external", "P. Chatfield"), ("member", "member-luo"), ("external", "K. Dempsey")],
     ["area-processing-analysis"], True, "10.1016/j.rse.2022.113044",
     "Introduces the SWED dataset for coastline extraction from Sentinel-2."),
    ("paper-2022-actor-critic", "Adaptive and Efficient Resource Allocation in Cloud Datacentres Using Actor-Critic Deep RL", 2022,
     "IEEE Transactions on Parallel and Distributed Systems", "journal",
     [("external", "Z. Chen"), ("external", "J. Hu"), ("external", "G. Min"), ("member", "member-luo"), ("external", "T. El-Ghazawi")],
     ["area-processing-analysis"], True, "",
     "121 citations. Actor-critic deep RL for cloud datacentre resource allocation."),
    ("paper-2025-aaai-magent", "Achieving Equilibrium under Utility Heterogeneity: An Agent-Attention Framework for Multi-Agent Multi-Objective RL", 2025,
     "AAAI", "conference",
     [("member", "member-li-zhuhui"), ("member", "member-luo"), ("external", "G. Min")],
     ["area-decision-making"], True, "",
     "CORE A* venue. Multi-agent multi-objective RL with agent-attention."),
    ("paper-2025-osdmamba", "OSDMamba: Enhancing Oil Spill Detection from Remote Sensing Images Using Selective State Space Model", 2025,
     "BMVC", "conference",
     [("external", "S. Chen"), ("external", "F. Wang"), ("external", "P. Ren"), ("member", "member-luo"), ("external", "Z. Fu")],
     ["area-processing-analysis"], True, "",
     "CORE A flagship venue. Selective state-space model for oil-spill detection."),
    ("paper-2025-reobench", "REOBench: Benchmarking Robustness of Earth Observation Foundation Models", 2025,
     "NeurIPS", "conference",
     [("external", "X. Li"), ("external", "Y. Tao"), ("external", "S. Zhang"), ("external", "S. Liu"), ("external", "Z. Xiong"), ("member", "member-luo"), ("external", "et al.")],
     ["area-processing-analysis"], True, "",
     "CORE A* venue. Robustness benchmark for Earth-observation foundation models."),
    ("paper-2024-disasterscope", "DisasterScope: A Comprehensive Dataset and RTMDet-based Methodology for Object Detection in Disaster-Related Remote Sensing Images", 2024,
     "IGARSS", "conference",
     [("member", "member-liu-zhipeng"), ("member", "member-luo"), ("external", "G. Min"), ("member", "member-liu-zishu"), ("external", "Z. Li")],
     ["area-processing-analysis"], True, "",
     "GRSS flagship conference. Companion paper to the DisasterScope dataset."),
    ("paper-2024-uxv-survey", "Ubiquitous and Robust UxV Networks: Overviews, Solutions, Challenges, and Opportunities", 2024,
     "IEEE Network", "journal",
     [("member", "member-li-zhuhui"), ("external", "G. Min"), ("external", "P. Ren"), ("member", "member-luo"), ("external", "L. Zhao"), ("external", "C. Luo")],
     ["area-sensing-observations"], False, "",
     "Survey of ubiquitous and robust UxV networks."),
    ("paper-2025-uav-survey", "A Survey on Autonomous and Intelligent Swarms of Uncrewed Aerial Vehicles (UAVs)", 2025,
     "IEEE Transactions on Intelligent Transportation Systems", "journal",
     [("external", "Z. Du"), ("member", "member-luo"), ("external", "G. Min"), ("external", "J. Wu"), ("external", "C. Luo"), ("external", "J. Pu"), ("external", "S. Li")],
     ["area-sensing-observations"], False, "",
     "Survey of autonomous and intelligent UAV swarms."),
    ("paper-2018-uav-disaster", "Unmanned Aerial Vehicles for Disaster Management", 2019,
     "Geological Disaster Monitoring Based on Sensor Networks (Springer)", "book-chapter",
     [("member", "member-luo"), ("member", "alumni-miao-wang"), ("external", "H. Ullah"), ("external", "S. McClean"), ("external", "G. Parr"), ("external", "G. Min")],
     ["area-sensing-observations"], True, "",
     "120 citations. Comprehensive book chapter on UAVs for disaster management."),
    ("paper-2017-cv-report-ictrs", "Building Digital Identities: The Challenges, Risks and Opportunities of Collecting Behavioural Attributes for new Digital Identity Systems", 2017,
     "University of Exeter and Coelition", "report",
     [("external", "A. Beduschi"), ("external", "J. Cinnamon"), ("external", "J. Langford"), ("member", "member-luo"), ("external", "D. Owen")],
     ["area-decision-making"], False, "",
     "40-page report cited in the ICRC Handbook on data protection in humanitarian action."),
]


def gen_publications():
    base = CONTENT / "publications"
    for pid, title, year, venue, ptype, authors, areas, featured, doi, abstract in PUBLICATIONS:
        fm = [
            f"title: {yq(title)}",
            f"year: {year}",
            f"venue: {yq(venue)}",
            f"type: {ptype}",
            "authors:",
        ]
        for kind, value in authors:
            if kind == "member":
                fm.append(f"  - discriminant: member")
                fm.append(f"    value: {value}")
            else:
                fm.append(f"  - discriminant: external")
                fm.append(f"    value: {yq(value)}")
        if areas:
            fm.append("researchAreas:")
            for a in areas:
                fm.append(f"  - {a}")
        if featured:
            fm.append("featured: true")
        if doi:
            fm.append(f"doi: {yq(doi)}")
        write_md(base / f"{pid}.md", fm, abstract)
    print(f"publications: {len(PUBLICATIONS)} files")


# -------- Events ---------------------------------------------------------- #

EVENTS = [
    # editorial
    ("event-editorial-iet-ip", "Guest editor, IET Image Processing", "editorial",
     "2025-01-01", "", "IET Image Processing", "Guest Editor", ""),
    ("event-editorial-science-china", "Editor, Science China (Information Sciences)", "editorial",
     "2022-01-01", "", "Science China (Information Sciences), Springer", "Editor", ""),
    ("event-editorial-frontiers-marine", "Guest editor, Frontiers in Marine Science", "editorial",
     "2022-01-01", "2023-12-31", "Frontiers in Marine Science", "Guest Editor", ""),
    ("event-editorial-jstars", "Guest editor, IEEE J-STARS", "editorial",
     "2022-01-01", "2023-12-31", "IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing", "Guest Editor", ""),
    # chair
    ("event-chair-iicess-2025", "Program Chair, IEEE ICESS 2025", "chair",
     "2025-01-01", "", "21st IEEE International Conference on Embedded Software and Systems", "Program Chair", ""),
    ("event-chair-ml4eo-2024", "General Chair, ML4EO", "chair",
     "2024-01-01", "", "Machine Learning for Earth Observations (2023 - 2025)", "General Chair", ""),
    ("event-chair-bmvc-mveo", "Workshop Chair, BMVC Machine Vision for Earth Observation", "chair",
     "2024-01-01", "", "BMVC Workshop on Machine Vision for Earth Observation (2023 - 2025)", "Workshop Chair", ""),
    ("event-chair-bdse-2023", "Program Chair, BDSE 2023", "chair",
     "2023-01-01", "", "17th IEEE International Conference on Big Data Science and Engineering", "Program Chair", ""),
    ("event-chair-iucc-2021", "Program Chair, IUCC 2021", "chair",
     "2021-01-01", "", "20th International Conference on Computer and Information Technology", "Program Chair", ""),
    ("event-chair-bdcc-2020", "General Chair, IEEE BDCC 2020", "chair",
     "2020-01-01", "", "10th IEEE International Conference on Big Data and Cloud Computing", "General Chair", ""),
    # keynote
    ("event-keynote-isaptn-2023", "Keynote, ISAPCN 2023", "keynote",
     "2023-01-01", "", "International Symposium on Advanced Topics in Pervasive Computing and Networking Technologies", "Keynote Speaker", ""),
    ("event-keynote-uk-china-2021", "Keynote, AI for Climate, Environment and Sustainability (Exeter)", "keynote",
     "2021-01-01", "", "UK-China collaborative workshop, Exeter", "Keynote Speaker", ""),
    ("event-keynote-ispa-2020", "Keynote, IEEE ISPA Machine Learning Empowered Future Network Workshop", "keynote",
     "2020-01-01", "", "18th IEEE ISPA Workshop", "Keynote Speaker", "Talk: Machine Learning for Communication and Network Data Processing."),
    ("event-keynote-bt-2019", "BT Thought Leadership Talk", "keynote",
     "2019-01-01", "", "BT, Ipswich, UK", "Invited Speaker", ""),
    ("event-keynote-icscdf-2018", "Keynote, ICSCDF 2018", "keynote",
     "2018-01-01", "", "First International Conference on Cyber Security and Digital Forensics, Edinburgh Napier University", "Keynote Speaker", ""),
    ("event-keynote-uk-pakistan-2015", "Invited talk, UK-Pakistan 5G/Disaster Management Workshop", "keynote",
     "2015-01-01", "", "UK-Pakistan International Workshop on 5G Emerging Technologies for Disaster Management", "Invited Speaker", ""),
]


def gen_events():
    base = CONTENT / "events"
    for eid, title, etype, date, end, venue, role, desc in EVENTS:
        fm = [
            f"title: {yq(title)}",
            f"type: {etype}",
            f"date: {date}",
        ]
        if end:
            fm.append(f"endDate: {end}")
        if venue:
            fm.append(f"venue: {yq(venue)}")
        if role:
            fm.append(f"role: {yq(role)}")
        fm.append("organizers:")
        fm.append("  - member-luo")
        write_md(base / f"{eid}.md", fm, desc)
    print(f"events: {len(EVENTS)} files")


# -------- News (seed) ---------------------------------------------------- #

NEWS = [
    ("news-2025-11-citation-milestone", "Citation milestone: 3,562 cites, h-index 27, i10-index 53",
     "2025-11-16", "Milestone", "Group citation metrics updated as of 16 November 2025."),
    ("news-2025-09-neom-launch", "NEOM Vegetation Change Detection Tool launched with NEOM Community",
     "2025-09-01", "Project", "PI project to measure re-greening areas in Saudi Arabia's NEOM initiative, integrating a foundation model."),
    ("news-2025-06-wildfire-iaa", "EPSRC IAA Impact Visionary Award for Wildfire Foundation Models",
     "2025-06-01", "Project", "Award funds the integration of geospatial foundation models into the Met Office digital twin (TWINE)."),
    ("news-2025-instant-funded", "INSTANT (Horizon Europe, €1.18M) starts in 2026",
     "2025-12-01", "Project", "Horizon Europe-funded large-scale IoT-network landslide monitoring and prediction project starts January 2026."),
    ("news-2024-12-refine", "REFINE (Horizon Europe CoI, €897K) starts in December 2024",
     "2024-12-01", "Project", "Real-time fine-grained air-quality monitoring with multi-UAV networks (CoI role)."),
    ("news-2025-neurips-reobench", "REOBench accepted at NeurIPS 2025",
     "2025-09-25", "Paper", "Benchmark for the robustness of Earth-observation foundation models accepted at NeurIPS (CORE A*)."),
    ("news-2025-aaai-magent", "Multi-agent multi-objective RL paper accepted at AAAI 2025",
     "2024-12-15", "Paper", "Agent-Attention framework for multi-agent multi-objective reinforcement learning accepted at AAAI 2025 (CORE A*)."),
    ("news-2023-ktp-very-good", "Innovate UK KTP graded 'Very Good' (RCA partnership)",
     "2023-09-01", "Award", "The KTP partnership with Rebuild Cost Assessment Ltd. was graded Very Good by Innovate UK."),
    ("news-2023-senior-member-ieee", "PI elected Senior Member of the IEEE",
     "2023-04-01", "Award", "Recognition for sustained professional contributions to the field."),
]


def gen_news():
    base = CONTENT / "news"
    for nid, title, date, tag, body in NEWS:
        fm = [
            f"title: {yq(title)}",
            f"date: {date}",
            f"tag: {tag}",
            "relatedPeople:",
            "  - member-luo",
        ]
        write_md(base / f"{nid}.md", fm, body)
    print(f"news: {len(NEWS)} files")


def main():
    gen_projects()
    gen_publications()
    gen_awards()
    gen_impacts()
    gen_resources()
    gen_events()
    gen_news()
    print("done")


if __name__ == "__main__":
    main()
