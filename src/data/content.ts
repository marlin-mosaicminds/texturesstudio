// FAQs and reviews. Items marked draft: true show only in development, never on the live site
// and never in schema, so unconfirmed answers cannot go live by accident.

export type Faq = { q: string; a: string; draft?: boolean };
export type Review = { quote: string; name: string; detail: string; city?: string; draft?: boolean };

export const homeFaqs: Faq[] = [
  { q: "Where is Textures Salon & Spa?", a: "Textures is at 8100 Macon Station, Suite 105, in Cordova, Memphis, Tennessee." },
  { q: "How much does a haircut or color cost?", a: "Every service lists a starting price on our Services page. Final pricing depends on hair length, density, and the time your service needs, and your stylist confirms it at consultation." },
  { q: "Do you take walk-ins?", a: "Confirm before launch: answer only if walk-ins are accepted, and name the services and hours they apply to.", draft: true },
  { q: "Do you specialize in natural and textured hair?", a: "Our team offers natural hair care, silk press, locs, braids, and extensions alongside cuts, color, and skin services.", draft: true },
  { q: "Is there a discount for new guests?", a: "Yes. New guests receive 15% off services, and referrals give both guests 15%." },
];

export function cityFaqs(city: string, minutes: number | null): Faq[] {
  return [
    { q: `How far is Textures from ${city}?`, a: minutes ? `Textures is in Cordova, about ${minutes} minutes from central ${city} by car.` : `Textures is in Cordova. Add the drive time from ${city} before launch.`, draft: !minutes },
    { q: `Do you serve guests from ${city}?`, a: `Yes. Guests drive in from ${city} and nearby neighborhoods for color, natural hair, silk press, and skin services.` },
    { q: "What do services cost?", a: "Every service lists a starting price on our Services page. Your stylist confirms the final price at consultation." },
    { q: "Is there a discount for new guests?", a: "Yes. New guests receive 15% off services." },
  ];
}

// TODO: paste real Google reviews verbatim, with the guest's permission to show their first name.
export const reviews: Review[] = [
  { quote: "Guest review pulled verbatim from Google.", name: "Guest first name", detail: "Service with stylist", draft: true },
  { quote: "Guest review pulled verbatim from Google.", name: "Guest first name", detail: "Service with stylist", draft: true },
  { quote: "Guest review pulled verbatim from Google.", name: "Guest first name", detail: "Service with stylist", draft: true },
];

export const visible = <T extends { draft?: boolean }>(items: T[], dev: boolean) => items.filter((i) => dev || !i.draft);
