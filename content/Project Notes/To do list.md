---
lastmod: 2026-08-31 08:33
date: 2026-07-08 15:26
---
# Review Queue: sorted by priority

## MUST-FIX BEFORE DEPLOY

- [x] **PATCH /categories is broken** — `categories.py:67` references
  `payload.Buckets_id`; the schema field is `bucket_id`. Every category
  update raises AttributeError → 500. Fix to `payload.bucket_id`.
- [x] **FK-ownership check in transactions.py** — verify `category_id`
  exists AND belongs to `current_user.id` before `db.commit()`, raise 404
  if not. Confirmed live 500 when a bucket_id was passed as a category_id.
  No client-supplied FK should reach commit unverified. (Security.)
- [x] **Decimal serialization** — Pydantic v2 serializes Decimal to a JSON
  string, so `amount`, `target_amount`, `current_amount`, `current_balance`,
  `apr`, `minimum_payment`, `target_percentage`, `alert_threshold` all
  arrive as `"42.50"`, not `42.50`. Frontend types declare `number` — the
  types are lying, and arithmetic silently breaks (NaN / string concat).
  Fix once on the backend: `@field_serializer` returning float on response
  schemas. One change fixes all consumers.
- [x] **MAJOR: backend computes bucket spent + limit** — backend never
  computes spending totals (designed before the envelope-display idea).
  `spent` = SUM of all transactions across all categories in a bucket, via
  ONE grouped SQL aggregation (join transactions→categories→buckets,
  `func.sum`, `group_by` bucket). `limit` = `target_percentage ×
  total_monthly_income` (income from the income table). Enrich
  `BucketResponse` with both computed fields so the frontend map lines up
  unchanged. Design on paper first. → see [[SQL Aggregation]]
- [x] **Token persistence (Phase 1: localStorage)** — token currently lives
  only in React state, so refresh logs the user out. Persist in
  localStorage + rehydrate on mount to ship. (httpOnly migration is
  post-deploy — see below.) [[Token Persistence]]
- [x] **Implement every other resource**: This goes hand in hand with the next point
- [x] **Implement shadcn sidebar** Adding a sidebar would make this 6+ page app much easier for the user to navigate through. 
- [x] Create a sign up page, seed the four buckets on signup
- [x] Resolve and implement the debt into fixed costs feed
- [ ] Implement a DELETE user route
- [x] **Replace the bucket-editing loop with a single transactional endpoint.** The editing page currently saves by PATCHing all four buckets in a client-side loop, so a mid-loop failure leaves some buckets saved and others not,a user could end up with a half-applied plan they never chose (e.g. a random 87% total from a partial save, not a deliberate one). Fix: one batch endpoint (e.g. `PATCH /buckets`) that accepts all four percentage/threshold updates and commits them in a single transaction, so it's all-or-nothing. Same atomicity principle already applied to registration seeding (`flush → seed → one commit`); the editing path is currently on the wrong side of it. Not a data-corruption risk today (Pydantic still validates each request), but a real coherence gap once bucket editing is used by actual users.
- [ ] Donut in the buckets page clips the over-allocated segment at high coverage
- [ ] Manual/AI entry unlocks adding debts and savings goals
- [ ] seed realistic demo data before deploy/demo so the spending by category chart and dashboard looks good for recruiters.
After rereading *I will teach you to be rich*, I came to a big realization about the whole model of the app, something that i need to restructure the backend to reflect in the frontend. See more here: [[Design Changes]]


## SHIP-BLOCKING-ADJACENT (STUB-ABLE)*

- [x] **Monthly window** — envelopes reset each month, so spent must be
  filtered to the current month. Add a `WHERE` on transaction date to the
  aggregation query. (Not a calendar — just a monthly reset.) Decide this
  WITH the spent query; they're the same task.
