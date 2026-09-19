import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section stack">
      <h1 className="h-xl">This page isn’t here</h1>
      <p className="lede">The link may be old. Browse services or book a visit instead.</p>
      <div className="btn-row">
        <Link href="/services" className="btn btn--forest">View services</Link>
        <Link href="/book" className="btn btn--outline">Book a visit</Link>
      </div>
    </section>
  );
}
