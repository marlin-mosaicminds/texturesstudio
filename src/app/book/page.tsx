import Link from "next/link";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon, type IconName } from "@/components/Icon";
import { pageMeta } from "@/lib/seo";
import { bookingUrl } from "@/lib/booking";

export const metadata = pageMeta({
  title: "Book a Hair Appointment in Memphis",
  description: "Book a hair or skin appointment at Textures Salon & Spa in Cordova, Memphis. Choose a service or book with your stylist.",
  path: "/book",
});

const options: { icon: IconName; title: string; desc: string; href: string; external?: boolean }[] = [
  { icon: "list", title: "Choose a service", desc: `Browse all ${site.serviceCount} services, then pick a time.`, href: "/services" },
  { icon: "user", title: "Book with a stylist", desc: "Start with the person you already trust.", href: "/team" },
  { icon: "rebook", title: "Rebook a past service", desc: "Sign in to see your history and repeat a visit.", href: bookingUrl, external: true },
  { icon: "gift", title: "Gift cards", desc: "Send a visit to someone else.", href: bookingUrl, external: true },
];

export default function BookPage() {
  return (
    <section className="section">
      <div className="book-grid stack">
        <div className="stack" style={{ gap: 20 }}>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Book a visit", path: "/book" }]} />
          <h1 className="h-xl">Book a visit</h1>
          <p className="lede">Choose how you want to start. Booking takes about two minutes.</p>
          <div className="first-visit"><strong>First visit</strong><p>{site.offers.newGuest} Referrals give both guests 15%.</p></div>
          <div className="stack" style={{ gap: 16 }}>
            <p className="eyebrow">Before you book</p>
            {[
              ["Changes and cancellations", "24 hours’ notice to cancel or reschedule."],
              ["Hours", `${site.hoursSummary}. Closed Sunday.`],
            ].map(([t, b]) => (
              <div key={t}><p style={{ fontWeight: 600 }}>{t}</p><p style={{ color: "var(--sage)" }}>{b}</p></div>
            ))}
            <div><p style={{ fontWeight: 600 }}>Questions</p><p style={{ color: "var(--sage)" }}>Call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div>
          </div>
        </div>
        <ul className="options">
          {options.map((o) => {
            const inner = (
              <>
                <span className="option__icon"><Icon name={o.icon} /></span>
                <span className="option__text"><span className="option__title">{o.title}</span><span className="option__desc">{o.desc}</span></span>
                <Icon name="chevron" strokeWidth={1.75} />
              </>
            );
            return <li key={o.title}>{o.external ? <a href={o.href} className="option">{inner}</a> : <Link href={o.href} className="option">{inner}</Link>}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
