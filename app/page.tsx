import Link from "next/link";
import Img from "@/components/Img";
import { Classroom, Comparison, CtaStrip, ImpactBand, JoinBanner, JsonLd, Partners, ProgramCard, SectionHead, Spotlight, WaysToJoin } from "@/components/Sections";
import PostCard from "@/components/PostCard";
import Testimonials from "@/components/Testimonials";
import { howItWorks, methods, programs, site, values } from "@/lib/content";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "FinFun",
          url: site.url,
          email: site.email,
          telephone: site.phone,
          slogan: site.tagline,
        }}
      />
      <section className="hero doodle">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">{site.grades} · Ages 11–16</span>
            <h1>
              Money skills for <span className="mark">real life</span>
            </h1>
            <p className="lead">Budgeting, UPI and scam safety, SIPs and investing — learned through games, quizzes and challenges teens actually enjoy.</p>
            <div className="btn-row">
              <Link className="btn btn-blue btn-lg" href="/schools" data-track="path_schools">
                For Schools
              </Link>
              <Link className="btn btn-lg" href="/parents" data-track="path_parents">
                For Parents
              </Link>
            </div>
            <p className="hero-note">Trusted by 35,000+ schools across India</p>
          </div>
          <div className="collage" aria-hidden="true">
            <div className="collage-blob" />
            <Img className="st sticker float" src="/a/sticker/c01-pay-smart-not-fast.webp" alt="" priority sizes="(max-width: 860px) 40vw, 240px" />
            <Img className="st sticker float d2" src="/a/sticker/t02-scam-not-today.webp" alt="" priority sizes="(max-width: 860px) 40vw, 240px" />
            <Img className="st sticker float d2" src="/a/sticker/c07-investor-in-training.webp" alt="" sizes="(max-width: 860px) 40vw, 240px" />
            <Img className="st sticker float" src="/a/sticker/t04-start-a-sip-early.webp" alt="" sizes="(max-width: 860px) 40vw, 240px" />
            <Img className="mascot float" src="/a/mascot-poses/mascot-coin.webp" alt="" sizes="130px" />
          </div>
        </div>
      </section>

      <ImpactBand />
      <Spotlight />

      <section className="section" aria-labelledby="why-h">
        <div className="wrap">
          <SectionHead eyebrow="Why FinFun" title={<span id="why-h">Skills school doesn’t teach, but life does</span>} />
          <div className="grid g3">
            {values.map((v) => (
              <div className="card icon-card" key={v.title}>
                <Img src={v.icon} alt="" sizes="120px" loading="lazy" />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Comparison />

      <section className="section" aria-labelledby="how-h">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={<span id="how-h">Learn → Play → Grow</span>} />
          <div className="steps">
            {howItWorks.map((s, i) => (
              <div className="card step" key={s.title}>
                <span className="step-num">{i + 1}</span>
                <Img src={s.img} alt="" sizes="130px" loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="methods-h">
        <div className="wrap">
          <SectionHead eyebrow="Gamified learning" title={<span id="methods-h">Four ways teens learn with FinFun</span>} />
          <div className="grid g4">
            {methods.map((m) => (
              <div className="card method" key={m.title}>
                <Img src={m.img} alt="" sizes="(max-width: 800px) 90vw, 280px" loading="lazy" />
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <CtaStrip />
        </div>
      </section>

      <section className="section bg-sky" aria-labelledby="programs-h">
        <div className="wrap">
          <SectionHead eyebrow="Programs" title={<span id="programs-h">Pick the right program for your teen</span>}>
            Two programs, built for how teens think at each stage.
          </SectionHead>
          <div className="grid g2">
            {programs.map((p) => (
              <ProgramCard key={p.slug} p={p} />
            ))}
          </div>
          <p className="center mt">
            <Link className="link-arrow" href="/programs">
              Compare programs →
            </Link>
          </p>
        </div>
      </section>

      <Partners />

      <section className="section" aria-labelledby="t-h">
        <div className="wrap">
          <SectionHead eyebrow="Testimonials" title={<span id="t-h">What schools, officials and parents say</span>} />
          <Testimonials />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="blog-h">
        <div className="wrap">
          <SectionHead eyebrow="From the blog" title={<span id="blog-h">Money tips teens actually read</span>} />
          <div className="grid g3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
          <p className="center mt">
            <Link className="link-arrow" href="/blog">All articles →</Link>
          </p>
        </div>
      </section>

      <Classroom />
      <WaysToJoin />
      <JoinBanner />
    </>
  );
}
