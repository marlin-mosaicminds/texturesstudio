import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/data/cities";
import { getCategory, priceLabel } from "@/data/services";
import { site, isDev } from "@/data/site";
import { cityFaqs, reviews, visible } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { Faq } from "@/components/Faq";
import { ReviewCard } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ citySlug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ citySlug: string }> }) {
  const c = getCity((await params).citySlug);
  if (!c) return {};
  return pageMeta({
    title: `Hair Salon Near ${c.name}, TN`,
    description: `Aveda concept salon in Cordova${c.driveMinutes ? `, about ${c.driveMinutes} minutes from ${c.name}` : ` serving ${c.name}`}. Silk press, color, locs, braids, and facials. Book online.`,
    path: `/${c.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ citySlug: string }> }) {
  const c = getCity((await params).citySlug);
  if (!c) notFound();
  const faqs = visible(cityFaqs(c.name, c.driveMinutes), isDev);
  const cityReviews = visible(reviews.filter((r) => r.city === c.name || r.draft), isDev);
  const popular = c.popular.map(getCategory).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const facts = [
    [c.driveMinutes ? `${c.driveMinutes} min` : "Nearby", `From ${c.name}`],
    [String(site.serviceCount), "Hair and skin services"],
    ["Aveda", "Concept salon"],
    ["6:30 AM", "Open Monday – Saturday"],
  ];
  return (
    <>
      <section className="dark">
        <div className="split">
          <Photo src={c.image} alt={`Textures Salon & Spa, serving ${c.name}`} caption={`Salon interior or guest portrait, unique to ${c.name}`} priority />
          <div className="split__text" style={{ order: -1 }}>
            <Breadcrumbs tone="dark" items={[{ name: "Home", path: "/" }, { name: "Areas we serve", path: "/areas" }, { name: c.name, path: `/${c.slug}` }]} />
            <p className="eyebrow eyebrow--mustard">Serving {c.name}, TN</p>
            <h1 className="h-xl">Hair salon near {c.name}, TN</h1>
            <p className="lede">{c.intro}</p>
            <div className="btn-row">
              <Link href="/book" className="btn btn--chalk">Book a visit</Link>
              <a href={site.mapsUrl} className="btn btn--ghost-light"><Icon name="pin" size={18} />Get directions</a>
            </div>
          </div>
        </div>
        <div className="container" style={{ paddingBottom: 36 }}>
          <div className="facts">{facts.map(([a, b]) => <div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div>
        </div>
      </section>

      <section className="section stack" aria-labelledby="pop-h">
        <div className="section-head section-head--split">
          <div className="section-head">
            <p className="eyebrow">Popular with {c.name} guests</p>
            <h2 id="pop-h" className="h-lg">Services {c.name} guests book most.</h2>
          </div>
          <Link href="/services" className="text-link">View all services & prices</Link>
        </div>
        <ul className="popular">
          {popular.map((p) => (
            <li key={p.slug}>
              <Link href={`/services/${p.slug}`}>
                <Photo src={p.image} alt={p.name} caption={p.photo} sizes="(min-width: 1024px) 300px, 88px" />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="popular__name">{p.name}</span>
                  <span className="popular__desc">{p.short}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{priceLabel(p.services[0])}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="split bg-stone" aria-labelledby="route-h">
        <Photo alt={`Map from ${c.name} to Textures`} caption={`Route from ${c.name} to the salon`} tone="light" />
        <div className="split__text" style={{ order: -1 }}>
          <p className="eyebrow">Getting here</p>
          <h2 id="route-h" className="h-lg">From {c.name} to Textures.</h2>
          <p>{c.route}</p>
          <ul className="route-list">
            {c.driveMinutes && <li><Icon name="car" size={20} />{c.driveMinutes} minutes by car from {c.name}</li>}
            <li><Icon name="pin" size={20} />{site.address.street}, {site.address.city}</li>
            <li><Icon name="clock" size={20} />{site.hoursSummary}</li>
          </ul>
          <div><a href={site.mapsUrl} className="btn btn--forest"><Icon name="pin" size={18} />Get directions</a></div>
        </div>
      </section>

      {cityReviews.length > 0 && (
        <section className="section bg-stone stack" style={{ paddingTop: 0 }} aria-labelledby="rev-h">
          <div className="section-head"><p className="eyebrow">Reviews</p><h2 id="rev-h" className="h-lg">From our {c.name} guests.</h2></div>
          <div className="reviews">{cityReviews.map((r, i) => <ReviewCard key={i} r={{ ...r, city: r.city ?? c.name }} />)}</div>
        </section>
      )}

      <section className="section" aria-labelledby="faq-h">
        <div className="faq-layout">
          <div className="section-head"><p className="eyebrow">Questions</p><h2 id="faq-h" className="h-lg">{c.name} guests ask.</h2></div>
          <Faq items={faqs} />
        </div>
        <JsonLd data={faqSchema(faqs)} />
      </section>

      <section className="section stack" style={{ paddingTop: 0 }} aria-labelledby="also-h">
        <div className="section-head"><p className="eyebrow">Also serving</p><h2 id="also-h" className="h-md">Hair salon near you.</h2></div>
        <nav aria-label="Other cities" className="city-links">
          {cities.filter((o) => o.slug !== c.slug).map((o) => (
            <Link key={o.slug} href={`/${o.slug}`}>Hair salon near {o.name}, TN <Icon name="chevron" size={18} strokeWidth={1.75} /></Link>
          ))}
        </nav>
      </section>

      <section className="cta-band">
        <div className="stack" style={{ gap: 10 }}>
          <h2 className="h-lg">Book your visit from {c.name}.</h2>
          <p>{site.offers.newGuest}</p>
        </div>
        <Link href="/book" className="btn btn--chalk">Book a visit</Link>
      </section>
    </>
  );
}
