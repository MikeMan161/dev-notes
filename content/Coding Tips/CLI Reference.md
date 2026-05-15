# Git: 
git status
git add .
git commit -m "message"
git push
git pull
git checkout -b branch-name
git checkout main
Alternative to checkout: switch
git switch branch-name
git switch -c feature/branch-name  # creates AND switches in one command
git remote -v
git push --set-upstream origin branch-name

# Uvicorn: 
uvicorn folder.file:(fastAPI instance variable in file) --reload (run uvicorn)

# Virtual Environment:
(while in folder) venv\scripts\activate
deactivate