import { site } from "@/data/site";
import { categories } from "@/data/services";
import { cities } from "@/data/cities";
import type { Faq } from "@/data/content";

const dayMap: Record<string, string> = {
  Monday: "https://schema.org/Monday", Tuesday: "https://schema.org/Tuesday", Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday", Friday: "https://schema.org/Friday", Saturday: "https://schema.org/Saturday", Sunday: "https://schema.org/Sunday",
};

export function salonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "DaySpa"],
    "@id": `${site.url}/#salon`,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: "+1-901-512-4792",
    email: site.email,
    foundingDate: String(site.founded),
    image: `${site.url}/brand/brandmark-mustard.svg`,
    logo: `${site.url}/brand/brandmark-mustard.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[h.day], opens: h.open, closes: h.close })),
    areaServed: [{ "@type": "City", name: "Memphis" }, ...cities.map((c) => ({ "@type": "City", name: c.name }))],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hair and skin services",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: c.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description },
          ...(s.priceFrom != null ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "USD" } } : {}),
        })),
      })),
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
