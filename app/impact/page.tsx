import type { Metadata } from "next";
import { ReportForm } from "@/components/Forms";
import Img from "@/components/Img";
import { Classroom, ImpactBand, JoinBanner, PageHero, SectionHead } from "@/components/Sections";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Our impact",
  description: "35,000+ schools, 20,00,000+ students and 350+ teachers trained. See FinFun’s impact and download the report.",
  alternates: { canonical: "/impact" },
};

// TODO(FinFun): states/districts list, media coverage links and real photos.
const reach = [
  { state: "Telangana", note: "35,000 government schools, grades 6–10" },
  { state: "Karnataka", note: "Bengaluru, Sringeri and more" },
  { state: "Tamil Nadu", note: "Madurai Corporation schools" },
];

export default function Impact() {
  return (
    <>
      <PageHero eyebrow="Impact" title={<>Real skills. <span className="mark">Real savings.</span></>} lead="Children in FinFun schools have started saving ₹2,000–6,000 on their own — and thinking about every purchase through the lens of needs and wants." art="/a/sticker/c02-save-first-vibe-later.webp" />
      <ImpactBand title="By the numbers" />
      <section className="section" aria-labelledby="reach-h">
        <div className="wrap">
          <SectionHead eyebrow="Where we are" title={<span id="reach-h">States and districts reached</span>} />
          <div className="grid g3">
            {reach.map((r) => (
              <div className="card" key={r.state}>
                <h3 className="blue">{r.state}</h3>
                <p className="muted" style={{ margin: 0 }}>{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section tight bg-white">
        <div className="wrap">
          <Img className="banner-img" src="/a/impact/impact-numbers-banner-1800x620.webp" alt="FinFun impact: 35,000+ schools, 20,00,000+ students, 500+ hours of training, 350+ teachers trained" sizes="(max-width: 1200px) 95vw, 1120px" loading="lazy" />
        </div>
      </section>
      <Classroom />
      <section className="section bg-yellow" aria-labelledby="dl-h">
        <div className="wrap split">
          <Img className="banner-img" src="/a/impact/impact-report-cover-A4.webp" alt="Cover of the FinFun impact report" sizes="(max-width: 860px) 80vw, 420px" loading="lazy" style={{ maxWidth: 380, justifySelf: "center" }} />
          <div className="card">
            <h2 id="dl-h">Download the impact report</h2>
            <p className="muted">For CSR teams, education departments and school leaders.</p>
            <ReportForm />
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="media-h">
        <div className="wrap">
          <SectionHead eyebrow="In the media & from partners" title={<span id="media-h">What people are saying</span>} />
          <Testimonials groups={["official", "school"]} />
        </div>
      </section>
      <JoinBanner audience="schools" title="Fund or bring FinFun to more schools" text="Talk to our partnerships team about CSR and government programs." />
    </>
  );
}
