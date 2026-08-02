---
lastmod: 2026-08-01 16:48
date: 2026-07-08 15:26
---
# Review Queue — sorted by priority

## MUST-FIX BEFORE DEPLOY

- [ ] **PATCH /categories is broken** — `categories.py:67` references
  `payload.Buckets_id`; the schema field is `bucket_id`. Every category
  update raises AttributeError → 500. Fix to `payload.bucket_id`.
- [ ] **FK-ownership check in transactions.py** — verify `category_id`
  exists AND belongs to `current_user.id` before `db.commit()`, raise 404
  if not. Confirmed live 500 when a bucket_id was passed as a category_id.
  No client-supplied FK should reach commit unverified. (Security.)
- [ ] **Decimal serialization** — Pydantic v2 serializes Decimal to a JSON
  string, so `amount`, `target_amount`, `current_amount`, `current_balance`,
  `apr`, `minimum_payment`, `target_percentage`, `alert_threshold` all
  arrive as `"42.50"`, not `42.50`. Frontend types declare `number` — the
  types are lying, and arithmetic silently breaks (NaN / string concat).
  Fix once on the backend: `@field_serializer` returning float on response
  schemas. One change fixes all consumers.
- [ ] **MAJOR: backend computes bucket spent + limit** — backend never
  computes spending totals (designed before the envelope-display idea).
  `spent` = SUM of all transactions across all categories in a bucket, via
  ONE grouped SQL aggregation (join transactions→categories→buckets,
  `func.sum`, `group_by` bucket). `limit` = `target_percentage ×
  total_monthly_income` (income from the income table). Enrich
  `BucketResponse` with both computed fields so the frontend map lines up
  unchanged. Design on paper first. → see [[SQL Aggregation]]
- [ ] **Token persistence (Phase 1: localStorage)** — token currently lives
  only in React state, so refresh logs the user out. Persist in
  localStorage + rehydrate on mount to ship. (httpOnly migration is
  post-deploy — see below.)

## SHIP-BLOCKING-ADJACENT (STUB-ABLE)
*Rides along with the backend rework. Needed for correct data, but can be
stubbed briefly while spent lands first. One focused session.*

- [ ] **Monthly window** — envelopes reset each month, so spent must be
  filtered to the current month. Add a `WHERE` on transaction date to the
  aggregation query. (Not a calendar — just a monthly reset.) Decide this
  WITH the spent query; they're the same task.
- [ ] **Limit computation** — `target_percentage × total_monthly_income`.
  Income comes from the income table (may be a sum of income rows — confirm
  shape). Can stub limit a little longer while nailing spent, but it's part
  of the same rework.

## POST-DEPLOY 
*None of this blocks a working deployed app. Can wait weeks or months.
Pick up one at a time, guilt-free.*

**Auth hardening (Phase 2 — doubles as a CI/CD exercise)**
- [ ] Migrate localStorage → httpOnly cookies + refresh-token flow.
  Backend: refresh-token issuance + `/auth/refresh` endpoint + validation.
  Frontend: call refresh on 401 or app load, get fresh access token, retry.
  (Full rationale + 3-option comparison already written below.)

**Backend behavior / data-model questions**
- [ ] Review cascade relationships for hard/soft deletes (deleting a
  category shouldn't wipe all its transactions). Confirm FK behavior —
  want `ON DELETE SET NULL`, never CASCADE, on `transactions.category_id`.
- [ ] Allow transactions NOT tied to a category (nullable `category_id`),
  so you can regroup/reassign without deletion wiping everything. Add a
  "get transactions in general" route (currently GET expects a category_id
  or a single transaction id).
- [ ] Delete-transaction route returns the deleted transaction schema, not
  a MessageResponse — revisit whether that's what you want to display.
  (Note: buckets/categories are hard deletes returning `{"message": ...}`;
  the other four are soft deletes returning the full object. Two delete
  contracts — don't let the UI treat them uniformly.)
- [ ] Business-rule validation across all schemas — valid ranges and
  allowed values (Field(ge=0, le=100) for percentages, Enum for
  bucket_type, audit all schemas against the ISO 4217 currency template).
- [ ] Login accepts email OR username in a single `login_identifier` field
  → query `user.email == identifier OR user.username == identifier`.
- [ ] separate service/CRUD layer, like services/bucket.py or crud.py that holds database logic, so routers stay thin and just call get_bucket_spending(db, user). Move all database logic out of the router files and migrate them to a services folder to trim down the size

**Frontend features / UX**
- [ ] Route param for categories — `/buckets/:bucketId/categories`, read
  with `useParams()`. Bookmarkable, back button works.
- [ ] New-user onboarding/tutorial — explain the Conscious Spending Plan
  philosophy and the envelope system. A blank dashboard is confusing.
- [ ] Bucket-to-bucket transfer (envelope step 3) — atomic debit/credit,
  recorded. Transfer button eventually lives in CardAction.

**Type/serialization cleanup (do with Decimal fix or later)**
- [ ] `target_percentage` renders `30.00` — verify Network tab shows
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