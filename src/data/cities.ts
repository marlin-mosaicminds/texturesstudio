// City pages at /hair-salon-[city]-tn.
// IMPORTANT: each city needs its own copy, route, photo, and reviews. Pages that only swap the
// city name can be ignored by Google. Fill every TODO before launch.

export type City = {
  slug: string;
  name: string;
  driveMinutes: number | null; // TODO: real drive time from the city center
  route: string; // TODO: plain-language directions from this city
  intro: string; // TODO: rewrite uniquely for each city
  popular: string[]; // category slugs
  image?: string;
};

const defaultPopular = ["silk-press", "natural-hair-locs", "hair-color", "facials"];

function city(name: string, overrides: Partial<City> = {}): City {
  const slug = `hair-salon-${name.toLowerCase()}-tn`;
  return {
    slug,
    name,
    driveMinutes: null,
    route: `Directions from ${name} coming soon. Textures is in Macon Station, Suite 105, with parking on site.`,
    intro: `Textures Salon & Spa is an Aveda concept salon in Cordova, a short drive from ${name}. Our team offers 78 hair and skin services, from silk press and color to locs, braids, and facials.`,
    popular: defaultPopular,
    ...overrides,
  };
}

export const cities: City[] = [
  city("Cordova", {
    intro: "Textures Salon & Spa is an Aveda concept salon in the heart of Cordova, in Macon Station. Our team offers 78 hair and skin services, from silk press and color to locs, braids, and facials.",
    route: "Textures is in Macon Station, Suite 105, with parking on site.",
  }),
  city("Germantown"),
  city("Collierville"),
  city("Bartlett"),
  city("Lakeland"),
  city("Arlington"),
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
