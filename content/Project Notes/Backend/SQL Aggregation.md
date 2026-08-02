---
lastmod: 2026-08-01 16:42
date: 2026-08-01 13:10
---
As stated in my to review list, i came across an issue when making the dashboard on the frontend: I don't actually calculate anything with transactions, income, and the buckets. The whole point of this system is to take your income, split it into envelopes, then be able to track your spending with the transactions you enter, but at the moment all these pieces are disconnected. 

Here's the normal SQL i would write to get the transactions per bucket:

SELECT bucket_id, SUM(amount)
FROM transactions
JOIN categories ON transactions.category_id = category.id
where transaction.date >= (current month)
GROUP BY bucket_id

translating to SQLAlchemy, you get this:

db.query(Categories.bucket_id, func.sum(Transactions.amount).label("spent")) \
.join(Categories, Transactions.category_id == Categories.id) \
.filter(Transactions.user_id == current_user.id, Transactions.transaction_date >= start) \
.group_by(Categories.bucket_id) \
.all()