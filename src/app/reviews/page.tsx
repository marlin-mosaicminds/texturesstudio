import { reviews, visible } from "@/data/content";
import { isDev } from "@/data/site";
import { ReviewCard } from "@/components/Reviews";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Reviews",
  description: "Guest reviews of Textures Salon & Spa, an Aveda concept salon in Cordova, Memphis.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const shown = visible(reviews, isDev);
  return (
    <section className="section stack">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} />
      <h1 className="h-xl">Guest reviews</h1>
      {shown.length > 0 ? (
        <div className="reviews">{shown.map((r, i) => <ReviewCard key={i} r={r} />)}</div>
      ) : (
        <p className="lede">Reviews are on the way. Read what guests say on our Google profile.</p>
      )}
    </section>
  );
}
