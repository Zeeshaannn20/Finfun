import { validateLead } from "@/lib/leads";

/**
 * Receives every site form. Forwards the lead as JSON to LEAD_WEBHOOK_URL
 * (Google Sheets Apps Script, Zoho or HubSpot webhook, Zapier…), which also
 * handles the email alert to partnerships@finfun.club.
 */
export async function POST(req: Request) {
  let body: { type?: string; data?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { type = "", data = {} } = body;
  if (data.website) return Response.json({ ok: true }); // honeypot: silently drop bots
  const error = validateLead(type, data);
  if (error) return Response.json({ error }, { status: 422 });

  const lead = { type, ...data, submittedAt: new Date().toISOString(), page: req.headers.get("referer") ?? "" };
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.info("[lead] LEAD_WEBHOOK_URL not set — lead not forwarded:", type);
    return Response.json({ ok: true, reportUrl: type === "report" ? process.env.IMPACT_REPORT_URL ?? null : undefined });
  }
  const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }).catch(() => null);
  if (!res?.ok) return Response.json({ error: "We couldn’t send that just now. Please try again or WhatsApp us." }, { status: 502 });
  return Response.json({ ok: true, reportUrl: type === "report" ? process.env.IMPACT_REPORT_URL ?? null : undefined });
}
