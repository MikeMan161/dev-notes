---
lastmod: 2026-08-07 17:19
date: 2026-08-07 17:05
---

I have an issue currently: the buckets.tsx page awaits four sequential PATCHes. If #3 fails, the first two are already committed as separate transactions. This leads to a state where the server holds a plan the user never approved. the page shows all four local edits, and the error message doesnt tell them which half landed. Also, a refetch can still fail after all four writes succeeded, so setError fires on a save that actually worked.

The fix here is to replace the PATCH with PUT. The user isn't allowed to change much about the buckets, just the target percentage and alert threshold of each. 

we make 2 classes in schemas: bucketAllocation which defines what we update for each one, and bucketplanupdate, which after we've done the mutations, it gets molded into a list of bucketallocations, which then in the frontend allows us to just display that list instead of having to refetch. 

In services, we make a update_bucket_plan functino that calls one query to get the users full bucket set, compare the payload's id against the set you just got from the query. if there's an unknown id, 404, if there's a missing one, 400 (which the bucvkets are seeded to only be 4 so not sure when this would trigger). then you acually use the PUT to change the values, commit. then put that through get_bucket_spending to get the actual values for the frontend. 

change the frontend updateBucket to PUT. also, it makes sense to delete the specific bucket patch, since now we update all 4 at once. 