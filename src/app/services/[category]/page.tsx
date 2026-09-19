import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/services";
import { site } from "@/data/site";
import { ServicesBrowser } from "@/components/ServicesBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { pageMeta } from "@/lib/seo";
import { bookingUrl } from "@/lib/booking";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) return {};
  return pageMeta({ title: c.seo.title, description: c.seo.description, path: `/services/${c.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const others = categories.filter((o) => o.slug !== c.slug);
  return (
    <>
      <section className="split dark">
        <Photo src={c.image} alt={c.name} caption={c.photo} priority />
        <div className="split__text" style={{ order: -1 }}>
          <Breadcrumbs tone="dark" items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: c.name, path: `/services/${c.slug}` }]} />
          <h1 className="h-xl">{c.seo.h1}</h1>
          <p className="lede">{c.seo.intro}</p>
          <div className="btn-row">
            <a href={bookingUrl} className="btn btn--chalk">Book a visit</a>
            <a href={site.phoneHref} className="btn btn--ghost-light">Call the salon</a>
          </div>
        </div>
      </section>
      <div className="section">
        <ServicesBrowser categories={[c]} showSearch={false} />
      </div>
      <section className="section bg-stone stack" aria-labelledby="more-h">
        <h2 id="more-h" className="h-md">More services</h2>
        <nav aria-label="Other services" className="city-links">
          {others.map((o) => <Link key={o.slug} href={`/services/${o.slug}`}>{o.name}</Link>)}
        </nav>
      </section>
    </>
  );
}