- [x] **Limit computation** — `target_percentage × total_monthly_income`.
  Income comes from the income table (may be a sum of income rows — confirm
  shape). Can stub limit a little longer while nailing spent, but it's part
  of the same rework.
 - [x]  **MAJOR: `AuthError` handling extracted / per-page auth-failure coverage** — the `try/catch (AuthError) → clearToken() + navigate("/")` pattern currently lives ONLY in `Dashboard.tsx`. Works, but it's one instance of a pattern every authenticated page needs — a dead/expired token must clear auth and redirect from ANY page, not just Dashboard. As soon as the other pages (Income, Debts, Transactions, Savings Goals) make authenticated calls, each needs the identical catch block. Copy-pasting that catch into every page is the duplication signal. When it shows up (~2nd–3rd page), extract into an **AuthContext** that owns `token` / `clearToken` / the auth-failure handler and exposes a single "handle auth failure" the pages call — keeps the API layer pure (no React/routing imports in `apiFetch`). Alternative: trigger logout from inside `apiFetch` via a registered callback, but that reintroduces the "API layer can't touch React state" problem — more machinery, only if context proves insufficient. Do NOT build now — one page is not yet duplication. Build when the copy-paste is real. → see Token Persistence
 - [x] categories.tsx has a broken props/state and unused imports in components/pages.
 - [x] input `label`/`name`/`autoComplete`, the `UserResponse` type gaps, and the catch-all route.

Smaller items surfaced alongside:

- Dashboard catch only `console.error`s non-auth failures — needs a real error-state UI ("couldn't load, retry"), not just a console log.
- Consider `navigate("/", { replace: true })` for consistency with the line-36 `<Navigate replace />` guard, so the explicit redirect also avoids a dead-session history entry.

## POST-DEPLOY 
*None of this blocks the app deployment. Can wait weeks or months.*

**Auth hardening (Phase 2 — doubles as a CI/CD exercise)**
- [ ] Migrate localStorage → httpOnly cookies + refresh-token flow.
  Backend: refresh-token issuance + `/auth/refresh` endpoint + validation.
  Frontend: call refresh on 401 or app load, get fresh access token, retry.
  (Full rationale + 3-option comparison already written below.)

