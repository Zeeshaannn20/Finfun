"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category, Post } from "@/lib/posts";
import Img from "./Img";

const CATS: ("All" | Category)[] = ["All", "Parents", "Teachers", "Money basics"];

export default function BlogList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        {CATS.map((c) => (
          <button key={c} className="filter" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid g3" aria-live="polite">
        {list.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card post-card">
            <Img src={p.cover} alt="" sizes="(max-width: 800px) 90vw, 380px" loading="lazy" />
            <div>
              <span className="chip white">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
