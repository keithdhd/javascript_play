# Practical Git

So we've been using git for a while and we're pretty comfortable with the basics right? We can:

- add stuff
- remove stuff
- commit stuff
- push stuff
- pull stuff

Allowing us to save our work somewhere safe and keep a record of what we have been doing.

What we haven't touched on, is the power of git when we are working with other people.  This is going to be super important when you are doing your group projects so we're going to have a look at this today.

## Branching

One of the key features of git is that it allows is to create "branches" of our code. 

You can think of this as streams of work, which start together then diverge and come back together again. Much like a river, it comes down from the mountain, splits if it hits a small island or piece of land, but then comes back together again and heads to the sea. 

A branch is **not** an independent piece of code that exists in isolation. The intention is always to bring it back to the main codebase at some point. We can have as many branches of code as we like.

### Master

So far we have always been using a branch called master. This is created for us as soon as we `init` a new git repo.

```
mkdir practical_git
cd practical_git

git init
```

Now that we have started our repo, we have to create our fantastic web app.

```
touch fantastic_web_app
git add .
git commit -m "initial commit"
```

This is where we normally keep our stable, deployable code that we'd be happy to put "live" at any time. "Live" could be on heroku, on a url you want to use to demo your project.

Now the problem comes if you want to add new features. If we do them on master, if we add anything that breaks the code, we can no longer deploy it to heroku in a working state. We can no longer share our code in a working state with others. This problem becomes exponentially worse with the more developers that are working on a project.

Imagine Alice, Bob and Charlie are working on a project together to build Tic Tac Toe. 

- Alice has decided she is going to do the board code 
- Bob is going to add user logins and 
- Charlie has decided that quantum tic tac toe is the key feature that needs done right now. 

Given we like to commit early and often, there will be lots of commits on master from everyone. What happens if Charlie commits something that breaks the site? And what if Bob and Alice do the same thing? How can we easily identify where the bug has come from? All we have is a jumble of commits. 

Even if Bob fixes his bug, the code is still broken until both Alice and Charlie fix their bugs. It's not ideal.  This is where the power of branching comes in.

### Develop

It's good practice to keep a shadow branch called "develop" where our in progress code lives, to keep master clean and deployable. We don't need to do this - we can have as many branches as we want called anything but it's good to start getting into good habits now rather than trying to iron out bad habits later.

Let's now create our "develop" branch. We want to be IN the branch that we want to create a stream from - in this case, we only have one choice: master. There's a special command we can do to achieve this - checkout. Checkout allows us to change the branch or stream of code we are working on, or create a new branch to move to.

```
git checkout -b develop
```
We need to provide the -b argument just this once because we are creating a new branch. You'll notice that the terminal has now changed and tells us that we are in the "develop" branch. Develop at this exact point in time has the same history as master, since it was copied from it. It is **not** linked to master in any other way - adding files to master will not alter develop and adding files to develop will not alter master. Let's see this in action.

```
git touch new_feature
git add .
git commit -m "add a cool new feature"
```

If we go back to master, will the new_feature be there?

```
git checkout master
```

Note that we don't need the -b argument - we are simply swapping between branches, not creating a new one.

It's gone! Is it lost forever? If we check our log, we can see no trace of the commit we just did.

```
git log
```

But it's cool, it's safely stored on our develop branch. Let's go back to develop and check our file is still there.

```
git checkout develop
```

There it is, safe and sound. Git has effectively cloned our master branch, with all of it's history and commits, and made a new copy of it for us. This is what we call a branch. We can do work on develop now 

- Alice could add her authentication
- Charlie can change the world with his quantum tic tac toe 
- and Bob can add the board. 

Even if develop is broken, master is still there safe and sound.

[i:] Get the students to add a new file on develop, then switch to master and check it's not there, then swap back again.

Note that if you have any unstaged files, they will teleport with you as you change branch so be careful of that.

[i:] They don't need to do this.

```
touch such_new_feature_wow
git checkout master
git checkout develop
rm such_new_feature_wow
```

Our commits on develop exist in a completely separate universe from our commits on master, until we decide we are ready to bring them together. We call this "merging".

## Merging

"Merging" is the act of bringing together the history of one branch with another and resolving them. Luckily, git does this for us pretty seamlessly most of the time.

Let's assume we are happy with what we have on develop. Bob and Charlie and Alice have all added new code and tested each other's work and it's all looking good. We want to merge this to master and deploy it to heroku as the new "live" version.

We checkout the branch that we want to merge IN to. In this case we are merging develop IN TO master.

```
git checkout master
git merge develop
```

You can see that our develop files now appear on master, and our commits have now magically appeared on master. Our merge was successful, hurrah!

[i:] Get the students to checkout their develop branch, add a file and merge it to master.

Awesome, so we've got 2 branches and we are happily merging them together. You'll notice that git is telling us that it is "fast forwarding". This means that nothing has happened on the branch we are merging IN to, since we branched away from it. So what happens if the branch changes?

```
git checkout develop
touch such_new_feature_wow
git add .
git commit -m "much commit"

git checkout master
touch bug_fixes
git add .
git commit -m "fixes those bugs"

```

Both our master and develop branches have changed. What is going to happen when we merge?

```
git merge develop
```

You'll see that sublime will pop up - we'll just close it for now (the default messge is fine) and git will say the merge was successful using the "recursive" strategy.

[i:] Draw this on the board

This means Git will check the directories in each branch and find out which files have differences compared to the base revision (the point at which we branched), and then use the one with changes. A new commit will be made to represent this process - we had the option of adding a message for this when the sublime window popped up a minute ago.

