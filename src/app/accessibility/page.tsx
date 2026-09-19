import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
export const metadata = pageMeta({ title: "Accessibility", description: `Accessibility statement for ${site.name}.`, path: "/accessibility" });
export default function Accessibility() {
  return (
    <section className="section">
      <div className="prose">
        <h1 className="h-xl">Accessibility</h1>
        <p>We design this site to meet WCAG 2.1 AA: readable contrast, full keyboard use, and clear labels for screen readers.</p>
        <p>If anything on the site is hard to use, call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a> and we will help you book directly.</p>
      </div>
    </section>
  );
}
