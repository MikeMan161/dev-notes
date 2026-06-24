I did a lot of researching within the FastAPI docs, and I learned a lot. Dependencies, Sessions, Engines, and I also learned about the other tools I'll be using for the backend: SQLAlchemy and Pydantic.

- Pydantic is a gatekeeper on both ends of the flow. it controls what comes in and out
- SQLAlchemy is a translator, that converts between python objects and SQL
- Routes are the orchestrator. receives validated input from pydantic, calls SQLAlchemy, returns shaped output.

Here is the flow currently:
1. Frontend sends request
2. FastAPI router receives it
3. Pydantic validates the incoming data shape
4. route handler runs business logic
5. SQLAlchemy translates Python to SQL and then hits PostgreSQL
6. PostgreSQL returns data
7. SQLAlchemy turns it back into a python object
8. Pydantic shapes it into the response format
9. FastAPI sends JSON back to frontend

In this architecture, SQLAlchemy is what keeps track of the database tables, essentially mirroring them so that the request can interact through the data using the models. 
- the models are essentially mirrors of the database tables. I create them so that SQL alchemy knows the fields of the tables and relationships, so it can know how to translate between python objects and PostgreSQL rows. 
- each class inherits from base so SQLAlchemy registers it as a table. 
- columns are defined so SQLAlchemy knows the structure. 
- relationships are also defined with back_populates, so it can navigate between related tables in both directions. 

Pydantic is essentially used to validate that the incoming data matches the schema. if something is missing, like an email, it rejects before it touches the database. this also applies for after the request comes back from the database. it converts it to a userreturns schema, stripping out sensitive fields like hashed_password that shouldnt leave the server.