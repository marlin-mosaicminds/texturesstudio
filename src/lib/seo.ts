import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, type: "website", locale: "en_US" },
  };
}
