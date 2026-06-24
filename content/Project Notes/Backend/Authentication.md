---
lastmod: 2026-05-19 23:28
date: 2026-05-19 13:51
---
Now that I've setup the API, SQLAlchemy and Pydantic, now I'm working on the auth routes. 

a few things I researched:
- **JWT (JSON Web Tokens)** 
	- an open standard that defines a compact and self-contained way for securely tramsitting information between parties as a JSON object. this information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret or public/private key pair. 
	- This is useful for this project, as I can use these tokens for Authorization. once a user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
- **Hashing vs Encrypting**
	- Hashing and Encrypting are both important, so I wanted to learn the distinction between them. Basically, hashing is mainly used for when there's no reason to get the original information back, like a password. when a user inputs their password, we hash it because there's no reason why we'd ever want to return the original input, we just want to hash the user's input and check whether it matches the stored hashed password. Encryption is used when you do want to return the original value, say like someone's username or other info that's still sensitive, but that's reasonable to show to them. 
- **Authentication vs Authorization**
	- Authentication is verifying that user is who they say they are (handled by JWT login)
	- Authorization is verifying what said user has access to (checking user_id on every query, ensure user A doesn't get user B's info)

I also researched 2 modules that I imported for this project, passlib (allows the hashing of passwords) and python-jose (JWT)
