"use client";
import Link from "next/link";
import { useState } from "react";
import { team, teamFilters } from "@/data/team";
import { bookingUrl } from "@/lib/booking";
import { Photo } from "./Photo";

export function TeamGrid() {
  const [filter, setFilter] = useState("All");
  const members = filter === "All" ? team : team.filter((m) => m.specialties.includes(filter));
  return (
    <>
      <div className="chips" role="group" aria-label="Filter by specialty">
        {teamFilters.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {members.length === 0 ? (
        <p className="services__empty">No one is listed for {filter.toLowerCase()} yet. Call the salon and we’ll match you with the right stylist.</p>
      ) : (
        <ul className="team-grid">
          {members.map((m) => (
            <li key={m.slug} className="member">
              <Photo src={m.image} alt={`${m.name}, ${m.role.toLowerCase()}`} caption={`Portrait of ${m.name}`} tone="light" className="member__photo" sizes="(min-width: 1024px) 400px, 112px" />
              <div className="member__body">
                <h2 className="member__name">{m.name}</h2>
                <p className="member__role">{m.role}</p>
                <p className="member__spec">{m.specialty}</p>
                <div className="member__actions">
                  <a href={bookingUrl} className="btn btn--forest btn--sm">Book with {m.name}</a>
                  <Link href={`/team/${m.slug}`} className="text-link">View profile</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
