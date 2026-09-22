/**
 * Every outbound URL on the site lives here.
 * No component hardcodes an href.
 */

export interface ExternalLink {
  id: string;
  label: string;
  description: string;
  href: string;
  /** lucide-react icon name, resolved in the component */
  icon: string;
}

export const links = {
  // Core identity
  github: "https://github.com/ArshZaidi",
  linkedin: "https://www.linkedin.com/in/arsh-raza-zaidi",
  leetcode: "https://leetcode.com/u/Arsh_Zaidi",
  hackerrank: "https://www.hackerrank.com/profile/arshzaidi03",
  codechef: "https://www.codechef.com/users/arshzaidi_l",
  codeforces: "https://codeforces.com/profile/ArshZaidi",
  medium: "https://medium.com/@arshzaidi",
  googleDev: "https://me.developers.google.com/u/111536273064133550287",
  myraq: "https://myraq.vercel.app",
  email: "mailto:arshzaidi03@gmail.com", // TODO: confirm preferred email
  linktree: "https://linktr.ee/arshzaidi", // TODO: replace with real Linktree
} as const;

/**
 * The full technical identity — order here is the display order.
 */
export const technicalLinks: ExternalLink[] = [
  {
    id: "github",
    label: "GitHub",
    description: "Repositories and source",
    href: links.github,
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional identity",
    href: links.linkedin,
    icon: "linkedin",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    description: "500+ problems solved",
    href: links.leetcode,
    icon: "code",
  },
  {
    id: "hackerrank",
    label: "HackerRank",
    description: "5★ problem solving",
    href: links.hackerrank,
    icon: "award",
  },
  {
    id: "codechef",
    label: "CodeChef",
    description: "Competitive programming",
    href: links.codechef,
    icon: "terminal",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    description: "Competitive programming",
    href: links.codeforces,
    icon: "activity",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Writing and poetry",
    href: links.medium,
    icon: "pen-tool",
  },
  {
    id: "google-dev",
    label: "Google Developer",
    description: "Cloud & ML badges",
    href: links.googleDev,
    icon: "cloud",
  },
  {
    id: "myraq",
    label: "MYRAQ.ai",
    description: "The product",
    href: links.myraq,
    icon: "sparkles",
  },
];