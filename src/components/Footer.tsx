import Link from "next/link";
import { site } from "@/data/site";
import { cities } from "@/data/cities";
import { bookingUrl } from "@/lib/booking";

const explore = [
  { label: "Home", href: "/" },
  { label: "Services & prices", href: "/services" },
  { label: "Book a visit", href: "/book" },
  { label: "Our team", href: "/team" },
  { label: "Visit us", href: "/visit" },
];
const salon = [
  { label: "About Textures", href: "/visit#about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gift cards", href: bookingUrl },
  { label: "Policies", href: "/visit#policies" },
  { label: "Careers", href: "/team#careers" },
];

export function Footer() {
  const a = site.address;
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/brandmark-mustard.svg" alt={site.name} width={112} height={108} />
          <p className="eyebrow eyebrow--mustard">{site.tagline}</p>
          <p className="footer__statement">An Aveda concept salon in Cordova since {site.founded}.</p>
          <Link href="/book" className="btn btn--chalk">Book a visit</Link>
        </div>
        <address className="footer__nap">
          <p className="eyebrow eyebrow--muted">Visit</p>
          <p className="footer__name">{site.name}</p>
          <p>{a.street}<br />{a.city}, {a.region} {a.postalCode}</p>
          <p><a href={site.phoneHref}>{site.phone}</a></p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p>{site.hoursSummary}<br /><span className="muted">Sunday, closed</span></p>
        </address>
        <FooterCol title="Explore" links={explore} />
        <FooterCol title="The salon" links={salon} />
        <FooterCol title="Areas we serve" links={cities.map((c) => ({ label: `Hair salon near ${c.name}, TN`, href: `/${c.slug}` }))} />
      </div>
      <div className="footer__legal">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="footer__col">
      <p className="eyebrow eyebrow--muted">{title}</p>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("http") ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
