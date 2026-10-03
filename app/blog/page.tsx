import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { PageHero } from "@/components/Sections";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog: money tips for teens, parents and teachers",
  description: "Practical money guides for teens, parents and teachers — budgeting, UPI safety, saving and investing basics.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title={<>Money tips that <span className="mark">actually help</span></>} lead="Short, practical guides for teens, parents and teachers." art="/a/sticker/05-hi-im-finbot.webp" tone="bg-sky" />
      <section className="section">
        <div className="wrap">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
