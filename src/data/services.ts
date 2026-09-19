// Services, grouped by category. Each category also gets its own SEO page at /services/[slug].
// TODO: replace every null price, duration, and zenotiServiceId with values from Zenoti
// (serviceId is in the URL of each service's Edit Service page: Admin → Resources → Services).

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMin: number | null;
  priceFrom: number | null;
  zenotiServiceId: string | null;
  included?: string[];
  providers?: string[]; // team slugs
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  photo: string; // caption shown until a real photo is added
  image?: string; // /images/services/*.jpg
  seo: { title: string; h1: string; description: string; intro: string };
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: "haircuts",
    name: "Cuts & styling",
    short: "Precision cuts, blowouts, and finished styles",
    photo: "Finished cut, movement in frame",
    seo: {
      title: "Haircuts & Styling in Memphis, TN",
      h1: "Haircuts and styling in Memphis",
      description: "Precision haircuts, blowouts, and finished styles at Textures Salon & Spa, an Aveda concept salon in Cordova, Memphis.",
      intro: "Every cut starts with a consultation and an Aveda wash, and ends with a finished style you can keep at home.",
    },
    services: [
      { id: "haircut-style", name: "Haircut and style", description: "Consultation, Aveda wash, precision cut, finished style.", durationMin: null, priceFrom: null, zenotiServiceId: null, included: ["Consultation", "Aveda wash", "Precision cut", "Finished style"] },
      { id: "blowout", name: "Blowout", description: "Aveda wash and a smooth, volumized finish.", durationMin: null, priceFrom: null, zenotiServiceId: null },
    ],
  },
  {
    slug: "silk-press",
    name: "Silk press",
    short: "Smooth, silk finish with Aveda heat protection",
    photo: "Silk press finish, side profile",
    seo: {
      title: "Silk Press in Memphis, TN",
      h1: "Silk press in Memphis",
      description: "Silk press with deep conditioning and Aveda heat protection at Textures Salon & Spa in Cordova, Memphis.",
      intro: "A deep-conditioning treatment and thermal press for a smooth finish with movement. Heat protection is applied before any heat.",
    },
    services: [
      { id: "silk-press", name: "Silk press", description: "Deep condition and thermal press with Aveda heat protection.", durationMin: null, priceFrom: null, zenotiServiceId: null, included: ["Consultation", "Aveda cleanse and deep condition", "Heat protection and thermal press", "Trim of ends, if needed"], providers: ["annie"] },
    ],
  },
  {
    slug: "hair-color",
    name: "Color",
    short: "Single-process, highlights, and corrective color",
    photo: "Dimensional color, close crop",
    seo: {
      title: "Hair Color Salon in Memphis, TN",
      h1: "Hair color in Memphis",
      description: "Single-process color, highlights, and color correction with Aveda plant-based color at Textures Salon & Spa, Memphis.",
      intro: "Color is formulated with Aveda plant-based color and placed by stylists who specialize in it.",
    },
    services: [
      { id: "single-process", name: "Single-process color", description: "One all-over shade, root to ends, with Aveda plant-based color.", durationMin: null, priceFrom: null, zenotiServiceId: null, providers: ["alexandria", "april", "miniya"] },
      { id: "highlights", name: "Highlights", description: "Dimension placed by hand, toned to finish.", durationMin: null, priceFrom: null, zenotiServiceId: null, providers: ["alexandria", "april", "miniya"] },
      { id: "color-correction", name: "Color correction", description: "Consultation required. Priced after assessment.", durationMin: null, priceFrom: null, zenotiServiceId: null },
    ],
  },
  {
    slug: "natural-hair-locs",
    name: "Natural hair & locs",
    short: "Wash and go, starter locs, and retwists",
    photo: "Defined curls or locs, profile",
    seo: {
      title: "Natural Hair Salon & Locs in Memphis, TN",
      h1: "Natural hair and locs in Memphis",
      description: "Natural hair care, starter locs, and retwists at Textures Salon & Spa, an Aveda concept salon in Cordova, Memphis.",
      intro: "Natural hair care, from definition and moisture to starter locs and maintenance retwists.",
    },
    services: [
      { id: "loc-retwist", name: "Loc retwist", description: "Cleanse, retwist, and style.", durationMin: null, priceFrom: null, zenotiServiceId: null },
      { id: "starter-locs", name: "Starter locs", description: "Consultation, sectioning, and installation.", durationMin: null, priceFrom: null, zenotiServiceId: null },
    ],
  },
  {
    slug: "braids-extensions",
    name: "Braids & extensions",
    short: "Knotless, boho, sew-ins, and tape-ins",
    photo: "Braid detail, back view",
    seo: {
      title: "Knotless Braids & Extensions in Memphis, TN",
      h1: "Braids and extensions in Memphis",
      description: "Knotless braids, boho braids, sew-ins, and tape-in extensions at Textures Salon & Spa in Cordova, Memphis.",
      intro: "Protective styles and extensions, installed with care for the hair underneath.",
    },
    services: [
      { id: "knotless-braids", name: "Knotless braids", description: "Knotless install, sized and finished to your length.", durationMin: null, priceFrom: null, zenotiServiceId: null },
      { id: "sew-in", name: "Sew-in", description: "Braided foundation and sewn-in install, blended and styled.", durationMin: null, priceFrom: null, zenotiServiceId: null },
    ],
  },
  {
    slug: "treatments",
    name: "Treatments",
    short: "Aveda botanical repair and scalp care",
    photo: "Aveda treatment at the bowl",
    seo: {
      title: "Aveda Hair Treatments in Memphis, TN",
      h1: "Aveda hair treatments in Memphis",
      description: "Aveda botanical repair and scalp treatments at Textures Salon & Spa, an Aveda concept salon in Cordova, Memphis.",
      intro: "Treatments that repair, strengthen, and balance the scalp, using Aveda professional formulas.",
    },
    services: [
      { id: "botanical-repair", name: "Botanical repair treatment", description: "Strengthening treatment for damaged hair.", durationMin: null, priceFrom: null, zenotiServiceId: null },
      { id: "scalp-treatment", name: "Scalp treatment", description: "Exfoliation and balancing care for the scalp.", durationMin: null, priceFrom: null, zenotiServiceId: null },
    ],
  },
  {
    slug: "facials",
    name: "Skin",
    short: "Facials, peels, and brows",
    photo: "Facial in progress, soft light",
    seo: {
      title: "Aveda Facials in Cordova, Memphis",
      h1: "Facials and skin care in Cordova",
      description: "Aveda facials, peels, and brow shaping at Textures Salon & Spa in Cordova, Memphis.",
      intro: "Skin services matched to your skin, performed by a licensed esthetician.",
    },
    services: [
      { id: "aveda-facial", name: "Aveda facial", description: "Cleanse, exfoliation, massage, and mask, matched to your skin.", durationMin: null, priceFrom: null, zenotiServiceId: null, providers: ["kayla"] },
      { id: "brow-shaping", name: "Brow shaping", description: "Clean, defined shape to suit your features.", durationMin: null, priceFrom: null, zenotiServiceId: null, providers: ["kayla"] },
    ],
  },
];

export const allServices = categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c })));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function priceLabel(s: Service) {
  return s.priceFrom != null ? `From $${s.priceFrom}` : "Price at booking";
}
export function durationLabel(s: Service) {
  if (s.durationMin == null) return null;
  const h = Math.floor(s.durationMin / 60);
  const m = s.durationMin % 60;
  return [h ? `${h} hr` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}
