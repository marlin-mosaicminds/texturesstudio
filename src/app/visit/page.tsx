import { site, formatTime } from "@/data/site";
import { homeFaqs, visible } from "@/data/content";
import { isDev } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hair Salon in Cordova, TN: Hours & Directions",
  description: `Textures Salon & Spa, ${site.address.street}, Cordova, TN. Open ${site.hoursSummary}. Call ${site.phone}.`,
  path: "/visit",
});

export default function VisitPage() {
  const a = site.address;
  const faqs = visible(homeFaqs.slice(0, 3), isDev);
  return (
    <>
      <section className="visit-grid">
        <iframe className="visit-map" src={site.mapsEmbed} title="Map to Textures Salon & Spa" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="section stack">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Visit", path: "/visit" }]} />
          <h1 className="h-xl">Hair salon in Cordova, Memphis</h1>
          <address style={{ fontStyle: "normal", fontSize: 18 }}>
            {site.name}<br />{a.street}<br />{a.city}, {a.region} {a.postalCode}
          </address>
          <div className="btn-row">
            <a href={site.mapsUrl} className="btn btn--forest"><Icon name="pin" size={18} />Get directions</a>
            <a href={site.phoneHref} className="btn btn--outline"><Icon name="phone" size={18} />Call {site.phone}</a>
          </div>
          <a href={`mailto:${site.email}`} className="text-link">{site.email}</a>
          <div className="stack" style={{ gap: 8 }}>
            <h2 className="h-md">Hours</h2>
            <dl className="hours">
              {site.hours.map((h) => (
                <div key={h.day}>
                  <dt>{h.day}</dt>
                  {h.open && h.close ? <dd>{formatTime(h.open)} – {formatTime(h.close)}</dd> : <dd className="closed">Closed</dd>}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section id="policies" className="section bg-stone stack" aria-labelledby="pol-h">
        <h2 id="pol-h" className="h-md">Policies</h2>
        <div className="card-grid">
          {site.policies.map((p) => (
            <div key={p.title} className="info-card"><h3>{p.title}</h3><p>{p.body}</p></div>
          ))}
        </div>
      </section>
      <section id="about" className="section stack" aria-labelledby="about-h">
        <h2 id="about-h" className="h-md">About Textures</h2>
        <p className="lede" style={{ color: "var(--noir)" }}>Textures Salon & Spa has been an Aveda concept salon in Cordova since {site.founded}, offering {site.serviceCount} hair and skin services delivered to one standard.</p>
      </section>
      <section className="section bg-stone" aria-labelledby="faq-h">
        <div className="faq-layout">
          <div className="section-head"><p className="eyebrow">Questions</p><h2 id="faq-h" className="h-lg">Before you visit.</h2></div>
          <Faq items={faqs} />
        </div>
        <JsonLd data={faqSchema(faqs)} />
      </section>
    </>
  );
}
