import type { Faq as FaqItem } from "@/data/content";
import { Icon } from "./Icon";

// Native <details>: works without JavaScript and every answer is in the HTML for search engines.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} className="faq__item" open={i === 0}>
          <summary className="faq__q">
            <h3>{f.q}</h3>
            <Icon name="plus" className="faq__icon" strokeWidth={1.75} />
          </summary>
          <div className="faq__a">
            {f.draft && <span className="draft-flag">Draft · hidden on live site</span>}
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
