/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Rules:
 *  - Every claim here must be verifiable from a provided source.
 *  - Where a claim has proof, the proof id references data/proof.ts.
 *  - Where a claim has no proof, omit the `proof` field.
 *  - Class XI score and SAT are intentionally excluded.
 */

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  what: string;
  why: string;
  role: string;
  timeline: string;
  stack: string[];
  status: string;
  links: Link[];
  proof?: string[];
  taught: string;
  featured?: boolean;
  tier: "flagship" | "major" | "minor";
}

export interface EducationEntry {
  id: string;
  period: string;
  institution: string;
  credential: string;
  detail: string;
  score?: string;
  proof?: string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  org: string;
  summary: string;
  points: string[];
  proof?: string[];
}

export interface AchievementGroup {
  id: string;
  label: string;
  items: { title: string; meta?: string; proof?: string[] }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  duration?: string;
  covers: string;
  why: string;
  group:
    | "AI / ML"
    | "Computer Science"
    | "Cloud"
    | "Language"
    | "Assessment";
  proof?: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  /** Where this skill was actually used. */
  usedIn: string[];
}

/* ------------------------------------------------------------------ */
/* PROFILE                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Arsh Raza Zaidi",
  role: "Student · Developer · AI Builder · Entrepreneur",
  shortRole: "Developer / AI Builder / Entrepreneur",
  tagline: "I build systems at the intersection of AI, software and product.",
  location: "India",
  focus: "AI · Software · Product",
  currently: "Building MYRAQ.ai · Writing · Preparing for university",
  bio: [
    "I'm an Indian high-school student who ships. Over the last two years I founded and ran MYRAQ.ai — an AI product for relationships and marriage — leading a distributed team of interns, writing the application myself, and handling partnerships, pitches and marketing alongside the engineering.",
    "My technical work sits mostly in applied machine learning and full-stack product: neural-network calibration research, retrieval-augmented systems, and the unglamorous work of getting a real product in front of real users.",
  ],
  links: {
    github: "https://github.com/ArshZaidi",
    linkedin: "https://www.linkedin.com/in/arsh-raza-zaidi",
    leetcode: "https://leetcode.com/u/Arsh_Zaidi",
    medium: "https://medium.com/@arshzaidi",
    email: "mailto:arshzaidi03@gmail.com",
    myraq: "https://myraq.vercel.app",
  },
  stats: [
    { value: "500+", label: "LeetCode problems" },
    { value: "12", label: "Interns led" },
    { value: "9 yrs", label: "DPS Scholar" },
    { value: "5★", label: "HackerRank" },
  ],
};

/* ------------------------------------------------------------------ */
/* EDUCATION                                                           */
/* ------------------------------------------------------------------ */

export const education: EducationEntry[] = [
  {
    id: "dps",
    period: "Apr 2012 — Apr 2026",
    institution: "Delhi Public School",
    credential: "Senior Secondary · Science",
    detail:
      "Fourteen years at one of India's most demanding CBSE schools. Built an academic foundation on discipline, curiosity and consistency — sustained across the full arc from primary through senior secondary.",
    score: "Class X: 96% · Class XII: 92%",
    proof: ["dps-scholar-trophy", "dps-certificate"],
  },
  {
    id: "iitm",
    period: "2024",
    institution: "IIT Madras",
    credential: "AI & Data Science",
    detail:
      "A two-month certification course in artificial intelligence and data science. Built an undergraduate-level machine learning project against a real-time database. Received both a Certificate of Completion and a Certificate of Appreciation for Excellent Performance.",
    proof: ["iitm-cert"],
  },
  {
    id: "delf",
    period: "2022 — 2024",
    institution: "DELF — French",
    credential: "A1 · A2 · B1",
    detail:
      "Completed all three levels of the Diplôme d'Études en Langue Française with comfortable margins. DELF is the official French-language diploma issued by the French Ministry of Education.",
    proof: ["delf-a1", "delf-a2", "delf-b1"],
  },
];

