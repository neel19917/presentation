# Route Optimization Explainer — Voiceover Script

80 seconds · timed to `modules/route-optimization-explainer.html`
Tone: confident, plainspoken, mid-market shipper audience. ~140 wpm.
Record as one take or per-chapter (chapter timecodes below match the video's progress bar).

| Time | Chapter | VO |
|---|---|---|
| 0:00–0:06 | Intro | "Route optimization — step by step. Here's how FreightPOP turns raw orders into the best possible route, every single day." |
| 0:06–0:18 | Step 1 · Import | "It starts with your stops. Sales orders flow straight in from your ERP, your store, or the API — no re-keying, no spreadsheets. Every stop arrives with its weight, its delivery window, and its special services already attached." |
| 0:18–0:30 | Step 2 · Rules | "Then FreightPOP models the real world. Delivery windows. Vehicle capacity. Traffic, tolls, and driver hours-of-service. The constraints most routing tools ignore are exactly where the money is." |
| 0:30–0:42 | Step 3 · Optimize | "Now the engine goes to work — sequencing every stop into the most efficient route across your whole supply chain. And when a new order lands or the road changes… it re-routes, dynamically, in real time." |
| 0:42–0:54 | Step 4 · Dispatch | "One tap, and the route is in your driver's pocket. Live stop details, turn-by-turn order — no printouts, no phone calls." |
| 0:54–1:08 | Step 5 · Track + POD | "As the truck rolls, dispatch watches progress live. At the door, the driver captures a photo, notes, and a signature — and proof of delivery syncs back instantly. Zero paperwork. And the customer already knows." |
| 1:08–1:20 | Result / CTA | "Fewer miles. Real-world constraints. Zero paperwork. That's route optimization inside a complete TMS. See it live — schedule a demo at freightpop dot com slash route optimization." |

**Word count:** ~185 (comfortable at 140–150 wpm with breathing room on the visuals).

**Recording notes**
- Land "re-routes, dynamically, in real time" right as the blue route finishes drawing (~0:40).
- Pause a half-beat after "in your driver's pocket" — the START ROUTE press happens at 0:47.
- The final URL line should end by 1:16 so the CTA sits in silence for the last seconds.

**Renders**
- Full: `dist/route-optimization-explainer-1080p.mp4` (80s, 1920×1080)
- Social cut: `dist/route-optimization-social-45s.mp4` (starts at Step 3 — punchiest 45s, works muted)
- Re-render any range: `node tools/render-video.mjs --url "http://localhost:8123/modules/route-optimization-explainer.html?render=1" --out out.mp4 --from <s> --to <s>`
