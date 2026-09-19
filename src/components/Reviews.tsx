import type { Review } from "@/data/content";
import { Icon } from "./Icon";

export function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="review">
      <div className="review__stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={18} strokeWidth={1.75} />)}
      </div>
      <blockquote>“{r.quote}”</blockquote>
      <figcaption>{r.name} · {r.city ?? r.detail}</figcaption>
      {r.draft && <span className="draft-flag">Draft · hidden on live site</span>}
    </figure>
  );
}
