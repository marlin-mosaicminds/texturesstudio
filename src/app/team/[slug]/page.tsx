import Link from "next/link";
import { notFound } from "next/navigation";
import { team, getMember } from "@/data/team";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { pageMeta } from "@/lib/seo";
import { bookingUrl } from "@/lib/booking";

export const dynamicParams = false;
export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMember((await params).slug);
  if (!m) return {};
  const role = m.role === "Stylist" ? "Hair Stylist" : "Esthetician";
  return pageMeta({ title: `${m.name}, ${role} in Memphis, TN`, description: `${m.bio} Book with ${m.name} at Textures Salon & Spa in Cordova, Memphis.`, path: `/team/${m.slug}` });
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMember((await params).slug);
  if (!m) notFound();
  return (
    <>
      <section className="split">
        <Photo src={m.image} alt={`${m.name}, ${m.role.toLowerCase()}`} caption={`Portrait of ${m.name}`} tone="light" priority />
        <div className="split__text" style={{ order: -1 }}>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Our team", path: "/team" }, { name: m.name, path: `/team/${m.slug}` }]} />
          <h1 className="h-xl">{m.name}</h1>
          <p style={{ fontWeight: 600 }}>{m.role} · {m.specialty}</p>
          <p className="lede">{m.bio}</p>
          <div className="btn-row">
            <a href={bookingUrl} className="btn btn--forest">Book with {m.name}</a>
            <Link href="/team" className="btn btn--outline">Meet the team</Link>
          </div>
        </div>
      </section>
      {/* TODO: add a portfolio gallery and reviews that mention this stylist by name. */}
    </>
  );
}
