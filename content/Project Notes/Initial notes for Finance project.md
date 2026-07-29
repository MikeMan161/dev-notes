---
lastmod: 2026-07-29 14:03
date: 2026-07-17 15:59
---
# This project will be a financial dashboard. it will be a full stack project

## The stack:
Frontend: FastAPI and Typescript
[[Frontend Stack]]
Backend: FastAPI and Python
[[Backend notes]]
Database: PostgreSQL
[[Database Notes]]
Ai Layer: Claude
Deployment: AWS (Elastic Beanstalk + RDS)
optional: FRED API for economic benchmarks

To Review list for final passthrough:
[[To review list]]

## Key features: 
CSV upload or manual data entry
auto categorization using LLM
Natural language processing of your data
spending pattern detection and insights
optional economic benchmarks from fred api

## Important info to read up on:
read up on what restapi is, how does request/response work
refresh myself on database relationships (one to many, many to many)
what typescript does over javascript (types)

## Claude strategy:
[[My AI Workflow]]
Use chat for planning, concepts, answering questions on code/ideas
Use code for direct file read/write, commands, and making edits/running installs
use cowork for task and project management
Setup claude code in vs code directory once ready to code (can run git commands for me)
## Get experience with GitHub:
Learn branching strategy - never code directly on main, create feature branches, do all the work there, then merge back into main to keep code stable
practice pull requests - to get a good view of what changed, and why, building habits
use Issues, github's task tracker, i can tie commits to issues
.gitignore - put files that i shouldn't upload into here, like .env with API keys, node_modules, __pycache__, etc
GitHub actions, CI/CD pipelines


## new idea for ai layer:
analyze spending patterns
identify areas to cut
calculate how extra monthly payments affect loan payoff timeline and total paid
suggest personalized debt payoff plan based on actual spending data

keep reading I will teach you to be rich by ramit sethi, utilize ideas from that book


## Design Philosophy:
Link to my book notes for a more in depth look 
[[Finance Dashboard Design principles]]

database ideas based on i will teach you to be rich: 
### conscious spending foundation:
- schema should look track these 4 buckets:
	fixed costs (50-60%) rent/mortgage, utilities, debt payments, subscriptions)
	investments (10%): 401k, roth ira
	savings goals (5-10%) vacation fund, emergency fund, gifts
	guilt-free spending(20-35%) fun money
	add a toggle/tag system to label something as fun/fixed
	debt optimization: apr, minimum payment, total balance

automation is a huge factor: focus on how the data gets into the system (csv uploads or api pulls) so the system runs while a user sleeps

identify ghost subscriptions
[[CLI Reference]]
[[Bash Commands]]
[[Cyberdeck and Homelab Resources]]
[[Roadmap]]
[[PostgreSQL notes]]

**Concretely, for every technology in this stack:**

You should be able to:

- Explain what it does and why you chose it
- Read code written in it and understand what's happening
- Write the basic operations without looking them up
- Debug simple errors in it
- Know what you _don't_ know and say so honestly

You don't need to:

- Know advanced features you're not using
- Memorize syntax you can look up in 30 seconds
- Understand every edge case or optimization