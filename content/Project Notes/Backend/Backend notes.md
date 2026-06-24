---
lastmod: 2026-06-23 15:14
date: 2026-06-22 22:00
---
now that I've setup the database, I'm going to start working on the backend. I'm using FastAPI, I already decided to use python for the backend, so FastAPI works perfectly fine for what I'm making

## Endpoints/Routes:
- A route/endpoint is a specific URL that an API exposes that does something. for example:
	- GET /transactions gives all transactions
	- POST /transactions creates a new transaction
	- DELETE /transactions/123 delete transaction with id 123
- Each of these is a separate endpoint. the frontend calls these URLs to interact with the database. it never touches the database directly for security reasons, only through these doors

## HTTP methods:
- These methods define the intent of a request from a frontend:
	- GET: read something, fetch data
	- POST: create something new
	- PUT/PATCH: update something existing
	- DELETE: delete something

## Request/Response Cycle:
- every interaction between the frontend and backend follows this cycle:
	1. frontend sends a request "i want all transactions for user 123"
	2. backend receives it, talks to database, processes result
	3. backend sends back a response, the data in JSON format, plus a status code
		- 200 Success
		- 201 created successfully
		- 400 bad request (sent something wrong)
		- 401 unauthorized (not logged in)
		- 404 not found
		- 500 server error

now i've installed FastAPI, and Uvicorn and was able to get a page running in the browser. 

- An origin is a combination of protocol, domain, and port.
- Normally, different origins are unable to communicate. you must allow this by having a list of "allowed origins"
- import CORSMiddleware to configure what origins are allowed, and specify whether the back end allows credentials, specific http methods, and specific http headers

More information on FastAPI, SQLAlchemy, and Pydantic. 
[[FastAPI, SQLAlchemy, and Pydantic]]

More information on Authentication
[[Authentication]]

More information on routes
[[Routes]]
