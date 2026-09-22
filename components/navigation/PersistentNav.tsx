"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stations } from "@/data/stations";
import type { Station } from "@/data/stations";
import { links } from "@/data/links";
import { useRealmTransition } from "@/components/journey/TransitionProvider";

interface Props {
  station?: Station;
}

export default function PersistentNav({ station }: Props) {
  const pathname = usePathname();
  const navigate = useRealmTransition();

  return (
    <nav className="persistent-nav" aria-label="Station navigation">
      <Link href="/" className="persistent-nav__brand" data-cursor="HOME">
        Arsh Raza Zaidi
      </Link>

      <div className="persistent-nav__stations">
        {stations.map((s) => {
          const active = station?.id === s.id || pathname === s.route;
          return (
            <button
              key={s.id}
              type="button"
              className="persistent-nav__dot"
              data-active={active}
              aria-label={`${s.number} ${s.title}`}
              data-cursor={s.title.toUpperCase()}
              onClick={() =>
                navigate({
                  href: s.route,
                  number: s.number,
                  title: s.title,
                  subtitle: s.subtitle,
                })
              }
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