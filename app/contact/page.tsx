import type { Metadata } from "next";
import { ParentQueryForm, PartnershipForm } from "@/components/Forms";
import { PageHero } from "@/components/Sections";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Talk to FinFun: school partnerships, CSR programs and parent questions. Email partnerships@finfun.club or call +91 97398 85822.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let’s <span className="mark">talk money</span></>} art="/a/sticker/10-hi-im-rupi.webp" tone="bg-sky"
        lead={<>Email <a href={`mailto:${site.email}`}>{site.email}</a>, call <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>, or use the WhatsApp button any time.</>}
      />
      <section className="section">
        <div className="wrap grid g2" style={{ alignItems: "start" }}>
          <div className="card">
            <span className="eyebrow">Schools & partners</span>
            <h2>School partnership</h2>
            <p className="muted">For principals, trustees, CSR teams and education departments.</p>
            <PartnershipForm />
          </div>
          <div className="card">
            <span className="eyebrow">Parents</span>
            <h2>Parent question</h2>
            <p className="muted">Ask about programs, timings, safety or payments.</p>
            <ParentQueryForm />
          </div>
        </div>
      </section>
    </>
  );
}
