import Link from "next/link";
import { fmtDate, type Post } from "@/lib/posts";
import Img from "./Img";

/** Blog card with a sketchy double-line frame around the cover, sketchnote style. */
export default function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`} className="post-card">
      <div className="sk-frame">
        <Img src={p.cover} alt="" sizes="(max-width: 800px) 90vw, 380px" loading="lazy" />
        <span className="post-tag">{p.category}</span>
      </div>
      <div className="post-body">
        <p className="post-meta">
          By <span>FinFun</span> / {fmtDate(p.date)}
        </p>
        <h3>{p.title}</h3>
        <span className="read-more">Read more →</span>
      </div>
    </Link>
  );
}
