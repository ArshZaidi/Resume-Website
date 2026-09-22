/**
 * SINGLE SOURCE OF TRUTH.
 * Everything rendered on the site comes from this file.
 * Verify each entry against your records before publishing.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  category: string;
  technologies: string[];
  links: Link[];
  featured?: boolean;
}

export interface EducationEntry {
  id: string;
  period: string;
  institution: string;
  credential: string;
  detail: string;
  score?: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  org: string;
  summary: string;
  points: string[];
}

export interface AchievementGroup {
  id: string;
  label: string;
  items: { title: string; meta?: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  group: "AI / ML" | "Computer Science" | "Cloud" | "Language" | "Assessment";
}

export interface SkillGroup {
  id: string;
  label: string;
  note: string;
  items: string[];
}

/* ------------------------------------------------------------------ */

export const profile = {
  name: "Arsh Zaidi",
  role: "Student · Developer · AI Builder · Entrepreneur",
  shortRole: "Developer / AI Builder / Entrepreneur",
  tagline: "I build systems at the intersection of AI, software and product.",
  location: "India",
  focus: "AI · Software · Product",
  currently: "Building MYRAQ.ai · Preparing university applications",
  bio: [
    "I'm an Indian high-school graduate who ships. Over the last two years I founded and ran MYRAQ.ai — an AI product for relationships and marriage — leading a distributed team of interns, writing the application myself, and handling partnerships, pitches and marketing alongside the engineering.",
    "My technical work sits mostly in applied machine learning and full-stack product: neural-network calibration research, retrieval-augmented systems, and the unglamorous work of getting a real product in front of real users.",
  ],
  // TODO: replace with your real handles before publishing
  links: {
    github: "https://github.com/arshzaidi",
    linkedin: "https://www.linkedin.com/in/arshzaidi",
    leetcode: "https://leetcode.com/arshzaidi",
    medium: "https://medium.com/@arshzaidi",
    email: "mailto:arsh@myraq.ai",
  },
  stats: [
    { value: "500+", label: "LeetCode problems" },
    { value: "11", label: "Interns led" },
    { value: "16", label: "Google ML badges" },
    { value: "9 yrs", label: "School scholar" },
  ],
};

/* ------------------------------------------------------------------ */

export const education: EducationEntry[] = [
  {
    id: "xii",
    period: "2024 — 2025",
    institution: "CBSE — Class XII",
    credential: "Senior Secondary",
    detail:
      "Computer Science and Mathematics. Named to the school honour list; Computer Science valedictorian.",
    score: "92%",
  },
  {
    id: "xi",
    period: "2023 — 2024",
    institution: "CBSE — Class XI",
    credential: "Senior Secondary",
    detail:
      "An interrupted year — a period of significant health difficulty and school-side marking irregularities. Context is documented and available on request.",
    score: "82%",
  },
  {
    id: "x",
    period: "2022 — 2023",
    institution: "CBSE — Class X",
    credential: "Secondary",
    detail:
      "Awarded for outstanding academic performance by the Alika Group of Excellence.",
    score: "96%",
  },
  {
    id: "iitm",
    period: "2024",
    institution: "IIT Madras",
    credential: "AI & Data Science",
    detail:
      "Six-month certification. Undergraduate-level machine learning project built against a real-time database. Received a Certificate of Appreciation for Excellent Performance.",
  },
  {
    id: "delf",
    period: "2022 — 2024",
    institution: "DELF — French",
    credential: "A1 · A2 · B1",
    detail: "Completed all three levels with comfortable margins.",
  },
];

/* ------------------------------------------------------------------ */

export const skills: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    note: "Day-to-day and coursework",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "ai",
    label: "AI / Machine Learning",
    note: "Applied and research",
    items: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
      "LLMs & RAG",
      "Model Context Protocol",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Product interfaces",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend & Data",
    note: "APIs and persistence",
    items: [
      "REST APIs",
      "Realtime databases",
      "Relational databases",
      "Auth flows",
    ],
  },
  {
    id: "tools",
    label: "Tooling",
    note: "Environment",
    items: ["Git", "GitHub", "Linux", "Vercel", "Jupyter"],
  },
];

