---
lastmod: 2026-07-08 17:29
date: 2026-07-08 15:26
---
- to do: must go back and implement business-rule validation across all schemas. things like valid ranges and allowed values.
- double check the FK-ownership in transactions.py create and update, verify that category_id exists and belongs to current_user.id, raising 404 if not. no client-supplied FK should ever reach db.commit() unverified. In the docs, I was testing creating a new transaction, and i accidentally added a bucket id where it should have been a category id, and i got a 500 error, internal server error. my code did not catch that the category id was incorrect, it kept working up until db.commit(), and the database flagged it as not being correct, and crashed. i should verify that, that's a security error. 