This is all awesome - but what if someone changes the same file on each branch? This is very common when you do a pull and other people are working on your branch - they have no idea what files you have been changing.

```
git checkout develop
touch conflict
subl conflict
# add the line "develop text"

git add .
git commit -m "adds conflict file on develop"
```

Let's now go do a similar thing on master.

```
git checkout master
touch conflict
subl conflict
# add the line "master text"

git add.
git commit -m "adds conflict file on master"
```

What do we think is going to happen when we merge in develop now?

In this situation where both have changes, the new file's contents are merged textually, and if there's a problem with that, a conflict ensues. Let's merge and see what happens.

```
git merge develop
```

Sure enough git is saying "I need some help" because it doesn't know what to do with the files. It needs a human touch. Git has told us which file has the problem, so we open it up we'll see something has happened to it.

Git has marked the version on our current branch (head) and the version on the merging branch and we can manually choose which version we want.

[i:] Get the students to try this themselves. Create the same file on develop and master, with different contents. Then merge develop into master.

There are many tools available that can help us merge, but that's a discussion for another day.

### Clean up

Note that after we have merged develop to master, we will also want to merge master to develop - incase there has been any changes done on master (which is fairly naughty).

```
git checkout develop
git merge master
```

Now develop and master are effectively the same as each other again.

We can view our branches by typing

```
git branch
```

## Feature branches

So that's all cool, we have 2 branches - one for our stable code and one for our developmental code. But we still have a problem.

Sometimes, we might want to make the code on develop viewable by a client, or in this case a team mate or instructor. Maybe we want to show off the latest feature we've been working on that isn't live yet.

So Charlie is all pumped, he's eager to show that he's completed his quantum tic tac toe... he deploys it to heroku on a test url (test.tictactoe.com or so) and... Bob has broken it. Bob has been add all sorts of styling, including some  my little pony javascript and it no longer works. Charlie has no idea what has caused it and Bob is out of the country sunning himself on a beach in the carribean. How can we avoid this situation?

It's helpful as developers to chunk up our tasks into self contained work packages. Bob is coding cheeseburgers and Alice is doing authentication with OAuth. Charlie has left the team and gone to work for Nasa.

We'd like develop to be a fairly stable representation of our "In progress" code. Maybe it's a new feature that we'd like our team mates to see and check, or maybe it's a different version of the css we are trying out. Either way we'd really like it if Bob didn't break the site with his cheeseburgers.

The answer to this is feature branches. Everytime you have a self contained piece of work to do, that might interfere with what other people are doing, you probably want a feature branch. Feature branches are also a great way to test out ideas that we can just throw away if we don't want to keep them.

So what does that look like? Let's make one.

We would always branch a feature off from develop since they are developmental code and will be rolled back in when we are happy with them. The convention is to call our branch feature/featurename. It's not a hard fast rule, but much like rest, it's a fairly standard thing to do.

```
git checkout develop
git checkout -b feature/cheeseburger
```

Cool so we have successfully made a feature branch. Let's add some files.

```
touch bread burger cheese
git add .
git commit -m "adds cheeseburger"
```

So we have our work all saved in our little branch. Another developer could come along and work on it with it and push it to github, without us ever polluting the fairly stableish code on develop. Which is cool, if Alice is wanting to demo his cool new OAuth feature to Charlie before he lets Bob test it.

We can have as many featur branches as we like, which can all be rolled into develop when we are ready. Let's merge this guy back in.

```
git checkout develop
git merge feature/cheeseburger
```

The key thing about feature branches is that we delete them when we are done with them. They now live in develop and any changes should just be small bug fixes.

```
git branch -D feature/cheeseburger
```
This will delete the branch both remotely and locally.

[i:] Get the class to make a feature branch, and merge it into develop the delete it.

Cool, so there's a couple of other tricks we have up our sleeves.

## Reverting

Let's create another wee feature branch, you are all experts at that now.

```
git checkout develop
git checkout -b feature/test

touch bad-indentation broken-functions missing-semicolons
git add .
git commit -m "adds really bad code"

touch syntax-errors bracket-hell single-letter-variable-names
git add .
git commit -m "adds even more rubbish code"
```

Cool so we have 2 commits now. Let's go merge this to develop.

```
git checkout develop
git merge feature/test
```

If you look at the log, you'll see both commit messages from the feature branch now appear on develop as we'd expect.

Now let's imagine that actually, our feature is not working as well as we thought and it's broken everything. Bob is **raging** since his pony feature was ready to be demoed in the afternoon. What do we do? 

```
git log
# get hash of merge commit
git revert -m 1 395b89962c77742d1d8bd8ad567ef5699764efc0
```

Although we have used the special -m flag to say this is a merge commit we are reverting, we can use revert on any hash to undo changes.

All of our changes from the feature branch are gone. We have a new commit and our history is totally preserved. This is a very safe way to undo changes.

There is another git concept called "resetting" which some of you may have used. Reset actually changes history and is very dangerous, especially if we have a remote branch. We can't easily reset our local code back to a point in time that is BEFORE our remote code. Github will tell us we are behind and need to do a pull when we try to push the changes.

Stick to reverting to keep yourself out of trouble.

## Stashing

One last thing. What do we do if we have started work, and need to swap to do a quick fix on master.

```
touch just-a-wee-thing-im-trying
subl just-a-wee-thing-im-trying
# add some text
```

Oh no, we've accidentally made changes on master that we intended for develop. We can use the handy "stash" command for this.

```
git stash
git checkout develop
git stash pop
```

Stash allows us to magically transport our changes to another branch.
