import { categories } from "@/data/services";
import { site } from "@/data/site";
import { ServicesBrowser } from "@/components/ServicesBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hair Salon Prices & Services in Memphis, TN",
  description: `${site.serviceCount} hair and skin services with starting prices at Textures Salon & Spa, an Aveda concept salon in Cordova, Memphis.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="page-intro">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services & prices", path: "/services" }]} />
        <h1 className="h-xl">Hair and skin services and prices</h1>
        <p className="lede">{site.serviceCount} hair and skin services at our Cordova, Memphis salon. Every service lists a starting price, and your stylist confirms the final price at consultation.</p>
      </div>
      <div className="services-layout">
        <aside className="services-aside">
          <div className="first-visit"><strong>First visit</strong><p>{site.offers.newGuest}</p></div>
        </aside>
        <ServicesBrowser categories={categories} />
      </div>
    </>
  );
}
