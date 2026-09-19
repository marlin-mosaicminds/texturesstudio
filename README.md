# Textures Salon & Spa — website

Custom React site built with Next.js. Mobile-first and app-like on phones (bottom tab bar, bottom-sheet service details), full layout on desktop. Every page is pre-rendered as static HTML so Google can read all services, prices, FAQs, and city pages.

Booking is not connected to the Zenoti API yet. Every Book button opens Zenoti Webstore V2 (deep-linked to the service when a Zenoti service ID is set).

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

Deploy on Vercel (recommended): import the repo, add the three variables from `.env.example`, deploy, then point the domain at Vercel.

## Where to edit content

| What | File |
|---|---|
| Name, address, phone, hours, offers, policies | `src/data/site.ts` |
| Services, prices, durations, Zenoti service IDs, category SEO copy | `src/data/services.ts` |
| Team, specialties, bios, portraits | `src/data/team.ts` |
| City pages (drive time, route, unique intro) | `src/data/cities.ts` |
| FAQs and reviews | `src/data/content.ts` |
| Colors, type, layout | `src/app/globals.css` |
| Photos | `public/images/...`, then set `image` in the data file |

Items marked `draft: true` in `content.ts` appear only in `npm run dev`, with a red "Draft" tag. They never render on the live site and never enter schema.

## Before launch

- [ ] Add `NEXT_PUBLIC_ZENOTI_CENTER_ID` (Zenoti → center-level settings page URL).
- [ ] Fill every `priceFrom`, `durationMin`, and `zenotiServiceId` in `services.ts`, and add the rest of the 78 services.
- [ ] Add the ZIP code in `site.ts`, matching Google Business Profile exactly.
- [ ] Put `Braliyon-Regular.woff2` in `public/fonts/` (check the license covers web use). Until then headlines use Bodoni Moda.
- [ ] Add photos: hero, service categories, team portraits, Aveda image, one unique photo per city.
- [ ] Write a unique intro, route, and drive time for each city in `cities.ts`.
- [ ] Confirm and un-draft the walk-in and natural-hair FAQs, or delete them.
- [ ] Paste real Google reviews into `content.ts` (tag with `city` for city pages).
- [ ] Confirm stylist specialties and bios in `team.ts`.
- [ ] Add `public/brand/apple-touch-icon.png` (180×180) and list it in `src/app/layout.tsx`.
- [ ] Add Instagram and Facebook URLs in `site.ts`.
- [ ] Brand Webstore V2 (Forest, Chalk, Noir) and give it a custom header linking back to the site.
- [ ] Submit `/sitemap.xml` in Google Search Console.

## SEO built in

- One H1 per page carrying the keyword. H1–H3 display in caps through CSS; the source text stays normal case.
- Title tags and meta descriptions per page (`metadata` in each `page.tsx`).
- Schema: HairSalon + DaySpa site-wide with hours, areas served, and services; FAQPage where FAQs appear; BreadcrumbList on inner pages.
- `sitemap.xml` and `robots.txt` generated automatically.
- Footer "Areas we serve" links every city page from every page.

## Later: Zenoti API

`services.ts` and `team.ts` are shaped so they can later be filled from the Zenoti API at build time instead of by hand, without changing any page.