/* ------------------------------------------------------------------ */
/* SKILLS                                                              */
/* ------------------------------------------------------------------ */

export const skills: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      {
        name: "Python",
        usedIn: [
          "MYRAQ.ai backend",
          "AI-Startup-MCP",
          "HR365 RAG pipeline",
          "IIT Madras ML project",
          "PyStructures",
        ],
      },
      {
        name: "TypeScript / JavaScript",
        usedIn: ["SIH Website Redesign", "HR365 frontend"],
      },
      {
        name: "Java",
        usedIn: ["MIT 6.005 Advanced Software Construction", "Harvard CS50x"],
      },
      {
        name: "C",
        usedIn: ["Harvard CS50x"],
      },
      {
        name: "SQL",
        usedIn: ["MYRAQ.ai", "HR365"],
      },
    ],
  },
  {
    id: "ai",
    label: "AI / Machine Learning",
    items: [
      {
        name: "Retrieval-Augmented Generation (RAG)",
        usedIn: ["HR365", "DeepLearning.AI RAG certification"],
      },
      {
        name: "Large Language Models",
        usedIn: ["MYRAQ.ai", "AI-Startup-MCP", "HR365"],
      },
      {
        name: "Model Context Protocol",
        usedIn: ["AI-Startup-MCP", "Anthropic MCP certifications"],
      },
      {
        name: "Embeddings & Vector Search",
        usedIn: ["HR365 (FAISS, Sentence Transformers)"],
      },
      {
        name: "Neural Network Calibration",
        usedIn: ["ADAUC research preprint"],
      },
      {
        name: "Scikit-learn, NumPy, Pandas",
        usedIn: ["IIT Madras ML project", "ADAUC research"],
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      {
        name: "React & Next.js",
        usedIn: ["SIH Website Redesign", "HR365", "This portfolio"],
      },
      {
        name: "Tailwind CSS",
        usedIn: ["SIH Website Redesign", "HR365"],
      },
      {
        name: "GSAP & ScrollTrigger",
        usedIn: ["SIH Website Redesign", "This portfolio"],
      },
      {
        name: "Framer Motion",
        usedIn: ["SIH Website Redesign", "HR365"],
      },
      {
        name: "Lenis",
        usedIn: ["SIH Website Redesign", "HR365", "This portfolio"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    items: [
      {
        name: "FastAPI",
        usedIn: ["MYRAQ.ai", "HR365"],
      },
      {
        name: "PostgreSQL & Supabase",
        usedIn: ["MYRAQ.ai", "HR365"],
      },
      {
        name: "REST APIs",
        usedIn: ["MYRAQ.ai", "AI-Startup-MCP"],
      },
      {
        name: "FAISS",
        usedIn: ["HR365"],
      },
      {
        name: "Flask",
        usedIn: ["Harvard CS50x"],
      },
    ],
  },
  {
    id: "tools",
    label: "Tooling",
    items: [
      { name: "Git & GitHub", usedIn: ["Every project"] },
      { name: "Linux", usedIn: ["Development environment"] },
      { name: "Vercel", usedIn: ["SIH Website Redesign", "MYRAQ.ai"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PROJECTS                                                            */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "myraq",
    title: "MYRAQ.ai",
    tagline: "An AI product for relationships and marriage.",
    what: "A product-focused AI application combining conversational guidance with relationship-oriented tools — AI advice, compatibility analysis, date suggestions, outfit checking, parent-convincing scripts, and red/green-flag detection.",
    why: "To explore how AI could be applied to a highly personal domain while building an actual consumer-facing product rather than only a technical demo.",
    role: "Founder / Product & Technical Lead",
    timeline: "2024 — present",
    stack: ["Python", "FastAPI", "PostgreSQL / Supabase", "AI/ML", "Tailwind CSS"],
    status: "Live",
    links: [
      { label: "Visit", href: "https://myraq.vercel.app" },
    ],
    proof: ["myraq-live"],
    taught:
      "Product development, AI integration, translating an ambiguous real-world problem into concrete features, and building an end-to-end startup prototype.",
    featured: true,
    tier: "flagship",
  },
  {
    id: "hr365",
    title: "HR365",
    tagline: "An AI-powered HR platform with a RAG knowledge layer.",
    what: "A locally-runnable HR platform with an AI knowledge layer that retrieves information from organizational documents. Uses document embeddings, vector search, retrieval-augmented generation, and confidence/citation mechanisms inside an HR-oriented interface.",
    why: "To build a more complete AI application demonstrating how RAG can be integrated into a real business workflow rather than existing as an isolated chatbot.",
    role: "Developer / AI & Technical Lead",
    timeline: "2025 — WIP",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Python",
      "FastAPI",
      "Groq",
      "RAG",
      "Sentence Transformers",
      "FAISS",
      "Supabase",
    ],
    status: "Work in progress",
    links: [],
    taught:
      "RAG architecture, embeddings, vector databases, retrieval pipelines, AI confidence and citation systems, and integrating AI into a full-stack product.",
    tier: "major",
  },
  {
    id: "mcp",
    title: "AI-Startup-MCP",
    tagline: "An MCP server that evaluates startup ideas.",
    what: "An open-source Model Context Protocol server that evaluates a submitted startup idea and returns specialised, structured suggestions for turning it into an operating business — market framing, differentiation, and first-milestone sequencing.",
    why: "To understand and experiment with MCP architecture and AI-agent / tool integration.",
    role: "Developer / Architect",
    timeline: "2025",
    stack: ["MCP", "Python", "AI tooling", "APIs"],
    status: "Open source",
    links: [
      { label: "GitHub", href: "https://github.com/ArshZaidi" },
    ],
    taught:
      "MCP architecture, AI-tool integration, API design, and designing software around agent interaction rather than only traditional user interfaces.",
    tier: "major",
  },
  {
    id: "sih",
    title: "SIH Website — Redesign",
    tagline: "A cinematic redesign of the Smart India Hackathon website.",
    what: "A frontend redesign reimagining the SIH website with a more cinematic and interactive interface. Uses modern animation and smooth-scrolling techniques to create a substantially more dynamic experience than a conventional informational website.",
    why: "To demonstrate frontend engineering, interaction design, animation, and the ability to translate a large information-heavy website into a polished visual experience.",
    role: "Frontend Developer / UI Engineer",
    timeline: "2025",
    stack: ["Next.js 16+", "React", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis"],
    status: "Live",
    links: [
      { label: "Live demo", href: "https://sih-website-redesigned.vercel.app/" },
    ],
    proof: ["sih-live"],
    taught:
      "Advanced frontend architecture, animation systems, responsive design, smooth scrolling, component design, and performance considerations.",
    tier: "major",
  },
  {
    id: "jellyfish",
    title: "Procedural JellyFish System",
    tagline: "Mathematical art rendered from parametric equations.",
    what: "A creative-coding project that uses mathematical rules and procedural generation to produce an organic jellyfish-inspired visual system — live 3D, colour-coded, animated in real time.",
    why: "To explore mathematical visualization and demonstrate that programming can be used as a medium for creating visual systems rather than only conventional applications.",
    role: "Creator / Developer",
    timeline: "2025",
    stack: ["Desmos", "Parametric geometry"],
    status: "Open source",
    links: [
      { label: "GitHub", href: "https://github.com/ArshZaidi" },
    ],
    taught:
      "Procedural generation, mathematical thinking, visual experimentation, and translating mathematical concepts into computational systems.",
    tier: "minor",
  },
  {
    id: "pystructures",
    title: "PyStructures",
    tagline: "Python implementations of fundamental data structures.",
    what: "A programming-focused project centred around implementing core data-structure concepts in Python. Direct evidence of understanding fundamental CS concepts rather than relying only on frameworks and libraries.",
    why: "To strengthen and demonstrate understanding of data structures and algorithmic programming.",
    role: "Developer",
    timeline: "2025",
    stack: ["Python"],
    status: "Open source",
    links: [
      { label: "GitHub", href: "https://github.com/ArshZaidi" },
    ],
    taught:
      "Data structures, abstraction, algorithmic thinking, implementation details, and writing reusable Python code.",
    tier: "minor",
  },
  {
    id: "nextgig",
    title: "NextGig",
    tagline: "A technology-oriented opportunity discovery project.",
    what: "A project built around the idea of discovering or connecting users with opportunities. Scope and implementation are being refined.",
    why: "To explore product discovery and matching as a problem domain.",
    role: "Developer",
    timeline: "2025",
    stack: ["Web"],
    status: "WIP",
    links: [],
    taught: "Product discovery, matching systems, and early-stage product design.",
    tier: "minor",
  },
];

/* ------------------------------------------------------------------ */
/* EXPERIENCE                                                          */
/* ------------------------------------------------------------------ */

export const experience: ExperienceEntry[] = [
  {
    id: "myraq-exp",
    period: "2024 — present",
    role: "Founder & CEO",
    org: "MYRAQ.ai",
    summary:
      "A live AI startup in the relationships and marriage space, run alongside full-time schooling.",
    points: [
      "Personally developed the complete application — architecture through to shipped code, 100+ hours of coding.",
      "Recruited and managed a distributed team of 12 interns across development, marketing and research.",
      "Negotiated and signed partnerships with adjacent early-stage companies.",
      "Represented the company in pitches and at university hackathon collaborations.",
      "Handled the commercial side end-to-end: people, presentations, deal-making and marketing.",
    ],
    proof: ["myraq-live"],
  },
  {
    id: "medium-writing",
    period: "2024 — present",
    role: "Writer & Poet",
    org: "Medium · Rekhta",
    summary:
      "Published writer and poet. Creative non-fiction and poetry across Medium and Rekhta, with a dedicated readership.",
    points: [
      "Publish long-form essays and poetry on Medium.",
      "Submitted poetry to Rekhta, India's largest Urdu literature platform, with a positive editorial response.",
      "Write regularly across technical and literary themes.",
    ],
    proof: ["medium-profile"],
  },
  {
    id: "saajha",
    period: "2023 — present",
    role: "Lead Volunteer",
    org: "Saajha NGO",
    summary:
      "Volunteer work focused on spreading educational awareness among underprivileged students. Received a certificate of recognition from Saajha.",
    points: [
      "Led outreach to under-resourced students, promoting educational awareness and access.",
      "Worked with the Saajha team on community-level education initiatives.",
      "Received a certificate from Saajha NGO in recognition of the work.",
    ],
    proof: ["saajha-cert"],
  },
  {
    id: "cbse-scribe",
    period: "Class XI",
    role: "CBSE Scribe",
    org: "Delhi Public School",
    summary:
      "Served as an official CBSE scribe for a specially-abled candidate during board examinations.",
    points: [
      "Certified CBSE scribe — examination-cycle commitment across multiple papers.",
      "Provided written assistance to a specially-abled student throughout the examination.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* ACHIEVEMENTS                                                        */
/* ------------------------------------------------------------------ */

export const achievements: AchievementGroup[] = [
  {
    id: "academics",
    label: "Academics",
    items: [
      {
        title: "DPS Scholar — 9 consecutive years",
        meta: "Certificate + trophy",
        proof: ["dps-scholar-trophy"],
      },
      {
        title: "Computer Science Valedictorian",
        meta: "DPS",
      },
      {
        title: "Mathematics — top percentile",
        meta: "Throughout high school",
      },
      {
        title: "Outstanding Performance Award",
        meta: "Alika Group of Excellence · Class X",
        proof: ["alika-award"],
      },
      {
        title: "Class X — 96%",
        meta: "94 Mathematics · 97 AI",
      },
      {
        title: "Class XII — 92%",
        meta: "92 Mathematics · 94 CS",
      },
    ],
  },
  {
    id: "olympiad",
    label: "Olympiad & Competition",
    items: [
      {
        title: "National Cyber Olympiad",
        meta: "International Rank 194 · Gold Medal",
        proof: ["nco-gold"],
      },
      {
        title: "HackerRank Problem Solving",
        meta: "5★ rating",
        proof: ["hackerrank-profile"],
      },
      {
        title: "LeetCode",
        meta: "500+ problems solved",
        proof: ["leetcode-profile"],
      },
    ],
  },
  {
    id: "recognition",
    label: "Recognition",
    items: [
      {
        title: "Google Cloud Skill Badges",
        meta: "16 ML badges + Arcade credentials",
        proof: ["google-dev"],
      },
      {
        title: "Published Writer & Poet",
        meta: "Medium · Rekhta",
        proof: ["medium-profile"],
      },
      {
        title: "DELF French A1 · A2 · B1",
        meta: "Ministère de l'Éducation nationale",
        proof: ["delf-a1", "delf-a2", "delf-b1"],
      },
      {
        title: "Duolingo",
        meta: "150+ day streak · current semifinalist",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* RESEARCH                                                            */
/* ------------------------------------------------------------------ */

export const research = {
  title: "ADAUC — Advancing Calibration Methods in Neural Networks",
  status: "Preprint prepared · Awaiting arXiv endorsement",
  abstract:
    "A proposed advancement to the calibration of neural network confidence estimates, with a focus on improving reliability without degrading accuracy.",
  notes: [
    "Preprint (ADAUC) prepared for arXiv — currently seeking endorsement.",
    "Simultaneously under review at the Young Scientist Journal.",
  ],
};

/* ------------------------------------------------------------------ */
/* CERTIFICATIONS                                                      */
/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
  {
    id: "anthropic-mcp",
    title: "Model Context Protocol — Basic & Advanced Topics",
    issuer: "Anthropic",
    year: "2026",
    duration: "~3h 10m each",
    covers:
      "Sampling, notifications, file system access, transports for production MCP servers, server-client communication, and deployment considerations.",
    why: "Directly applied in AI-Startup-MCP — the MCP server that evaluates startup ideas.",
    group: "AI / ML",
    proof: ["mcp-cert"],
  },
  {
    id: "anthropic-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    year: "2026",
    covers:
      "Foundational framework for working with AI systems — evaluation, safety and applied fluency.",
    why: "Grounding for how I approach AI product design.",
    group: "AI / ML",
    proof: ["ai-fluency-cert"],
  },
  {
    id: "dla-rag",
    title: "Retrieval Augmented Generation (RAG)",
    issuer: "DeepLearning.AI",
    year: "2026",
    duration: "~26h · 5 modules · 49 lessons",
    covers:
      "Information retrieval and search foundations, vector databases, document processing, retrieval-generation orchestration, prompt design, evaluation, and deployment.",
    why: "The architecture behind HR365 — the RAG-based HR knowledge platform.",
    group: "AI / ML",
    proof: ["rag-cert"],
  },
  {
    id: "cs50",
    title: "CS50x — Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2024",
    covers:
      "C, Python, SQL, Flask, HTML, CSS, JavaScript — a full-stack computer science foundation.",
    why: "The first course that made me a programmer rather than a script-kid.",
    group: "Computer Science",
    proof: ["cs50-cert"],
  },
  {
    id: "iitm-cert",
    title: "AI & Data Science (2-month certification)",
    issuer: "IIT Madras",
    year: "2024",
    duration: "2 months",
    covers:
      "Artificial intelligence and data science fundamentals, with an undergraduate-level ML project against a real-time database.",
    why:
      "Certificate of Completion + Certificate of Appreciation for Excellent Performance.",
    group: "AI / ML",
    proof: ["iitm-cert", "iitm-appreciation"],
  },
  {
    id: "mit-mcs",
    title: "Mathematics for Computer Science",
    issuer: "MIT Open Learning",
    year: "2024",
    covers:
      "Linear algebra (18.06), probability and statistics (18.05), and discrete mathematics (6.042).",
    why: "The mathematical foundation for my ML and research work.",
    group: "Computer Science",
    proof: ["mit-cert"],
  },
  {
    id: "mit-ml",
    title: "Introduction to Machine Learning (6.036)",
    issuer: "MIT Open Learning",
    year: "2024",
    covers:
      "Supervised learning, neural networks, model evaluation — the classical ML stack.",
    why: "Underpins the ADAUC calibration research.",
    group: "AI / ML",
    proof: ["mit-cert"],
  },
  {
    id: "mit-java",
    title: "Advanced Software Construction in Java (6.005)",
    issuer: "MIT Open Learning",
    year: "2024",
    covers:
      "Software construction, testing, abstraction, and engineering discipline at production scale.",
    why: "Where I learned to write software that other people can read.",
    group: "Computer Science",
    proof: ["mit-cert"],
  },
  {
    id: "google-vision",
    title: "ML & AI with Cloud Vision API",
    issuer: "Google Cloud",
    year: "2025",
    covers: "Image analysis and ML with Google Cloud Vision.",
    why: "First hands-on use of production cloud ML.",
    group: "Cloud",
    proof: ["google-badge-vision"],
  },
  {
    id: "google-ml",
    title: "16× Machine Learning Skill Badges",
    issuer: "Google Cloud",
    year: "2025",
    covers:
      "A structured series of ML skill badges across Google Cloud's ML curriculum.",
    why: "Breadth across cloud ML tooling.",
    group: "Cloud",
    proof: ["google-dev"],
  },
  {
    id: "google-arcade",
    title: "Cloud Arcade — Game Badges & Certificates",
    issuer: "Google Cloud",
    year: "2025",
    covers: "Google Cloud Arcade — hands-on cloud labs and game badges.",
    why: "Practical cloud fluency outside the classroom.",
    group: "Cloud",
    proof: ["google-dev"],
  },
  {
    id: "hr-python",
    title: "Python (Basic)",
    issuer: "HackerRank",
    year: "2024",
    covers: "Python fundamentals — HackerRank skill certification.",
    why: "Early structured validation of Python.",
    group: "Assessment",
    proof: ["hackerrank-profile"],
  },
  {
    id: "hr-ps",
    title: "Problem Solving (Basic & Intermediate)",
    issuer: "HackerRank",
    year: "2024",
    covers: "Algorithmic problem solving — basic and intermediate tracks.",
    why: "Foundation for competitive programming.",
    group: "Assessment",
    proof: ["hackerrank-profile"],
  },
  {
    id: "hr-swe",
    title: "Software Engineer Intern + Software Engineer",
    issuer: "HackerRank",
    year: "2025",
    covers:
      "Two role-based skill certifications covering software engineering fundamentals.",
    why: "Role-level validation of engineering skill.",
    group: "Assessment",
    proof: ["hackerrank-profile"],
  },
  {
    id: "delf-cert",
    title: "DELF A1 · A2 · B1",
    issuer: "Ministère de l'Éducation nationale (France)",
    year: "2022 — 2024",
    covers:
      "Official French-language diploma — three successive levels completed.",
    why: "Multilingual capability beyond English and Hindi/Urdu.",
    group: "Language",
    proof: ["delf-a1", "delf-a2", "delf-b1"],
  },
];

/* ------------------------------------------------------------------ */
/* PORTFOLIO DATA OBJECT                                               */
/* ------------------------------------------------------------------ */

export interface PortfolioData {
  profile: typeof profile;
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  achievements: AchievementGroup[];
  research: typeof research;
  certifications: Certification[];
}

export const portfolio: PortfolioData = {
  profile,
  education,
  skills,
  projects,
  experience,
  achievements,
  research,
  certifications,
};