import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
export const metadata = pageMeta({ title: "Privacy", description: `Privacy policy for ${site.name}.`, path: "/privacy" });
export default function Privacy() {
  return (
    <section className="section">
      <div className="prose">
        <h1 className="h-xl">Privacy</h1>
        {/* TODO: replace with the salon's privacy policy, reviewed by the owner. */}
        <p>This site does not collect personal information directly. Online booking is handled by Zenoti, and their privacy policy applies to information you enter when you book.</p>
        <p>Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
