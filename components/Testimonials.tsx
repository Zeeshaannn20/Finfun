"use client";

import { useRef } from "react";
import { testimonials, type Testimonial } from "@/lib/content";
import Img from "./Img";

export default function Testimonials({ groups }: { groups?: Testimonial["group"][] }) {
  const list = groups ? testimonials.filter((t) => groups.includes(t.group)) : testimonials;
  const ref = useRef<HTMLDivElement>(null);
  const move = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <div className="slider">
      <div className="slides" ref={ref} tabIndex={0} role="region" aria-label="Testimonials, scroll sideways for more">
        {list.map((t) => (
          <figure className="card quote" key={t.name + t.role}>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <Img src={t.avatar} alt="" sizes="58px" loading="lazy" />
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {list.length > 1 && (
        <div className="slider-ctrl">
          <button className="round-btn" onClick={() => move(-1)} aria-label="Previous testimonial">←</button>
          <button className="round-btn" onClick={() => move(1)} aria-label="Next testimonial">→</button>
        </div>
      )}
    </div>
  );
}
