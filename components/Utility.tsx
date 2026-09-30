import Link from "next/link";
import type { ReactNode } from "react";
import Img from "./Img";

export default function Utility({ img, title, children, actions }: { img: string; title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="utility doodle">
      <div className="wrap">
        <Img src={img} alt="" priority sizes="260px" />
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{title}</h1>
        <div className="muted" style={{ fontSize: "1.15rem", maxWidth: 560, margin: "0 auto 28px" }}>{children}</div>
        <div className="btn-row">
          {actions ?? (
            <Link className="btn btn-lg" href="/">
              Back to home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
