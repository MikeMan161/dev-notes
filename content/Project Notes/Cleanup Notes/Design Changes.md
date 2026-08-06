---
lastmod: 2026-08-05 20:20
date: 2026-08-05 12:49
---
After I implemented the progress bar for the buckets in the frontend, I took a look at where each resource would be used in the app:
- User - User info page
- Buckets - Main Dashboard page
- Categories & Transactions - Can be grouped together into one transactions page
- Savings Goals - ?
- Income - ?
- Debts - ?

After rereading the relevant chapters, I came to a few massive realizations:

1. The envelope system by Sethi is designed to have only 4 envelopes/buckets:
		- Fixed Costs
		- Investments
		- Savings Goals
		- Guilt-free Spending
	- Because of this, I need to change how these buckets act in the backend. Instead of allowing users to create/delete buckets freely, I believe it's best to default the user to just these 4 categories.
	- If a user doesn't need a specific category, like Investments, they can simply change the percent value to 0% to take it out of the equation.
2. Debts need to be folded into Fixed Costs. I need to change the way the bucket numbers are calculated. the limits are still derived from a user's income and the percent of that income they give it, but they should be able to include how much they spent on working towards that debt into that Fixed Costs bucket. 
	- So Debts still earns it's own page. A user can enter how much they paid towards that debt and it'll track on the bucket's spent/limit, but it should also reflect in an individual debts page to allow the user to see how they're doing.
3. This is directly relevant to point 1, I need to Hardcode the four buckets as defaults. When a user first signs up, the app will default-provision the four buckets to that user. These four buckets are the system itself, it's what separates this as a working, philosophy-shaped app instead of an empty void. 
	- The buckets won't be fully locked, a user can edit the percentages of each bucket, but the buckets themselves cannot be changed/deleted, and they can't make any new ones. If a user doesn't see a use for the investments bucket, they can set its value to 0%.
4. Buckets must stay fixed, but the categories within them are fully user-customizable

test@example.com
string