---
lastmod: 2026-07-06 17:14
date: 2026-06-23 22:04
---
References:
https://fastapi.tiangolo.com/tutorial/bigger-applications/#an-example-file-structure

The reason we do a \_\_init\_\_.py file in each directory is to allow us to import code from one file to another. so you can do backend.schemas import bucket.py to import the module. When you put init.py in a directory, it converts everything into a python package, and when you put it in subdirectories it converts them into a python subpackages. so all the different files, like dependencies.py and routers/users.py are all separated in different files, but it's still part of the same fastapi app/web api (part fo the same python package). and i can create path operations for that module using apirouter. 

So for each file, you import API router:
from fastapi import APIRouter
router = APIRouter()

Then you can declare your path operations:
@router.get("/users", tags=\["users"])
async def read_users():
	return \[{"username": "Rick"}]
APIRouter is essentially a mini fastapi class

## How do Relative Imports work?
a .. import is a relative import. say we want to call a dependency in app/dependencies, while in a file in app/routers/items
if you use a single . in .dependencies, it would search for an imaginary dependencies file in the current package, which in this example is routers. if you use a double .. , then it would search in app/ and find the right module. essentially, the first dot tells the program to search the current directory, and each subsequent one brings the level up 1 directory. so one dot searches the current directory routers, 2 goes to app, 3 would go to an imaginary parent of that, etc. 

So now I'm creating the routes for each router file. Each file is inside of the FastAPI app, it's just common practice to separate them by each category. so we do the standard CRUD operations for each category, plus any other ones that may come up that are useful. Also, i have to remember that instead of a standard delete, some of the categories I want to have a soft delete so stuff like an accidental transaction deletion isnt permament. transactions, savings goals, income, and debts all have soft deletes. so, for transactions for examples, there will be these routes: create a new transaction, read all transactions, read one transaction, update a transaction, delete a transaction, and undo a deletion. the undo will likely be something like POST /transactions/{id}/restore. also, the user should have a way to see deleted transactions so they can restore them, so a get/transactions?deleted=true ot some kind of separate trash view. 

so here's the correct mental model for future reference:
- Standard CRUD = create, list, get-one, update, delete
- Soft-delete tables = add a restore route, their delete sets deleted_at instead of removing, and all reads filter deleted_at is null
- Hard-delete tables = do a real db.delete() and have no restore.
