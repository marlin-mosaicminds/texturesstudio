import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { categories } from "@/data/services";
import { team } from "@/data/team";
import { cities } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/services", "/team", "/visit", "/book", "/reviews", "/areas",
    ...categories.map((c) => `/services/${c.slug}`),
    ...team.map((m) => `/team/${m.slug}`),
    ...cities.map((c) => `/${c.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
