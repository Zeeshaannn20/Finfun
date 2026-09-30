type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

const PIXEL_EVENTS: Record<string, string> = { enrol_click: "InitiateCheckout", form_submit: "Lead", payment_start: "AddPaymentInfo" };

/** Send an event to GA4 and Meta Pixel (no-ops when they aren't loaded). */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, params);
  const px = PIXEL_EVENTS[event];
  if (px) w.fbq?.("track", px, params);
  else w.fbq?.("trackCustom", event, params);
}
