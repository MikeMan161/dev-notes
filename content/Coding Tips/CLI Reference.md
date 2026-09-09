---
lastmod: 2026-09-08 13:37
date: 2026-07-07 22:00
---
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
git diff (path to file) shows differences between committed version and current version

# If you need to restore a file to how it was in the last commit:
git checkout -- (path to file) would restore that file.

# Uvicorn: 
**Make sure to start venv before, and be in the backend folder**
uvicorn folder.file:(fastAPI instance variable in file) --reload (run uvicorn)

# Virtual Environment:
(while in folder) venv\scripts\activate
deactivate

