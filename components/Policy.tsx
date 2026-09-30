import type { ReactNode } from "react";
import { PageHero } from "./Sections";

export default function Policy({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} lead={`Last updated ${updated}`} tone="bg-white" />
      <section className="section">
        <div className="wrap prose">{children}</div>
      </section>
    </>
  );
}
