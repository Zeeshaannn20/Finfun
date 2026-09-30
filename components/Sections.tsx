import Link from "next/link";
import type { ReactNode } from "react";
import { classroom, impact, partners, type Program } from "@/lib/content";
import Img from "./Img";

export function SectionHead({ eyebrow, title, children, left }: { eyebrow?: string; title: ReactNode; children?: ReactNode; left?: boolean }) {
  return (
    <div className={`section-head${left ? " left" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, art, artAlt = "", children, tone = "bg-yellow" }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; art?: string; artAlt?: string; children?: ReactNode; tone?: string }) {
  return (
    <section className={`page-hero doodle ${tone}`}>
      <div className="wrap page-hero-grid">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {art && <Img className="page-hero-art sticker float" src={art} alt={artAlt} priority sizes="360px" />}
      </div>
    </section>
  );
}

export function ImpactBand({ title = "Our impact so far" }: { title?: string }) {
  return (
    <section className="impact section tight" aria-labelledby="impact-h">
      <div className="wrap">
        <h2 id="impact-h">{title}</h2>
        <div className="grid g4">
          {impact.map((s) => (
            <div className="stat" key={s.label}>
              <Img src={s.icon} alt="" sizes="76px" />
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section className="section tight bg-white" aria-labelledby="partners-h">
      <div className="wrap">
        <SectionHead title={<span id="partners-h">Trusted by governments, CSR leaders and schools</span>} />
        <ul className="partners" role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {partners.map((p) => (
            <li className="partner" key={p.name}>
              <span className="logo-coin" aria-hidden="true">★</span>
              <span>
                {p.name}
                <small>{p.note}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Classroom() {
  return (
    <section className="section" aria-labelledby="class-h">
      <div className="wrap">
        <SectionHead eyebrow="Inside the classroom" title={<span id="class-h">This is what learning money looks like</span>} />
        <div className="polaroids">
          {classroom.map((c) => (
            <figure className="polaroid" key={c.caption}>
              <div className="ph" style={{ background: c.bg }}>
                <Img src={c.sticker} alt="" sizes="220px" loading="lazy" />
              </div>
              <figcaption>{c.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JoinBanner({ title = "Ready to become money smart?", text = "Bring FinFun to your school, or enrol your teen today.", audience = "both" }: { title?: string; text?: string; audience?: "both" | "parents" | "schools" }) {
  return (
    <section className="section tight">
      <div className="wrap">
        <div className="join">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="btn-row">
              {audience !== "parents" && (
                <Link className="btn btn-lg" href={audience === "schools" ? "/schools#partner" : "/schools"} data-track="partner_click">
                  {audience === "schools" ? "Partner with us" : "For Schools"}
                </Link>
              )}
              {audience !== "schools" && (
                <Link className="btn btn-white btn-lg" href={audience === "parents" ? "/enrol" : "/parents"} data-track="enrol_click">
                  {audience === "parents" ? "Enrol now" : "For Parents"}
                </Link>
              )}
            </div>
          </div>
          <Img src="/a/mascot-poses/mascot-celebrate.webp" alt="" sizes="210px" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function ProgramCard({ p, detail = true }: { p: Program; detail?: boolean }) {
  return (
    <article className="card program">
      <div className={`program-top ${p.slug}`}>
        <div>
          <span className="chip">{p.grades}</span>
          <h3 style={{ margin: "12px 0 16px", fontSize: "2rem" }}>{p.name}</h3>
        </div>
        <Img src={p.sticker} alt="" sizes="220px" loading="lazy" />
      </div>
      <div className="program-body">
        <p style={{ margin: 0 }}>{p.focus}</p>
        <ul className="ticks">
          {p.format.slice(0, 3).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="price">
          {inr(p.price)} <small>per student</small>
        </div>
        <div className="btn-row">
          <Link className="btn btn-blue" href={`/enrol?program=${p.slug}`} data-track="enrol_click">
            Enrol in {p.name.replace("FinFun ", "")}
          </Link>
          {detail && (
            <Link className="btn btn-white" href={`/programs/${p.slug}`}>
              See what’s inside
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div>{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
