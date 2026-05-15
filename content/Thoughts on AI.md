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