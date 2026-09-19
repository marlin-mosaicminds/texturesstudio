"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/services";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// Native swipe with scroll-snap. The arrows move one card at a time.
export function ServiceCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const count = categories.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector("li");
      const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0") : 1;
      setIndex(Math.round(el.scrollLeft / step));
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="carousel" aria-roledescription="carousel" aria-label="Service categories">
      <ul className="carousel__track" ref={track}>
        {categories.map((c) => (
          <li key={c.slug} className="carousel__card">
            <Link href={`/services/${c.slug}`} className="svc-card">
              <Photo src={c.image} alt={c.name} caption={c.photo} className="svc-card__photo" sizes="(min-width: 1024px) 380px, 62vw" />
              <span className="svc-card__body">
                <span className="svc-card__text">
                  <span className="svc-card__name">{c.name}</span>
                  <span className="svc-card__short">{c.short}</span>
                </span>
                <Icon name="arrow" className="svc-card__arrow" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="carousel__controls">
        <div className="carousel__arrows">
          <button type="button" className="round-btn" onClick={() => move(-1)} disabled={index === 0} aria-label="Previous services">
            <Icon name="arrowLeft" strokeWidth={1.75} />
          </button>
          <button type="button" className="round-btn" onClick={() => move(1)} disabled={atEnd} aria-label="Next services">
            <Icon name="arrow" strokeWidth={1.75} />
          </button>
        </div>
        <p className="carousel__count" aria-live="polite">
          <strong>{String(Math.min(index + 1, count)).padStart(2, "0")}</strong> / {String(count).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
