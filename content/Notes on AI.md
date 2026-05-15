From my research, here are the 3 main levels of AI usage that I need to understand, from basic to how senior engineers operate:
1. Autocomplete: GitHub copilot, cursor, vscode extension. Any time of inline code suggestions. Most developers at every level utilize this
2. Conversational Development: Using claude or ChatGPT as an active thought partner for architecture decisions, debugging, and code review. I'm already at this level, my goal now is to do it better.
3. Agentic Pipelines: AI is embedded directly into the software systems being built, or into a developer's own workflow as an autonomous agent that does multi-step work. claude code is a taste of this. Examples:
	1. Stripe/Linear/Notion - AI that reads a bug report and automatically opens a PR with a fix for review
	2. Cursor's background agent - runs in a VM, edits code, runs tests, iterates, opens a PR with results
	3. Internal tools at Google/Meta - LLM agents that monitor deploys, detect regressions, auto-files incidents
	4. What i'm doing with my project - My AI natural language into transaction parsing layer is an agentic feature, just embedded into my project instead of my workflow

To bridge the gap between level 2 and 3 is understanding how to design for AI: context management, prompt engineering, and agent architecture

## Token Utilization
- A token is roughly 3/4 of a word. so "Hello World" is 2 tokens. this matters for two reasons: cost and context window
- **Context Window** - an AI's working memory. claude sonnet has a 200k token context window, which includes everything in the conversation. your messages, claude's response, files, all count against that window. when it's full, the model either truncates the beginning, losing that old context, or hits me with an error. 
- To be more efficient with tokens, there's a few steps you can take:
	- **Paste only what's relevant**. If you're debuggijng a portion of code, only paste what's immediately relevant, not the whole codebase.
	- **Summarize long context**. Instead of pasting 200 lines of code when starting a new chat, give a 3 sentence summary + the current table structure
	- **Reset conversations when they go stale**. When the chat starts to get old, start a new one with a focused context block
	- **Use system prompts / Context blocks for stable info**. Create skills have a dense, reusable context block that front-loads everything the ai needs to stay oriented on the project.

## Prompt Engineering

**Bad prompt**: "How do i write a FastAPI route?"

**Good prompt**: 
I'm building a FastAPI backend (Python 3.11, SQLAlchemy, PostgreSQL).
I need a POST /transactions endpoint that:
1. Accepts a Pydantic model with amount, description, category_id, transaction_date
2. Validates the category belongs to the authenticated user (JWT, user_id in token)
3. Writes to the transaction table
4. Returns the created transaction
My current user auth dependency is already written and returns a user object. 
show me the route, the pydantic schema, and flag any security concerns

The difference: Role (what the ai is doing), constraints (the stack details), explicit requirements (numbered), existing context (auth is done), and what you want back (route + schema + flags)

### Patterns worth learning:
- **Chain of thought** - "think through this problem step by step before giving me the answer" gets more reasoning on hard problems
- **Persona/role** - "you are a senior backend engineer reviewing this for production deployment" shapes the quality of feedback
- **Negative constraints** - "dont use ORMs, i'm using raw SQL" prevents the AI from going off in a direction you don't want
- **output format** - "give me a bulleted list of tradeoffs, not prose" controls response structure

## My Three-Layer workflow:
1. **Claude chat** - Architecture decisions, learning concepts, general questions, debugging logic that spans files
2. **VS code claude extension** - In file help while actively typing like "help me figure out what this erorr is" or "debug my logic"
3. **Claude code** - Multi-file tasks, running/testing code, implementing across codebase, refactors

**The main takeaway for my workflow is that I don't let claude become a crutch that just ships code i don't understand. I want to use it for execution after i've undertood and created the design. I architect, both claude and I implement, claude checks for holes and errors I missed.**

## My plan for improving how i use AI:
Given my 3 layer workflow, here's how I plan on actually improving how i utilize AI

- **Avoid vibe coding** - I want to avoid just using AI to generate code without reading it. It feels productive being able to spit out tons of code, but then as soon as I'm told to explain it or something breaks, it all falls apart as i'd have no idea what works and how to fix it. 
Instead of vibe coding, I'm going to use it this way:
- **Attempt to understand and solve the problem on my own first** - Spend a few minutes struggling. Read docs, architect it, try to implement it. The struggle to understand will make the AI's explanation stick in my head
- **Use AI to explain, not just generate** - After asking for help, ask it to "explain every line" if I don't understand its implementation, or "explain this concept" if something in the docs isn't making sense. 
- **Teach it back** - After an explanation, try to write the concept on my own words or write the code myself. If i can't, i don't actually know the underlying concepts, i'm just copying stuff. This is the same discipline I have for neetcode/leetcode, I need to be able to repeat the concept for myself, not just copy stuff down and moving on
- **Use AI to stress test my understanding** - "I think the reason we use TIMESTAMPZ over TIMESTAMP is this. am i on the right track, or am i missing something" Active retrieval beats passive reading every time, test my understanding.

## Agentic Patterns to Know for Interviews and My Project:
- **RAG (Retrieval-Augmented Generation)** - Instead of cramming all context into a prompt, store it in a vector database and retrieve only the relevant chunks at query time.
- **Tool Use / Function Calling** - Give the LLM a set of functions it can call, and it decides which to invoke based on the context. 
- **Agents vs. Chains** - A chain is a fixed sequence of LLM calls. An agent decides it's own next step in a loop until it's done. Claude code is an agent, my NL transaction parser is a chain. 
- **Context Management in Production** - in my project, when a user asks "how am i doing this month", you don't want to send all their transactions to the API. you send an aggregated summary. this solves the token inefficiency problem.

## My plan looking forward
- for my project: learn function calling/tool use deeply while making the NL transaction parser. that's the pattern that will make the strongest impression and create the biggest experience, building a real product feature using an LLM architecture pattern, not a chatbot wrapper. 
- for interviews: being abler to show and say " i designed the AI layer using function calling - the model parses natural language and calls a structured tool to create transactions, which keeps the LLM output predicable and validates against the schema" is a differentiator. 