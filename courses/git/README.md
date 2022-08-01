# GIT Version Control

## YouTube Video

[![Just Enough git tutorial youtube thumbnail](http://img.youtube.com/vi/EewCwhugJto/0.jpg)](http://www.youtube.com/watch?v=EewCwhugJto "Git for Professionals from 3 Tech Companies: (CLI+Github+Branching) | Just Enough Series")

## Commands

- `git init`: Intialize the repository
- `git status`: Checks the current directory changes and staging area
- `git add <directory>`: Add current files to staging
- `git commit -m "<commit-message>"`: Commit staging with a message
- `git commit -am "<commit-message>"`: Add & Commit staging with a message (only for edited and deleted)
- `git log --oneline`: Prints the log as one line
- `git reflog`: Shows the log of changing the HEAD. It's useful to find missing commits.
- `git branch <branch-name>`: Create a new branch
- `git checkout <branch-name>`: Checkout to a branch
- `git checkout -b <branch-name>`: Create and checkout to a branch
- `git diff <commit-hash-source> <commit-hash-destination>`: Shows the difference between two commits
- `git merge <branch-name>`: Merge a branch into the current branch
- `git merge --squash <branch-name>`: Merge a branch into the current branch as single commit
- `git branch -D <branch-name>`: Delete a branch
- `git rebase <branch-name>`: Rebase the current branch on another branch
- `git rebase <branch-name> -i`: Rebase the current branch on another branch (with interactive mode)
- `git cherry-pick <commit>`: Apply changes for a certain commit to the current branch
- `git reset --hard <commit-hash>`: Move the branch Head to a certain commit
- `git mv <source> <destination>`: Move a file/directory from one place to another while tracking
- `git remote add <name> <repository-name>`: Add a remote tracking branch
- `git push --set-upstream origin <branch-name> <repository-name>`: Set a remote for a bracnh
- `git push -u origin <branch-name> <repository-name>`: Set a remote for a brach (Same to the above one)
- `git push`: Push local commits
- `git fetch`: Fetch commits from origin
- `git pull`: Fetch commits and merge
- `git fetch --prune`: Removes and branches that no longer exists on remote before fetching
- `git remote prune origin`: Remove branches from local repository that no longer in remote

## Collaboration

### Pull Request

We need merge to master locally but rather we push the branch and create a Pull Request/Merge Request.

Other developers will review your changes and add comments.

When all is resolved and approved, you can merge your changes.

### Merge Conflicts

Merge conflicts happen when git can't merge two branches. It's always 99% to happen if a file is changed on the same line in two different branches, that's when git can't decide how to merge.

To resolve it, it has to be done manually and you will need to check the git log to find the developer responsible for the conflict and align with them.

### Branching Strategies

#### Single Branch

Create a single main branch and push all your commits there.

Good for personal projects.

#### Feature Branching

We have a single branch and each time there is a feature/bug, we create a new branch, do the changes and then merge back to main branch.

#### GIT Flow

We have two branches develop and main.

When creating a feature/bugfix, we create a feature branch from develop. Changes are merged back to develop.

When creating a hotfix, we create a feature branch from main. Changes are tagged with a version and only merged back to develop (if needed).

We can only merge develop into master and we need to tag the commit with a release version.

[Gitflow Workflow from Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