/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "myraq",
    title: "MYRAQ.ai",
    tagline: "An AI product for relationships and marriage.",
    description:
      "Founded and led end-to-end. Architected and personally built the application, recruited and managed a distributed team across development, marketing and research, and ran the commercial side — partnerships, pitches, hackathon collaborations at universities, and go-to-market.",
    role: "Founder & CEO",
    year: "2024 — present",
    category: "AI Product",
    technologies: ["Python", "LLMs", "Next.js", "REST APIs"],
    links: [{ label: "Visit", href: "https://myraq.ai" }],
    featured: true,
  },
  {
    id: "mcp",
    title: "AI Startup MCP",
    tagline: "An open-source MCP server that critiques startup ideas.",
    description:
      "A Model Context Protocol server that evaluates a submitted startup idea and returns specialised, structured suggestions for turning it into an operating business — market framing, differentiation, and first-milestone sequencing.",
    role: "Author",
    year: "2025",
    category: "Open Source",
    technologies: ["MCP", "Python", "LLM Tooling"],
    links: [{ label: "GitHub", href: "https://github.com/arshzaidi" }],
  },
  {
    id: "jellyfish",
    title: "Procedural Jellyfish System",
    tagline: "Mathematical art rendered from parametric equations.",
    description:
      "Live 3D jellyfish built entirely from mathematical equations — colour-coded, animated in real time, and open-sourced.",
    role: "Author",
    year: "2025",
    category: "Creative Code",
    technologies: ["Desmos", "Parametric Geometry"],
    links: [{ label: "GitHub", href: "https://github.com/arshzaidi" }],
  },
  {
    id: "library",
    title: "Personal Library Manager",
    tagline: "A catalogue and lending system for a personal collection.",
    description:
      "Tracks ownership, reading state and lending history, with search and lightweight metadata handling. Built as a full-stack exercise in data modelling and state management.",
    role: "Author",
    year: "2025",
    category: "Full Stack",
    technologies: ["Python", "SQL", "Web"],
    links: [{ label: "GitHub", href: "https://github.com/arshzaidi" }],
  },
  {
    id: "stock",
    title: "Stock Dashboard Viewer",
    tagline: "A public dashboard for reading market movement.",
    description:
      "Market data dashboard with a focus on fast, legible chart reading. Public repository.",
    role: "Author",
    year: "2025",
    category: "Data",
    technologies: ["JavaScript", "Charting", "APIs"],
    links: [{ label: "GitHub", href: "https://github.com/arshzaidi" }],
  },
  {
    id: "sih",
    title: "SIH Website — Redesign",
    tagline: "A redesign study for a Smart India Hackathon interface.",
    description:
      "A ground-up rethink of information architecture and visual hierarchy for a hackathon platform — restructuring how participants discover and enter problem statements.",
    role: "Designer & Developer",
    year: "2025",
    category: "Design",
    technologies: ["Next.js", "Tailwind CSS"],
    links: [{ label: "GitHub", href: "https://github.com/arshzaidi" }],
  },
];

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
      "Personally developed the complete application — architecture through to shipped code.",
      "Recruited and managed a distributed team of interns across development, marketing and research.",
      "Negotiated partnerships with adjacent early-stage companies.",
      "Represented the company in pitches and at university hackathon collaborations.",
    ],
  },
  {
    id: "codec",
    period: "2025",
    role: "Python Development Intern",
    org: "Codec Technologies Inc.",
    summary:
      "A structured internship in applied Python, completed with a formal offer letter, letter of recommendation and certificate.",
    points: [
      "Worked through guided, production-shaped Python tasks.",
      "Delivered all assigned work to completion and received a letter of recommendation.",
    ],
  },
  {
    id: "research",
    period: "2025",
    role: "Independent Researcher",
    org: "Neural Network Calibration",
    summary:
      "Authored a preprint (ADAUC) proposing an advancement to calibration methods in neural networks. Currently awaiting arXiv endorsement and under review at the Young Scientist Journal.",
    points: [
      "Formulated and formalised the calibration method.",
      "Prepared the manuscript for preprint and peer review.",
    ],
  },
  {
    id: "volunteer",
    period: "2023 — present",
    role: "Volunteer",
    org: "CBSE Scribe Programme · Saajha NGO",
    summary:
      "Served as an official scribe for a specially-abled CBSE candidate, and worked with Saajha to spread educational awareness among underprivileged students.",
    points: [
      "CBSE scribe — certified, examination-cycle commitment.",
      "Saajha NGO — education awareness outreach to under-resourced students.",
    ],
  },
];

