These are my notes for creating the database

so right now, we have 6 entities in this database:

User - this entity contains all info directly in reference to the user (name, userID, username, date created, hashed_password, email, currency, updated at)

Buckets - this entity relates to the user's general financial info, and the 4 buckets (userID, primary id, name, bucket_type, target percentage, alert_threshold, createdat)

categories - this entity relates to the kinds of transactions within each category, like rent, entertainment, etc. (primary id, userid, bucketid, name, is_default, created_at)

transactions- this stores the user's transaction history- (primary id, user_id, category_id, amount, descriptino, merchant, date, created at)

debts - this stores the user's debts, whether credit cards, loans, etc - (primary id, userid, name, currentbalance, apr, minimum payment, due_date, created_at)

income - this stores the user's income (primary id, userid, source, amount, frequency, createdat)cCa