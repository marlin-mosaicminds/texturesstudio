"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Category, Service } from "@/data/services";
import { priceLabel, durationLabel } from "@/data/services";
import { team } from "@/data/team";
import { bookServiceUrl } from "@/lib/booking";
import { Icon } from "./Icon";

type Row = Service & { categoryName: string };

export function ServicesBrowser({ categories, showSearch = true, headingLevel = 2 }: { categories: Category[]; showSearch?: boolean; headingLevel?: 2 | 3 }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Row | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((c) => ({ ...c, services: q ? c.services.filter((s) => `${s.name} ${s.description} ${c.name}`.toLowerCase().includes(q)) : c.services }))
      .filter((c) => c.services.length > 0);
  }, [categories, query]);

  const show = (s: Service, c: Category) => {
    setOpen({ ...s, categoryName: c.name });
    requestAnimationFrame(() => dialog.current?.showModal());
  };
  const close = () => dialog.current?.close();
  const H = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="services">
      {showSearch && (
        <div className="services__tools">
          <label className="search">
            <Icon name="search" size={20} />
            <span className="visually-hidden">Search services</span>
            <input type="search" placeholder="Search services" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <nav aria-label="Service categories" className="chips">
            {categories.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="chip">{c.name}</a>
            ))}
          </nav>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="services__empty">No services match “{query}”. Try a shorter word, or call{" "}
          <a href="tel:+19015124792">(901) 512-4792</a> and we’ll help you choose.</p>
      )}

      {filtered.map((c) => (
        <section key={c.slug} id={c.slug} className="svc-group" aria-labelledby={`${c.slug}-h`}>
          <div className="svc-group__head">
            <H id={`${c.slug}-h`}>{c.name}</H>
            <Link href={`/services/${c.slug}`} className="text-link">About {c.name.toLowerCase()}</Link>
          </div>
          <ul className="svc-list">
            {c.services.map((s) => {
              const d = durationLabel(s);
              return (
                <li key={s.id} className="svc-row">
                  <button type="button" className="svc-row__info" onClick={() => show(s, c)} aria-haspopup="dialog">
                    <span className="svc-row__name">{s.name}</span>
                    <span className="svc-row__desc">{s.description}</span>
                    <span className="svc-row__meta">
                      {d && (<><Icon name="clock" size={16} /> <span>{d}</span><span aria-hidden="true">·</span></>)}
                      <span>{priceLabel(s)}</span>
                    </span>
                  </button>
                  <a href={bookServiceUrl(s.zenotiServiceId)} className="btn btn--forest btn--sm" aria-label={`Book ${s.name}`}>Book</a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <dialog ref={dialog} className="sheet" aria-labelledby="sheet-title" onClick={(e) => { if (e.target === dialog.current) close(); }} onClose={() => setOpen(null)}>
        {open && (
          <div className="sheet__inner">
            <span className="sheet__grabber" aria-hidden="true" />
            <div className="sheet__top">
              <p className="eyebrow">{open.categoryName}</p>
              <button type="button" className="icon-btn" onClick={close} aria-label="Close"><Icon name="close" strokeWidth={1.75} /></button>
            </div>
            <h2 id="sheet-title" className="sheet__title">{open.name}</h2>
            <div className="sheet__facts">
              <div><span className="eyebrow">Time</span><strong>{durationLabel(open) ?? "Confirmed at booking"}</strong></div>
              <div><span className="eyebrow">Price</span><strong>{priceLabel(open)}</strong></div>
            </div>
            <p className="sheet__desc">{open.description}</p>
            {open.included && (
              <div className="sheet__included">
                <p className="sheet__subhead">Included</p>
                <ul>{open.included.map((i) => <li key={i}><Icon name="leaf" size={18} />{i}</li>)}</ul>
              </div>
            )}
            {open.providers && open.providers.length > 0 && (
              <p className="sheet__providers"><Icon name="user" size={20} />
                Offered by {open.providers.map((p) => team.find((m) => m.slug === p)?.name).filter(Boolean).join(", ")}.
              </p>
            )}
            <div className="sheet__cta">
              <a href={bookServiceUrl(open.zenotiServiceId)} className="btn btn--forest btn--block">Book this service</a>
              <p className="sheet__note">You choose your stylist, date, and time next. Changes require 24 hours’ notice.</p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
