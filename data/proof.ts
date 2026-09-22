/**
 * Proof registry.
 * Every proof asset the site can render.
 * If a claim references a proof id and it's not here, the claim renders
 * without a proof chip — never fabricate.
 */

export type ProofType =
  | "github"
  | "live"
  | "certificate"
  | "publication"
  | "video"
  | "linkedin"
  | "document"
  | "award"
  | "profile";

export interface Proof {
  id: string;
  type: ProofType;
  title: string;
  source: string;
  href?: string;
  image?: string;
  note?: string;
}

export const proofs: Record<string, Proof> = {
  /* ---------- Projects ---------- */
  "myraq-live": {
    id: "myraq-live",
    type: "live",
    title: "MYRAQ.ai",
    source: "Live product",
    href: "https://myraq.vercel.app",
  },
  "sih-live": {
    id: "sih-live",
    type: "live",
    title: "SIH Website — Redesign",
    source: "Vercel deployment",
    href: "https://sih-website-redesigned.vercel.app/",
  },

  /* ---------- Education ---------- */
  "dps-certificate": {
    id: "dps-certificate",
    type: "certificate",
    title: "Delhi Public School — Academic Record",
    source: "DPS",
    note: "Available on request",
  },
  "dps-scholar-trophy": {
    id: "dps-scholar-trophy",
    type: "award",
    title: "DPS Scholar — 9 Consecutive Years",
    source: "Delhi Public School",
    note: "Certificate + trophy",
  },
  "iitm-cert": {
    id: "iitm-cert",
    type: "certificate",
    title: "AI & Data Science — Certificate of Completion",
    source: "IIT Madras",
  },
  "iitm-appreciation": {
    id: "iitm-appreciation",
    type: "certificate",
    title: "Certificate of Appreciation — Excellent Performance",
    source: "IIT Madras",
  },

  /* ---------- Language ---------- */
  "delf-a1": {
    id: "delf-a1",
    type: "certificate",
    title: "DELF A1",
    source: "Ministère de l'Éducation nationale",
  },
  "delf-a2": {
    id: "delf-a2",
    type: "certificate",
    title: "DELF A2",
    source: "Ministère de l'Éducation nationale",
  },
  "delf-b1": {
    id: "delf-b1",
    type: "certificate",
    title: "DELF B1",
    source: "Ministère de l'Éducation nationale",
  },

  /* ---------- Olympiad / Awards ---------- */
  "nco-gold": {
    id: "nco-gold",
    type: "award",
    title: "National Cyber Olympiad — International Rank 194",
    source: "NCO",
    note: "Gold Medal",
  },
  "alika-award": {
    id: "alika-award",
    type: "award",
    title: "Outstanding Academic Performance — Class X (96%+)",
    source: "Alika Group of Excellence",
  },

  /* ---------- Certifications ---------- */
  "cs50-cert": {
    id: "cs50-cert",
    type: "certificate",
    title: "CS50x — Introduction to Computer Science",
    source: "Harvard University",
  },
  "mit-cert": {
    id: "mit-cert",
    type: "certificate",
    title: "MIT Open Learning coursework",
    source: "MIT Open Learning",
  },
  "mcp-cert": {
    id: "mcp-cert",
    type: "certificate",
    title: "Model Context Protocol — Basic & Advanced",
    source: "Anthropic",
  },
  "ai-fluency-cert": {
    id: "ai-fluency-cert",
    type: "certificate",
    title: "AI Fluency: Framework & Foundations",
    source: "Anthropic",
  },
  "rag-cert": {
    id: "rag-cert",
    type: "certificate",
    title: "Retrieval Augmented Generation (RAG)",
    source: "DeepLearning.AI",
  },
  "google-dev": {
    id: "google-dev",
    type: "profile",
    title: "Google Developer Profile",
    source: "Google",
    href: "https://me.developers.google.com/u/111536273064133550287",
  },
  "google-badge-vision": {
    id: "google-badge-vision",
    type: "certificate",
    title: "ML & AI with Cloud Vision API",
    source: "Google Cloud",
  },

  /* ---------- Profiles ---------- */
  "hackerrank-profile": {
    id: "hackerrank-profile",
    type: "profile",
    title: "HackerRank — 5★ Problem Solving",
    source: "HackerRank",
    href: "https://www.hackerrank.com/profile/arshzaidi03",
  },
  "leetcode-profile": {
    id: "leetcode-profile",
    type: "profile",
    title: "LeetCode — 500+ problems solved",
    source: "LeetCode",
    href: "https://leetcode.com/u/Arsh_Zaidi",
  },
  "medium-profile": {
    id: "medium-profile",
    type: "profile",
    title: "Medium — Writing & Poetry",
    source: "Medium",
    href: "https://medium.com/@arshzaidi",
  },

  /* ---------- Volunteer ---------- */
  "saajha-cert": {
    id: "saajha-cert",
    type: "certificate",
    title: "Volunteer Recognition",
    source: "Saajha NGO",
  },
};

export function getProof(id: string): Proof | undefined {
  return proofs[id];
}