# finfun.club — revamp

Marketing site for FinFun (grades 6–10), built to the *FinFun Website Revamp PRD* (Option B: own Next.js site, Graphy kept for courses).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Where things live
| What | File |
| --- | --- |
| All copy, prices, programs, testimonials, FAQs, partners | `lib/content.ts` |
| Blog posts | `lib/posts.ts` |
| Brand tokens + all styles | `app/globals.css` |
| Forms (partnership, parent query, report, enrol) | `components/Forms.tsx`, `app/api/lead/route.ts` |
| Old Graphy URL redirects | `next.config.ts` |
| Images | `public/a/**` (WebP) — regenerate from the creatives folders with `python3 scripts/assets.py` |

Search for `TODO(FinFun)` to find everything waiting on FinFun (logo, photos, partner logos, program details, prices, timeline dates, refund window, legal review).

## Configuration
Copy `.env.example` to `.env.local`. Nothing is required to run locally:
- `LEAD_WEBHOOK_URL` — every form posts JSON here (Google Sheets Apps Script / Zoho / HubSpot / Zapier). Unset = leads are only logged.
- `NEXT_PUBLIC_CHECKOUT_PRO` / `_ADVANTAGE` — after the enrol form, parents go to this checkout (Graphy or a Razorpay payment page). Unset = thank-you page, team follows up.
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` — analytics; `data-track` attributes + `lib/track.ts` send events.
