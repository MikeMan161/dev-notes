---
title: Michael Rivera
description: CS student building a full-stack, AI-integrated personal finance app. These are the working notes behind it — architecture decisions, bugs I caught, and what I changed my mind about.
---

I'm a CS student at UNF building full-stack products with AI wired into them, not bolted on the side.

This site is my working notebook. It's where I reason through architecture before I write it, trace bugs back to the pattern that caused them, and write down what I got wrong. None of it is cleaned up after the fact — when a design turned out to be wrong, the old reasoning is still on the page next to what replaced it.

[LinkedIn](https://www.linkedin.com/in/riveramike/) · [GitHub](https://github.com/MikeMan161)

## Start here

Three notes that show how I actually work:

**[[Design Changes|I rewrote the product model in the middle of building it]]** — I reread the book the app is based on and realized my "users can create whatever buckets they want" model was wrong. The envelope system only works if it's rigid. That call deleted endpoints I had already written and shipped, and it was the right one.

**[[Bucket Editing Transactional Endpoint|Finding a partial-write bug, then finding the class of bug behind it]]** — The bucket editor saved by firing four sequential PATCHes. If the third one failed, the first two were already committed and the server held a spending plan the user never approved. The fix was one transactional PUT — but the real finding was that *every* PATCH route I'd written was a full-replace contract pretending to be a partial update.

**[[My AI Workflow|How I use AI without letting it become a crutch]]** — My rule: I architect, both of us implement, it checks for holes I missed. I don't ship code I can't explain line by line. Also covers the agentic patterns I'm building with — function calling, context management, chains vs. agents.

## The project

**An AI-powered personal finance dashboard.** Not another expense tracker — it implements Ramit Sethi's Conscious Spending Plan as an actual system: income splits into four fixed envelopes, transactions roll up against them, and an LLM layer parses natural language into structured transactions.

Currently in development. Deploying to AWS when the [[To review list|must-fix list]] is clear.

| Layer | Stack | Notes |
|---|---|---|
| Frontend | React, TypeScript, Vite, TanStack Query, Tailwind | [[Frontend Stack]] |
| Backend | FastAPI, Python, SQLAlchemy, Pydantic | [[Backend notes]] |
| Database | PostgreSQL | [[PostgreSQL notes]] |
| AI layer | Claude API — function calling for transaction parsing | in progress |
| Deployment | AWS Elastic Beanstalk + RDS | planned |

**Start with [[Finance Project Overview]]** for the full picture.

### Decisions and problems worth reading

- [[To review list]] — how I triage. Every known issue in the app, sorted by whether it actually blocks a deploy. Includes the FK-ownership hole I found where a client-supplied ID reached `db.commit()` unverified.
- [[SQL Aggregation]] — I needed spending totals per envelope. I wrote the raw SQL first, then translated it to SQLAlchemy, so I'd understand the query I was asking the ORM to build.
- [[Authentication]] and [[Token Persistence]] — JWT auth, and why the token living only in React state was a bug.
- [[I will teach you to be rich chapter 4 conscious spending]] — the product research the whole data model comes from.

### Learning in depth

Long-form notes from actually reading the docs, not skimming them:
[[Responding to Events]] · [[Effects]] · [[State - A Component's Memory]] · [[FastAPI, SQLAlchemy, and Pydantic]]

## Algorithms practice

I work through the [[Neetcode 150]] on a spaced-repetition schedule — after each attempt I rate it and set the next review interval in the note's frontmatter (3 days if I couldn't solve it, 21 if I solved it clean), and a [[Review Queue]] surfaces whatever's due without showing me which pattern it is.

Written-up solutions: [[Neetcode/Linked List/Linked List|Linked List]] · [[Valid Sudoku]] · [[Binary Search]] · [[Sliding Window]]

## Reference

Things I look up often, written in my own words: [[Bash Commands]] · [[CLI Reference]] · [[HTTP status code reference sheet]] · [[List Comprehension]]
