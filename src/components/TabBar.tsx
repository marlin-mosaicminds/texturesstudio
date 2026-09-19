"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";

const tabs: { label: string; href: string; icon: IconName; match?: (p: string) => boolean }[] = [
  { label: "Home", href: "/", icon: "home", match: (p) => p === "/" },
  { label: "Services", href: "/services", icon: "list" },
  { label: "Book", href: "/book", icon: "calendar" },
  { label: "Team", href: "/team", icon: "team" },
  { label: "Visit", href: "/visit", icon: "pin", match: (p) => p.startsWith("/visit") || p.startsWith("/hair-salon-") },
];

// App-style bottom navigation, phones and tablets only.
export function TabBar() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="tabbar">
      {tabs.map((t) => {
        const active = t.match ? t.match(path) : path === t.href || path.startsWith(t.href + "/");
        if (t.label === "Book") {
          return (
            <Link key={t.href} href={t.href} className="tabbar__book" aria-current={active ? "page" : undefined}>
              <span className="tabbar__book-pill"><Icon name="calendar" size={20} strokeWidth={1.75} /></span>
              <span className="tabbar__label">Book</span>
            </Link>
          );
        }
        return (
          <Link key={t.href} href={t.href} className="tabbar__item" aria-current={active ? "page" : undefined}>
            <span className="tabbar__indicator" aria-hidden="true" />
            <Icon name={t.icon} size={22} strokeWidth={active ? 2 : 1.5} />
            <span className="tabbar__label">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
