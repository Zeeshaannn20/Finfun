"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Tracks clicks on any element with data-track="event_name". */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (el) track(el.dataset.track!, { label: el.textContent?.trim().slice(0, 60) ?? "", page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
