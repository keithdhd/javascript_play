# Git Branches (Basic)

## Objectives
- Be able to create a branch
- Be able to delete a branch
- Be able to merge a branch

## Duration 
15 mins

# Intro

So far we have been using one "branch" master. It has it's own version history and code. Ideally, we'd like to be able to try stuff out without being in danger of breaking master - this is where branches come in.

It's dead easy. We can "branch" off from master, make an entirely new copy of the code with the existing history then add changes to it which exist only on it. Then when we are happy, we can merge it back to master with all the changes intact. Neat right?? 

If we don't want to merge a branch, then we can just delete it.

# Cheatsheet

```
//new branch
git checkout -b develop

//delete branch 
git branch -D develop

//merge branch (while on master)
git merge develop

```
