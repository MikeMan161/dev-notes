---
lastmod: 2026-08-05 12:53
date: 2026-07-29 14:32
---
When I imagine what the main dashboard will look like, I look back to my reading of the ramit sethi book and I know exactly what it needs to look like. In the book, he talks about making an envelope system to target your "Big Wins". Essentially, allocate the money for certain categories liek eating out, shopping, rent, and so on. when you spend the money for that month, that's it. you can't spend more. you can dip into other envelopes,  but you'll have to cut back until you replenish that envelope. this is a good way of keeping spending simple and sustainable.

## The Envelope System:
1. Decide how much you want to spend in major categories each month
2. Put/Designate money in each envelope(category)
3. you can transfer from one envelope to another, but of course it's finite, you can transfer away a little bit of total from one envelope to another, but it's still a finite total, just shifting around

Given this, I think that it would be good to have the dashboard show not only money amounts, but also a progress bar that instead of getting bigger, actually decreases. I think that since a big goal of this app is to make this conscious spending plan as easy and simple to use, I think the primary read should be visual, like a meter that goes down and stuff so it's easy to read and digest. Then, if you want more details on each category, you can click on them and it'll lead you to more details.

/*Note to self: I have to go back and implement the ability to transfer money from one bucket/envelope to another, like step 3 states*/

If the bucket/Envelope goes negative, I think it'd look really cool if the bar goes back up, but with a different color (red fits best) and the number reflects that you went under the amount. When this happens, It will prompt you to shift the totals from other buckets to make up for the negative.

/*Need to take into account edge cases like what if all the other buckets can't afford to borrow totals, what if user dismisses/ignores it, does it nag or stay quiet?*/

**There's a common trait to good dashboards:** they show users what matters right now, without making them dig for it. Dont try to show everything at once. This is the "north star metric", getting a user's trust through restraint, letting users drill deeper on their own terms.

/*Tips from 35 SaaS Dashboard Design Examples*/:
- Top SaaS dashboards prioritize one key metric in the top-left quadrant, not a huge wall of charts
- Whitespace and calm design are better than data-dense layouts for daily use tools
- Progressive disclosure (show less upfront, reveal on demand) is the pattern behind good dashboards
- Color should communicate status, not decoration. Red is broken, not "look here"
- Fintech dashboards earn trust by leading with one number, balance or runway, not a wall of data.
- Dark mode is a primary design surface for dev tools, where one accent color and strict contrast matter more than the theme toggle
- AI-native dashboards are a big trend in 2026 that summarize and prioritize instead of making users build charts (already in the plans)

After using the following examples to design my frontend ([[UI Handwritten notes]]), I realized that some parts of the design seemed to not fit in with the envelope system, so I reread the book and I realized what i needed to do to fix these issues: [[Design Changes]]
# UI Examples:
- I used these links to find references to help me design the dashboard:
	- (https://muz.li/blog/best-dashboard-design-examples-inspirations-for-2026/)
	- https://www.925studios.co/blog/saas-dashboard-design-examples-2026


![[Pasted image 20260729151802.png]]The bars on the top left under activity look interesting, not sure if i'd do that for the envelopes. I was thinking more of a circle or half circle, similar to the overview on the right. Also, a calendar system sounds good, but a monthly one, since the envelopes are for each month.

![[Pasted image 20260729152044.png]]  
In both this and the last image, I like the little side tab, maybe that would be a good way to be able to navigate through the app. Also, the circle graph on the bottom looks really interesting! not sure if that's the best idea, for the envelopes, but it certainly looks cool.

![[Pasted image 20260729152220.png]]
The half circle on the bottom right looks exactly ilke what i initially imagined each envelope to look like. the spend amount graph also looks cool, i wonder if that's dynamic? Also, the top where it says Overview and this month, last month looks like it fits better than a calendar. 

![[Pasted image 20260729152457.png]]
I like the top left of this one, where it shows a dropdown for dates, a search button (not sure if that's even useful), a notification button (definitely something i should consider, give notifications for reminders or if you've gone over, etc.) also I like how you can see your user and a little image, that would be cool to implement at a later date

![[Pasted image 20260729152652.png]]
In this image, I like the top tab select where you can go between the dashboard and other pages. 

![[Pasted image 20260729152816.png]]
The bottom right budget breakdown looks very interesting, i guess in this image it's to track like how your spending looks like now to what it was before? the concept sounds useful, not sure if i'd go for the same look.

![[Pasted image 20260729153033.png]]
I like how the components are transparent. Also, I like the "just ask me anything" text box at the top, this is similar to how i want the language parser to be like.

![[Pasted image 20260729153810.png]]
The only thing that caught my attention here is the color scheme, i like the black/white/red. Looks nice but I'm not sure if this is what I'd want it to look like

