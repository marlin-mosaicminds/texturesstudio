"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { Icon } from "./Icon";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Areas we serve", href: "/areas", match: "/hair-salon-" },
  { label: "Visit", href: "/visit" },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <a className="skip-link" href="#main">Skip to content</a>
      <Link href="/" className="header__logo" aria-label={`${site.name} home`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wordmark-mustard.svg" alt="" width={149} height={32} />
      </Link>
      <nav aria-label="Main" className="header__nav">
        {nav.map((n) => {
          const active = path === n.href || path.startsWith(n.href + "/") || (!!n.match && path.startsWith(n.match));
          return (
            <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className="header__link">
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="header__actions">
        <a href={site.phoneHref} className="header__phone" aria-label={`Call ${site.name}`}>
          <Icon name="phone" size={20} />
          <span className="header__phone-number">{site.phone}</span>
        </a>
        <Link href="/book" className="btn btn--chalk header__book">Book a visit</Link>
      </div>
    </header>
  );
}
