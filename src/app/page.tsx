import Link from "next/link";
import { site, isDev } from "@/data/site";
import { team } from "@/data/team";
import { homeFaqs, reviews, visible } from "@/data/content";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { Photo } from "@/components/Photo";
import { Faq } from "@/components/Faq";
import { ReviewCard } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({ title: "Hair Salon & Spa in Memphis, TN", description: site.description, path: "/" }),
  title: { absolute: "Hair Salon & Spa in Memphis, TN | Textures Salon & Spa" },
};

export default function Home() {
  const faqs = visible(homeFaqs, isDev);
  const shownReviews = visible(reviews, isDev);
  return (
    <>
      <section className="hero">
        <Photo className="hero__photo" alt="Guest portrait at Textures Salon & Spa" caption="Editorial portrait, Noir ground" priority />
        <div className="hero__content">
          <div className="hero__panel">
            <h1 className="hero__h1">Aveda hair salon & spa in Cordova, Memphis TN</h1>
            <p className="hero__tagline">{site.tagline}</p>
            <p className="hero__lede">Seventy-eight hair and skin services, held to one standard since {site.founded}.</p>
            <div className="btn-row">
              <Link href="/book" className="btn btn--chalk">Book a visit</Link>
              <Link href="/services" className="btn btn--ghost-light">View services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="offer" aria-label="New guest offer">
        <p><strong>{site.offers.newGuest}</strong> <span>{site.offers.referral}</span></p>
        <Link href="/visit#policies" className="icon-btn" aria-label="Offer details"><Icon name="chevron" strokeWidth={2} /></Link>
      </section>

      <section className="section stack" aria-labelledby="services-h" style={{ paddingRight: 0 }}>
        <div className="section-head" style={{ paddingRight: "var(--gutter)" }}>
          <div className="section-head__row">
            <p className="eyebrow">Services</p>
            <Link href="/services" className="text-link">View all {site.serviceCount}</Link>
          </div>
          <h2 id="services-h" className="h-lg">Choose the service. We hold the standard.</h2>
        </div>
        <ServiceCarousel />
      </section>

      <section className="section stack dark" aria-labelledby="team-h">
        <div className="section-head section-head--split">
          <div className="section-head">
            <p className="eyebrow eyebrow--mustard">The team</p>
            <h2 id="team-h" className="h-lg">Book by name.</h2>
            <p className="lede">Licensed stylists and an esthetician, each trained to the same standard.</p>
          </div>
          <Link href="/team" className="text-link">Meet the full team</Link>
        </div>
        <ul className="team-strip">
          {team.map((m) => (
            <li key={m.slug}>
              <Photo src={m.image} alt={`${m.name}, ${m.role.toLowerCase()}`} caption={`Portrait of ${m.name}`} sizes="(min-width: 1024px) 240px, 220px" />
              <div>
                <h3 className="team-strip__name">{m.name}</h3>
                <p className="team-strip__role">{m.role} · {m.specialty}</p>
              </div>
              <Link href={`/team/${m.slug}`} className="text-link">Book with {m.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="split" aria-labelledby="aveda-h">
        <Photo alt="Aveda products at Textures" caption="Aveda product detail, botanical framing" tone="light" />
        <div className="split__text">
          <p className="eyebrow">Aveda</p>
          <h2 id="aveda-h" className="h-lg">Plant-based care, by Aveda.</h2>
          <p style={{ maxWidth: "48ch" }}>Every service uses Aveda professional formulas. Your stylist recommends the products that keep the result at home.</p>
        </div>
      </section>

      {shownReviews.length > 0 && (
        <section className="section stack" aria-labelledby="reviews-h" style={{ paddingTop: 0 }}>
          <div className="section-head section-head--split">
            <div className="section-head">
              <p className="eyebrow">Reviews</p>
              <h2 id="reviews-h" className="h-lg">In our guests’ words.</h2>
            </div>
            <Link href="/reviews" className="text-link">Read more reviews</Link>
          </div>
          <div className="reviews">{shownReviews.map((r, i) => <ReviewCard key={i} r={r} />)}</div>
        </section>
      )}

      <section className="section bg-stone" aria-labelledby="faq-h">
        <div className="faq-layout">
          <div className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="h-lg">Common questions.</h2>
            <p className="lede">Can’t find your answer? Call the salon at <a href={site.phoneHref}>{site.phone}</a>.</p>
          </div>
          <Faq items={faqs} />
        </div>
        <JsonLd data={faqSchema(faqs)} />
      </section>
    </>
  );
}
