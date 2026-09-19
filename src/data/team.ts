// TODO: confirm every specialty and add real bios and portraits (/images/team/[slug].jpg).
export type Member = {
  slug: string;
  name: string;
  role: "Stylist" | "Esthetician";
  specialty: string;
  specialties: string[]; // used by the Team filter
  bio: string;
  image?: string;
};

export const team: Member[] = [
  { slug: "alexandria", name: "Alexandria", role: "Stylist", specialty: "Color", specialties: ["Color"], bio: "Alexandria specializes in color, from single-process to dimensional highlights." },
  { slug: "april", name: "April", role: "Stylist", specialty: "Color", specialties: ["Color"], bio: "April specializes in color services." },
  { slug: "miniya", name: "Miniya", role: "Stylist", specialty: "Color", specialties: ["Color"], bio: "Miniya specializes in color services." },
  { slug: "annie", name: "Annie", role: "Stylist", specialty: "Silk press and thermal styling", specialties: ["Silk press"], bio: "Annie specializes in silk press and thermal styling with Aveda heat protection." },
  { slug: "kayla", name: "Kayla", role: "Esthetician", specialty: "Skin services", specialties: ["Skin"], bio: "Kayla is the salon’s esthetician, offering facials, peels, and brow shaping." },
];

export const teamFilters = ["All", "Color", "Silk press", "Natural hair", "Locs", "Braids", "Skin"];

export function getMember(slug: string) {
  return team.find((m) => m.slug === slug);
}
