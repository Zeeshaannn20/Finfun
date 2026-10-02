"use client";

import { useState } from "react";
import type { Category, Post } from "@/lib/posts";
import PostCard from "./PostCard";

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
          <PostCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
