// Single source of truth for name, address, phone (NAP), hours, and offers.
// Keep this identical to the Google Business Profile.

export const site = {
  name: "Textures Salon & Spa",
  shortName: "Textures",
  tagline: "Hair. Skin. Culture.",
  description:
    "Aveda concept salon in Cordova, Memphis. Seventy-eight hair and skin services, held to one standard since 2015.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.texturessalonandspa.com").replace(/\/$/, ""),
  phone: "(901) 512-4792",
  phoneHref: "tel:+19015124792",
  email: "GetTextured@TexturesStudioSalon.com",
  address: {
    street: "8100 Macon Station, Suite 105",
    city: "Cordova",
    region: "TN",
    regionName: "Tennessee",
    // TODO: add the ZIP code exactly as it appears on Google Business Profile.
    postalCode: "",
    country: "US",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Textures+Salon+%26+Spa+8100+Macon+Station+Cordova+TN",
  mapsEmbed: "https://maps.google.com/maps?q=8100%20Macon%20Station%2C%20Cordova%2C%20TN&z=15&output=embed",
  founded: 2015,
  serviceCount: 78,
  hours: [
    { day: "Monday", open: "06:30", close: "18:30" },
    { day: "Tuesday", open: "06:30", close: "18:30" },
    { day: "Wednesday", open: "06:30", close: "18:30" },
    { day: "Thursday", open: "06:30", close: "18:30" },
    { day: "Friday", open: "06:30", close: "18:30" },
    { day: "Saturday", open: "06:30", close: "18:30" },
    { day: "Sunday", open: null, close: null },
  ] as { day: string; open: string | null; close: string | null }[],
  hoursSummary: "Monday – Saturday, 6:30 AM – 6:30 PM",
  offers: {
    newGuest: "New guests receive 15% off services.",
    referral: "Refer a friend and you both receive 15%.",
  },
  policies: [
    { title: "Changes and cancellations", body: "Please give 24 hours’ notice to cancel or reschedule." },
    { title: "New guests", body: "15% off services on your first visit." },
    { title: "Referrals", body: "Refer a friend and you both receive 15% off services." },
  ],
  // TODO: add real profile URLs. Empty entries are not rendered.
  social: { instagram: "", facebook: "" },
};

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export const isDev = process.env.NODE_ENV !== "production";
