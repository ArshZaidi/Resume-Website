import type { PortfolioData } from "@/data/portfolio";

export default function SiteFooter({ portfolio }: { portfolio: PortfolioData }) {
  const { profile } = portfolio;

  return (
    <footer className="site-footer">
      <span>
        {profile.name} · {new Date().getFullYear()}
      </span>

      <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <a href={profile.links.github} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">
          LinkedIn
        </a>
        <a href={profile.links.leetcode} target="_blank" rel="noreferrer noopener">
          LeetCode
        </a>
        <a href={profile.links.medium} target="_blank" rel="noreferrer noopener">
          Writing
        </a>
        <a href={profile.links.email}>Email</a>
      </nav>

      <span>Built from scratch · Next.js · GSAP</span>
    </footer>
  );
}