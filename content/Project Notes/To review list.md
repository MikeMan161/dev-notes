---
lastmod: 2026-07-29 15:20
date: 2026-07-08 15:26
---
 - [ ] to do: must go back and implement business-rule validation across all schemas. things like valid ranges and allowed values.
 - [ ] double check the FK-ownership in transactions.py create and update, verify that category_id exists and belongs to current_user.id, raising 404 if not. no client-supplied FK should ever reach db.commit() unverified. In the docs, I was testing creating a new transaction, and i accidentally added a bucket id where it should have been a category id, and i got a 500 error, internal server error. my code did not catch that the category id was incorrect, it kept working up until db.commit(), and the database flagged it as not being correct, and crashed. i should verify that, that's a security error. 
 - [ ] for authentication, I'll be storing the JWT token in memory (a react state). the token lives in a variable/state in the running app. it's not readable in persistent storage, so it's less likely to be exposed to XSS token theft. the tradeoff is that the token vanishes on refresh. closing/reload a tab and the user is logged out because that memory is wiped. that means that for the backend, i have to add a re-authentication flow (a refresh token) to get a new access token silently. so for the backend: add refresh-token issuance + a /auth/refresh endpoint + validation. then for the frontend: add logic to call refresh when a request 401s or on app load, get fresh access token, retry. 
 - [ ] Small note on `30.00%` — your backend returns `target_percentage` as a string-ish decimal (probably `Numeric` in SQLAlchemy serializing with trailing zeros). Your TS type says `number`. Worth checking the Network tab whether it's `30.00` or `"30.00"` — if it's quoted, your type is lying and you'll want `string`, or format it in the component with `Number(percent)`.
 - [ ] fix: have the backend accept either email or username in a single login_identifier or username field, then queries user.email == identifier or user.username == identifier. A decent backend route change.
 - [ ] **Route param** — `/buckets/:bucketId/categories`. The ID lives in the URL, you read it with `useParams()`. Bookmarkable, back button works, and it's what the URL bar is for. Costs you a route.
 - [ ] Review cascade relationships for hard/soft deletes (making sure deleting categories doesn't wipe all transactions, etc)
 - [ ] Along with the last point, i see that to get transactions, it expects a category_id. however, maybe i should make it so you can make/get transactions that arent tied to a category, and you can assign it to a category. since transactions have soft deletes, i dont want it when you delete a category to automatically wipe all of those transactions. what if you just wanted to move things around or group things into a new category, but when you delete one category you just wipe everything? not good. also, to get one specific transaction, the route takes just the transaction id. so maybe make a way to get transactions in general? things to think about.
 - [ ] Delete transaction route sends back a schema of the deleted transaction, not a message response. revisit to see if that's what i really want it to display.
 - [ ] Implement being able to transfer some of the total of one bucket to another, like how the UI notes state.
 - [ ] Create a new user introduction/tutorial, explaining the philosophy of the conscious spending plan, why this will be useful (normal budgeting sucks, focus on spending money on things you love and worry less about saving, how the envelope system works). Dropping new users into a blank dashboard might be confusing.
 - [ ] Maybe a Calendar to track each month's spending over time?









notes from claude: 
 Decimal serialization (affects every money field, frontend + backend)
  - [ ] Pydantic v2 serializes Decimal to a JSON string, so amount, target_amount, current_amount, current_balance, apr,
  minimum_payment, target_percentage, alert_threshold all arrive as "42.50", not 42.50.
  - [ ] Frontend types declare these as number (in transaction.ts, bucket.ts, and the three new files) — the types are
  lying about runtime values.
  - [ ] Any arithmetic on them silently breaks: current_amount / target_amount → NaN, a + b → string concat.
  - [ ] Pick one fix: a @field_serializer returning float on the backend response schemas, or Number() coercion at the
  frontend boundary. Backend is cleaner — one change fixes all consumers.

  Backend bug — PATCH /categories/{category_id} is broken
  - [ ] backend/app/routers/categories.py:67 references payload.Buckets_id; the schema field is bucket_id. Every
  category update raises AttributeError → 500. Should be payload.bucket_id.

  Date fields — none are server-derived except transactions
  - [ ] DebtCreate.due_date is required, no default — form must always send it or you get a 422.
  - [ ] IncomeCreate.income_date is required, no default — same.
  - [ ] SavingsGoalCreate.due_date is optional/nullable — decide whether the UI treats "no deadline" as a valid state.
  - [ ] Only TransactionCreate.transaction_date has a default_factory, so it's the one field you can safely omit.
  - [ ] All are datetime, not date — an <input type="date"> value like "2026-08-01" does parse, but lands at midnight
  UTC. Confirm that's what you want for due dates.

  PATCH semantics
  - [ ] Every PATCH reuses the Create schema and overwrites all fields unconditionally — it's a full replace, not a
  partial update. Sending a partial body will null out or 422 the omitted fields.
  - [ ] The UpdateX types I wrote mirror CreateX exactly (same as your UpdateTransaction). If you ever make PATCH truly
  partial on the backend, these need Partial<>.

  Response type coverage
  - [ ] No frontend response type includes created_at / updated_at, though every backend response returns them. Add if
  you want to display or sort by them.
  - [ ] Soft-delete endpoints (transactions, savings goals, debts, income) return the full deleted object, not
  MessageResponse — worth confirming your delete handlers use the returned object rather than assuming a message.
  - [ ] Buckets and categories are hard deletes returning {"message": ...}; the other four are soft. Two different
  delete contracts in the same API — make sure the UI doesn't treat them uniformly.

  Cleanup
  - [ ] transaction.ts:1 — stray import type { Update } from "vite/types/hmrPayload.js" (autocomplete artifact, TS6133).
  - [ ] transaction.ts:3 — MessageResponse imported but unused (delete returns TransactionResponse).
  - [ ] bucket.ts:22 — getBuckets uses lowercase authorization while everything else uses Authorization. Works (headers
  are case-insensitive), just inconsistent.
  - [ ] bucket.ts uses 2-space indent; the rest of api/ uses 4.
  - [ ] bucket.ts has no UpdateBucket type — updateBucket takes BucketCreate. Also BucketCreate is XCreate while
  everything else is CreateX.
  - [ ] user.ts:1-2 imports from "../api/config" / "../api/types" instead of "./config" / "./types" — resolves fine, but
  odd from inside api/.
  - [ ] New files are savings-goal.ts, debt.ts, income.ts (singular, matching bucket.ts/category.ts) — rename if you'd
  rather have plurals.

  Filters
  - [ ] GET /savings-goals?bucket_id= is the only filter among the three new resources; getSavingsGoals(token,
  bucket_id?) supports it. Debts and income take no query params.