/* ------------------------------------------------------------------ */

export const achievements: AchievementGroup[] = [
  {
    id: "academics",
    label: "Academics",
    items: [
      { title: "Academic Scholar", meta: "9 consecutive years" },
      { title: "Outstanding Performance Award", meta: "Alika Group of Excellence" },
      { title: "Computer Science Valedictorian", meta: "High school" },
      { title: "Mathematics — top percentile", meta: "Throughout high school" },
    ],
  },
  {
    id: "olympiad",
    label: "Olympiad & Competition",
    items: [
      { title: "National Cyber Olympiad", meta: "International Rank 194 · Gold Medal" },
      { title: "HackerRank Problem Solving", meta: "5★ rating" },
      { title: "LeetCode", meta: "500+ problems solved" },
    ],
  },
  {
    id: "recognition",
    label: "Recognition",
    items: [
      { title: "Google Cloud Skill Badges", meta: "16 ML badges + Arcade credentials" },
      { title: "Published Writer & Poet", meta: "Medium · Rekhta" },
      { title: "Duolingo", meta: "150+ day streak · current semifinalist" },
    ],
  },
];

/* ------------------------------------------------------------------ */

export const research = {
  title: "ADAUC — Advancing Calibration Methods in Neural Networks",
  status: "Preprint prepared · Awaiting arXiv endorsement",
  abstract:
    "A proposed advancement to the calibration of neural network confidence estimates, with a focus on improving reliability without degrading accuracy.",
  notes: [
    "Preprint published to arXiv (ADAUC) — currently seeking endorsement.",
    "Simultaneously under review at the Young Scientist Journal.",
  ],
};

/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
  { id: "cs50", title: "CS50x — Introduction to Computer Science", issuer: "Harvard University", group: "Computer Science" },
  { id: "iitm-cert", title: "AI & Data Science (6-month)", issuer: "IIT Madras", group: "AI / ML" },
  { id: "mit-mcs", title: "Mathematics for Computer Science", issuer: "MIT Open Learning", group: "Computer Science" },
  { id: "mit-ml", title: "Introduction to Machine Learning", issuer: "MIT Open Learning", group: "AI / ML" },
  { id: "mit-java", title: "Advanced Software Construction in Java", issuer: "MIT Open Learning", group: "Computer Science" },
  { id: "anthropic-mcp", title: "Model Context Protocol — Basic & Advanced", issuer: "Anthropic", group: "AI / ML" },
  { id: "anthropic-fluency", title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", group: "AI / ML" },
  { id: "dla-rag", title: "Retrieval-Augmented Generation", issuer: "DeepLearning.AI", group: "AI / ML" },
  { id: "google-vision", title: "ML & AI with Cloud Vision API", issuer: "Google Cloud", group: "Cloud" },
  { id: "google-ml", title: "16× Machine Learning Skill Badges", issuer: "Google Cloud", group: "Cloud" },
  { id: "google-arcade", title: "Cloud Arcade — Game Badges & Certificates", issuer: "Google Cloud", group: "Cloud" },
  { id: "hr-python", title: "Python (Basic)", issuer: "HackerRank", group: "Assessment" },
  { id: "hr-ps", title: "Problem Solving (Basic & Intermediate)", issuer: "HackerRank", group: "Assessment" },
  { id: "hr-swe", title: "Software Engineer Intern + Software Engineer", issuer: "HackerRank", group: "Assessment" },
  { id: "delf-cert", title: "DELF A1 · A2 · B1", issuer: "Ministère de l'Éducation nationale", group: "Language" },
];

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