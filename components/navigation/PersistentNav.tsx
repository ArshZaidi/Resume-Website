"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stations } from "@/data/stations";
import type { Station } from "@/data/stations";
import { links } from "@/data/links";

interface Props {
  station?: Station;
}

export default function PersistentNav({ station }: Props) {
  const pathname = usePathname();

  return (
    <nav className="persistent-nav" aria-label="Station navigation">
      <Link href="/" className="persistent-nav__brand" data-cursor="HOME">
        Arsh Raza Zaidi
      </Link>

      <div className="persistent-nav__stations">
        {stations.map((s) => {
          const active = station?.id === s.id || pathname === s.route;
          return (
            <Link
              key={s.id}
              href={s.route === "/" ? "/" : s.route}
              className="persistent-nav__dot"
              data-active={active}
              aria-label={`${s.number} ${s.title}`}
              data-cursor={s.title.toUpperCase()}
            />
          );
        })}
      </div>

      <a
        href={links.linktree}
        className="persistent-nav__linktree"
        target="_blank"
        rel="noreferrer noopener"
        data-cursor="LINKS"
      >
        All links
      </a>
    </nav>
  );
}