**Backend behavior / data-model questions**
- [ ] Refactor api fetches into tanstack query
- [ ] Add rate limiting (slowapi)
- [ ] Review cascade relationships for hard/soft deletes (deleting a
  category shouldn't wipe all its transactions). Confirm FK behavior —
  want `ON DELETE SET NULL`, never CASCADE, on `transactions.category_id`.
- [x] Allow transactions NOT tied to a category (nullable `category_id`),
  so you can regroup/reassign without deletion wiping everything. Add a
  "get transactions in general" route (currently GET expects a category_id
  or a single transaction id).
- [ ] Delete-transaction route returns the deleted transaction schema, not
  a MessageResponse — revisit whether that's what you want to display.
  (Note: buckets/categories are hard deletes returning `{"message": ...}`;
  the other four are soft deletes returning the full object. Two delete
  contracts — don't let the UI treat them uniformly.)
- [x] Business-rule validation across all schemas — valid ranges and
  allowed values (Field(ge=0, le=100) for percentages, Enum for
  bucket_type, audit all schemas against the ISO 4217 currency template).
- [ ] Login accepts email OR username in a single `login_identifier` field
  → query `user.email == identifier OR user.username == identifier`.
- [x] separate service/CRUD layer, like services/bucket.py or crud.py that holds database logic, so routers stay thin and just call get_bucket_spending(db, user). Move all database logic out of the router files and migrate them to a services folder to trim down the size (partially done)
- [ ] add a dual-mode income, hooked up to the AI layer that inputs paychecks from user and dynamically recomputes envelope totals based off real income, not an estimated income
- [ ] Savings goals shouldn't reset every month
- [ ] the limit shouldnt change either, prompt the user at the beginning of every month, ask if they would like to update their monthly income and/or their bucket percentages.
- [ ] all of my patch routes are full-replace contracts, basically you have to send back everything instead of just updating a single variable. revisit this later.
- [ ] dead imports on buckets.py
- [ ] **Link debt-payment transactions to debt balances (auto-decrement).** Currently (phase 1) debts is a purely informational payoff tracker: the user logs debt _payments_ as normal transactions in a Fixed Costs category (which feeds the bucket's spent via the existing aggregation), and _separately_ maintains each debt's `current_balance` on the debts page,so there's manual double-entry, and the two can drift. Phase-2 upgrade: let a transaction be flagged as a payment toward a specific debt, so logging it also decrements that debt's `current_balance` automatically. Removes the double-entry and makes payoff progress live and accurate from real payments. The payment→bucket side needs no change (transactions already roll into Fixed Costs); this is purely about connecting the payment to the debt's balance.

**Frontend features / UX**
- [ ] Route param for categories — `/buckets/:bucketId/categories`, read
  with `useParams()`. Bookmarkable, back button works.
- [ ] New-user onboarding/tutorial — explain the Conscious Spending Plan
  philosophy and the envelope system. A blank dashboard is confusing.
- [ ] Bucket-to-bucket transfer (envelope step 3) — atomic debit/credit,
  recorded. Transfer button eventually lives in CardAction.
- [ ] Allow users to login with username or email.
- [ ] **Pace chart on the Transactions page** (answers "am I burning this envelope faster than the month is passing?",velocity, where the gauge only shows position; half-gone means nothing without knowing if it's the 5th or the 25th). Plots cumulative spend against a straight pace line (day 1 = $0 → last day = bucket limit); above the diagonal means ahead of pace, and the crossing point is the day you run out. Scoped bucket route shows one line + its pace line; unscoped `/Transactions` shows four cumulative lines (one per bucket), narrowing on category click. Fits the coaching stance,flags speed without blocking. Work: (1) filter to current month,`getTransactions` returns all history, so either filter client-side or add a date-range param to the endpoint (month scoping currently only lives in `services/buckets.py` via `now.replace(day=1)`); (2) sort by `transaction_date`, reduce to a running total, emit `{day, total}` points,the only real logic; (3) pace line is just two points, Recharts interpolates. Data model already supports it: month is the period, limit is monthly income × target_percentage.
  

**Type/serialization cleanup (do with Decimal fix or later)**
- [x] `target_percentage` renders `30.00` — verify Network tab shows
  `30.00` vs `"30.00"`; fix type or `Number()` in component. (Subsumed by
  the Decimal fix above.)
- [ ] Date fields — `DebtCreate.due_date` and `IncomeCreate.income_date`
  are required with no default (422 if omitted). `SavingsGoalCreate.due_date`
  nullable — decide if "no deadline" is valid. All are `datetime` not
  `date`; `<input type="date">` lands at midnight UTC — confirm intended.
- [ ] PATCH semantics — every PATCH reuses the Create schema and does a
  full replace, not partial. Partial bodies null out or 422 omitted fields.
  If you make PATCH truly partial later, Update types need `Partial<>`.
- [ ] Add `created_at` / `updated_at` to frontend response types if you
  want to display or sort by them.

**Minor / cosmetic cleanup**
- [ ] `transaction.ts:1` — stray `import type { Update }` autocomplete
  artifact (TS6133). `:3` — unused MessageResponse import.
- [ ] `bucket.ts` — lowercase `authorization` (works, inconsistent);
  2-space indent vs 4 elsewhere; no `UpdateBucket` type (uses BucketCreate);
  `BucketCreate` is XCreate while everything else is CreateX.
- [ ] `user.ts:1-2` imports from `../api/config` instead of `./config`.
- [ ] File naming — `savings-goal.ts`/`debt.ts`/`income.ts` singular; rename
  to plural if you prefer consistency.
- [ ] `GET /savings-goals?bucket_id=` is the only filter among the three
  new resources; debts and income take no query params.

**AWS cleanup**
- [ ] Move EB secrets to AWS Secrets Manager