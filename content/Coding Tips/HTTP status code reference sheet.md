---
lastmod: 2026-07-07 17:33
date: 2026-07-07 17:33
---
**2xx — Success**

- **200 OK** — standard success for GET, PATCH, and most requests that return data. Your list/get-one/update routes return this (FastAPI defaults to 200).
- **201 Created** — success for POST that creates a new resource. Your `create` routes technically _should_ use this instead of the default 200, since they create something. Set it with `@router.post("", status_code=201, ...)`. It signals "a new thing now exists."
- **204 No Content** — success, but nothing to return in the body. Good for a DELETE where you don't send back a message. (You've been returning a message with 200 instead, which is also fine — 204 is the bodyless alternative.)

**4xx — Client errors (they did something wrong)**

- **400 Bad Request** — generic "your request is malformed or invalid." Use when input is wrong in a way Pydantic didn't already catch (e.g., a business-rule violation like "target_percentage must be positive").
- **401 Unauthorized** — "you're not authenticated." Missing, invalid, or expired token. Also your "current password is incorrect" case. Confusingly named — it really means _unauthenticated_.
- **403 Forbidden** — "you're authenticated, but you're not allowed to do this." Valid token, but you don't have permission for _this specific_ action/resource.
- **404 Not Found** — "that resource doesn't exist" — _or_, in your app, "it exists but isn't yours" (you use 404 over 403 for others' resources to avoid leaking existence). This is your workhorse for the `if not row` checks.
- **409 Conflict** — "this conflicts with current state." Classic use: trying to create something that already exists (duplicate email on registration, duplicate unique name). Worth knowing for your `register` route if you reject duplicate emails.
- **422 Unprocessable Entity** — "the request was well-formed but failed validation." **FastAPI returns this automatically** when a request body fails Pydantic validation — you rarely raise it yourself; the framework does. This is what fires when your `@field_validator` rejects a bad currency code.
- **429 Too Many Requests** — rate limiting ("slow down"). Relevant later if you rate-limit your AI endpoints.

**5xx — Server errors (your code broke, not the client's fault)**

- **500 Internal Server Error** — generic "something blew up on the server." You don't usually raise this deliberately — it's what happens when an unhandled exception occurs. Seeing it means a bug to fix.
- **503 Service Unavailable** — server temporarily down/overloaded. Rarely raised by hand in app code.

**The ones you'll actually type in your routers**, to cut through the noise:

- **404** — `if not row: raise HTTPException(404, ...)` — your most-used, on every get-one/update/delete and every FK-ownership check.
- **401** — wrong password, and it's what your auth dependency raises for bad tokens (mostly handled for you).
- **201** — worth adding to your `create` (POST) routes to be semantically correct.
- **400** — for business-rule validation failures Pydantic didn't catch.
- **409** — for duplicate-creation conflicts (e.g., email already registered).
- **422** — you don't raise it; FastAPI does it for you on validation failure. Just know what it means when you see it.

**The mental model that resolves most confusion:**

- **2xx** = it worked.
- **4xx** = _client's_ fault (bad input, not allowed, not found) — the request was wrong.
- **5xx** = _server's_ fault — the request was fine, your code failed.