---
lastmod: 2026-08-11 10:21
date: 2026-08-11 10:19
---
Private reference — the technical knowledge behind working effectively with LLMs, both as development tools and as components inside software. Study material for interviews and for building the AI layer in Jot.
## The three levels of AI usage in development

From baseline to how senior engineers operate:

1. **Autocomplete** — inline code suggestions: GitHub Copilot, Cursor tab-complete, editor extensions. Nearly every developer at every level uses this.
2. **Conversational development** — using an LLM (Claude, ChatGPT) as an active thought partner for architecture, debugging, and code review. This is table stakes now; the differentiator is doing it _well_ (see prompt engineering and context management below).
3. **Agentic pipelines** — AI embedded directly into the software being built, or into a developer's own workflow as an autonomous agent doing multi-step work. Examples:
    - Stripe / Linear / Notion — AI that reads a bug report and opens a PR with a fix for review.
    - Cursor's background agent — runs in a VM, edits code, runs tests, iterates, opens a PR with results.
    - Internal tools at Google/Meta — LLM agents that monitor deploys, detect regressions, auto-file incidents.
    - **Jot's NL transaction parser** — an agentic _feature_ embedded in the product: natural language in, a structured tool call out that creates a transaction.

**Bridging level 2 → 3 is about designing _for_ AI:** context management, prompt engineering, and agent architecture. That's the skill set below.
## Tokens and the context window

- A token is roughly ¾ of a word. "Hello World" is ~2 tokens. Tokens matter for two reasons: **cost** and the **context window**.
- **Context window** = the model's working memory. Claude Sonnet's is ~200k tokens, and it holds _everything_ in the conversation — your messages, the model's responses, pasted files, all of it. When it fills, the model either truncates the oldest context (silently losing it) or errors.

### Using tokens efficiently

- **Paste only what's relevant.** Debugging one function? Paste that function and its immediate dependencies, not the whole codebase.
- **Summarize long context.** Starting a new chat: give a 3-sentence summary plus the current table structure, not 200 lines of code.
- **Reset conversations when they go stale.** A long chat carries a lot of dead context; start fresh with a focused context block.
- **Front-load stable info in a reusable context block.** A dense, reusable project-context block (a "skill") keeps the model oriented without re-explaining the project every time.

### Context management in production

Inside a product, the same discipline applies. When a user asks "how am I doing this month," you don't ship all their transactions to the API — you send an **aggregated summary**. This is the token-efficiency principle applied to a running system, and it's also just better architecture: send the model the smallest sufficient context.
## Prompt engineering

**Weak:** "How do I write a FastAPI route?"

**Strong:**

> I'm building a FastAPI backend (Python 3.11, SQLAlchemy, PostgreSQL). I need a `POST /transactions` endpoint that:
> 
> 1. Accepts a Pydantic model with amount, description, category_id, transaction_date
> 2. Validates the category belongs to the authenticated user (JWT, user_id in token)
> 3. Writes to the transactions table
> 4. Returns the created transaction
> 
> My user-auth dependency is already written and returns a user object. Show me the route, the Pydantic schema, and flag any security concerns.

The strong prompt supplies: **role** (what the model is doing), **constraints** (the stack), **explicit requirements** (numbered), **existing context** (auth is done — don't rebuild it), and **desired output** (route + schema + flags).

### Patterns worth knowing

- **Chain of thought** — "think through this step by step before answering" gets more reasoning on hard problems.
- **Persona / role** — "you are a senior backend engineer reviewing this for production" shapes the quality and rigor of feedback.
- **Negative constraints** — "don't use an ORM, I'm on raw SQL" keeps the model from wandering off in the wrong direction.
- **Output format** — "give me a bulleted list of tradeoffs, not prose" controls structure.
## Agentic patterns (for interviews and for Jot)

- **RAG (Retrieval-Augmented Generation)** — instead of cramming all context into a prompt, store it in a vector database and retrieve only the relevant chunks at query time. Scales context far beyond the window.
- **Tool use / function calling** — give the LLM a set of functions it can call, and it decides which to invoke based on the input. The model's output becomes a _structured call_ rather than free text.
- **Agents vs. chains** — a **chain** is a fixed sequence of LLM calls; an **agent** decides its own next step in a loop until it's done. Claude Code is an agent. Jot's NL transaction parser is a **chain** (parse → structured tool call → create transaction).
- **Context management in production** — send aggregated summaries, not raw data (see above). The token-efficiency discipline is also a system-design discipline.
## The AI layer in Jot (the pattern that matters)

**Goal:** build the NL transaction parser using **function calling / tool use**, not a chatbot wrapper.

- The model parses natural language ("spent $12 on lunch") and calls a **structured tool** to create a transaction.
- Tool use keeps the LLM output **predictable** and **validated against the schema** — the model isn't returning free-form text you then have to parse; it's returning a structured call that maps to your existing transaction-creation logic.
- Ship simple-first: parse the clear cases, fall back to the manual entry form when the input is ambiguous.

**Why this is the strongest thing to build:** it's a real product feature using an LLM architecture pattern (function calling), not a chatbot bolted on. That's the differentiator — both as an engineering artifact and as an interview talking point.

**Interview framing (once built):**

> "I designed Jot's AI layer using function calling — the model parses natural language and calls a structured tool to create transactions, which keeps the LLM output predictable and validates it against the schema."

**Build note:** when implementing, pull up the _current_ Anthropic API docs (structured output / tool use, the messages endpoint) rather than working from memory — the API evolves.
## Forward plan

- **For Jot:** learn function calling / tool use deeply while building the NL parser. That's the pattern that creates the biggest real experience and the strongest impression — a product feature built on an LLM architecture pattern.
- **For interviews:** be able to explain the design decision, not just that it works — why function calling over free-text parsing, why the schema validation matters, how the fallback keeps it robust.