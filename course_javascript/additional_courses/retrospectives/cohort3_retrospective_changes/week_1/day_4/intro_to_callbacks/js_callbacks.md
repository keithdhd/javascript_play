# JS Callbacks

### Learning Objectives
- What is a callback
- How and why we can pass functions as arguments
- Why callbacks are useful
- How we can set the property of an object to be a callback and invoke it later in time

### What is a callback?

A callback is a function passed to another function. Huh?

Let's look at how we can do this.

Because functions are **first class objects** in JavaScript, they can be referenced by variables and passed around just like variables. So we can pass a function as an argument to another function.

### When are callbacks useful?

1. When we want to wait until a long-running process has completed.
2. We can keep our code in small functional blocks of code and pass them around.
3. Callbacks are a primary feature of event-driven programming and we'll see them A LOT when we look at JS in the browser next week. 

Let's create some callbacks. 

```
mkdir callbacks
cd callbacks
touch callbacks.js
```

Let's first create a function that is going to take a function as an argument

```
//callbacks.js

var doSomeMathsForMe = function(num, func){
  
}
```

So, nothing new there right? We've simply said, hey JavaScript, I'm declaring a function called doSomeMathsForMe and it's going to take two arguments when it's invoked.

But now, let's make use of the fact that we can call the func inside our doSomeMathsForMe function.

```
//callbacks.js

var doSomeMathsForMe = function(num, func){
  console.log( "Calculating result ....", func(num));
}
```

[i:] Step through this with students.

There are 2 ways we can make use of our doSomeMathsForMe function. 

1. Passing in a named function
2. Passing in an anonymous function

First, let's create a named function to pass in.

```
var increment = function(n) {
  return n + 1;
} 
```
Now the exciting bit! Let's invoke our doSomeMathsForMe function.

```
doSomeMathsForMe(5, increment);
```
Important NOTE: What do you notice about this last line of code?

We are NOT invoking the function when we pass it in. That is, we don't add the two brackets '()'. We are simply passing it in as a reference.

Exercise (5 mins): Create a 'square' function that returns a number multiplied by itself and pass it as an argument to doSomeMathsForMe.

As you can imagine, we could create lots of functions that we could pass in to doSomeMathsForMe. 

This keeps our code in nice small chunks and versatile.

### Passing in an anonymous function

We can also pass in an **anonymous** function. We'll see this pattern a lot in JavaScript.

```
doSomeMathsForMe(5, function(num) {
    return num - 1; 
})
```

### What we've learned
- What a callback is
- How and why we can pass functions as arguments
- Why callbacks are useful
- How we can set the property of an object to be a callback and invoke it later in time
- We've written our own callback
