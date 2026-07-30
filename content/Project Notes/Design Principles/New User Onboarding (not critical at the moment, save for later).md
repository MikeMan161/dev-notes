---
lastmod: 2026-07-29 15:04
date: 2026-07-29 15:00
---
Build in reverse order of size. Empty states first (needed anyway), full onboarding later, intelligent prompts only if time. 
### Tier 1 — Empty states that teach (cheapest, needed regardless) 
- When user has no buckets, empty dashboard shows a sentence explaining what buckets/envelopes are and why 
- Include a "Create your first envelope" button as the primary action 
- Teaches in-context, costs almost nothing, doubles as the empty-state UI you need anyway 
- Buys most of the clarity without a full onboarding flow — holds the fort until the tutorial is worth building 
### Tier 2 — Full onboarding flow (nice demo polish) 
- Multi-step modal OR a `/welcome` route that first-time users hit 
- Use shadcn `Dialog` component for the modal (composition, not from-scratch) 
- 3–4 screens explaining the philosophy: 1. Normal budgeting fails because it's all restriction 2. Conscious spending: fund what you love, automate the rest 3. How the envelope system works 4. "Here are your buckets, go" → into the dashboard 
- ~an afternoon of work; good portfolio demo because it shows product thinking, not just CRUD 
### Tier 3 — Intelligent onboarding (only if spare time) 
- Contextual hints, guided first-bucket creation, etc. 
- Skip unless everything else ships 
### Why this matters (for interviews / dev notes) 
- App is built around Ramit Sethi's conscious-spending philosophy — the UI is meaningless without teaching the philosophy 
- Dropping users into buckets + depleting bars with no context reads as arbitrary 
- Onboarding is where the app earns user buy-in
