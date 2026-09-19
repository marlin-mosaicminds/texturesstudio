import { TeamGrid } from "@/components/TeamGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hair Stylists in Memphis, TN",
  description: "Meet the licensed stylists and esthetician at Textures Salon & Spa in Cordova, Memphis. Choose by specialty, then book by name.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <div className="page-intro dark">
        <Breadcrumbs tone="dark" items={[{ name: "Home", path: "/" }, { name: "Our team", path: "/team" }]} />
        <p className="eyebrow eyebrow--mustard">The team</p>
        <h1 className="h-xl">Hair stylists and esthetician in Memphis</h1>
        <p className="lede">Every stylist and esthetician at Textures is trained and held to the same standard. Choose by specialty, then book the person.</p>
      </div>
      <section className="section stack" aria-label="Team members" style={{ paddingTop: 24 }}>
        <TeamGrid />
      </section>
      <section id="careers" className="section bg-stone stack" aria-labelledby="careers-h">
        <h2 id="careers-h" className="h-md">Join the team</h2>
        <p className="lede">We hire licensed stylists and estheticians who work to a standard. Email the salon with your portfolio to apply.</p>
        <div><a href="mailto:GetTextured@TexturesStudioSalon.com?subject=Careers" className="btn btn--outline">Email your portfolio</a></div>
      </section>
    </>
  );
}
