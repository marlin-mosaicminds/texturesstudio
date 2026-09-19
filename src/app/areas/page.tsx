import Link from "next/link";
import { cities } from "@/data/cities";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Areas We Serve Near Memphis, TN",
  description: "Textures Salon & Spa in Cordova serves guests from Memphis, Germantown, Collierville, Bartlett, Lakeland, and Arlington.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <section className="section stack">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Areas we serve", path: "/areas" }]} />
      <h1 className="h-xl">Areas we serve</h1>
      <p className="lede">Textures is in Cordova, Memphis, and welcomes guests from across Shelby County.</p>
      <nav aria-label="Cities" className="city-links">
        {cities.map((c) => <Link key={c.slug} href={`/${c.slug}`}>Hair salon near {c.name}, TN</Link>)}
      </nav>
    </section>
  );
}
