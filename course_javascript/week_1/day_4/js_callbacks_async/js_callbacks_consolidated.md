# Callbacks and Higher Order Functions

### Learning Objectives
- Understand callbacks
- Understand higher order functions
- Understand functions as first class objects
- Passing functions as arguments

## Higher Order Functions

Higher-order functions either take a function as an argument or return a function as output. A callback is a function as an argument.

Because functions are *first class objects* in JavaScript, they can be referenced by variables and passed around just like variables.

Let's create a directory.

```
mkdir higher_order_functions
cd higher_order_functions
touch higher_order_functions.js
```

Here's an example of taking a function as an argument.
```
var myFunction = function(aFunction){
  aFunction(99);
};

var anotherFunction = function(number){
  console.log(number);
};

myFunction(anotherFunction);
```

[i]: Important to notice we pass in anotherFunction, not the return value
Why the hell would we want to do this?

## Sleeping

Sometimes we want something to run after a certain amount of time.  In some program languages there is a sleep function to do this.  It will sleep the active thread for that time and then continue.
eg Ruby
```
  sleep(10)
```

Javascript was designed for the web having one main thread.  Blocking this thread (sleeping) would stop any interaction with the application. For this reason Javascript does not have a sleep method.  So how do we get something to happen after a certain amount of time.

## SetTimeout

Javascript has a "non blocking, asynchronous" equivalent.  The setTimeout function.  This function that takes in another function and calls that function after a set period of time.

```
setTimeout(function() {
  console.log("I waited for 1 second");
}, 1000);
```


```
var thingWeWantToHappenLater = function(){
  console.log("I happened after a certain amount of time");
}
setTimeout(thingWeWantToHappenLater, 1000);
```

So here the first argument is the callback and the second is a value in milliseconds. setTimeout is a built in JavaScript function and we're using it here to illustrate how callbacks behave.

In the example above, the callback is an *anonymous* function. It has no name and is passed in at the same time that it is defined.

There are 2 ways to pass a function to another function:
1. An anonymous function
2. A named function


# Reading Files

In node a common task is to read files from the directory.  Node is also designed to be non-blocking. Designed to handle HTTP request don't want to block this.  Node has two different methods to handle reading files: a synchronous blocking version and a asynchronous non blocking one.  In practice the asynchronous version should be used,  but let's first look at the synchronous method first.



## Node File System Code Along

We're going to use the file system module that comes with node.js to practice our understanding of blocking and non-blocking code. Or asynchronous vs synchronous code (same thing really).

> Ask the class what the difference is between asynchronous and synchronous


*************************************************************************************

First let's write a little SYNCHRONOUS program that reads a file and prints out the number of newlines in the file (that's represented by the \n character)

> send students the us-states.txt

```
# terminal 

touch fileSync.js
subl fileSync.js
```

```
//fileSync.js

//tell node to give us a file system object
var fs = require('fs');

//A buffer is a temporary memory store for our data
var buffer = fs.readFileSync("us-states.txt");
var bufferString = buffer.toString();

var newLineCount = bufferString.split("\n").length;

console.log("There are " + newLineCount + " lines in the file");
console.log("Oh, you've finished reading the file.");
```

The readFileSync method is as the name suggests, SYNCHRONOUS. "Whaa? But node is meant to be asynchronous, you said so!"

Yes, but it also provides synchronous versions of some methods.

So in this example we call the readFileSync method but because it's synchronous, we have to wait until it's finished reading the file before we can continue.

That's why we have to wait until readFileSync has finished before we can run our console.log().

In this example it doesn't make a huge difference but if our file was much much bigger or perhaps somewhere miles away on the network, it might take quite a bit longer. We might be waiting a long time. Our process is said to be BLOCKED.

Now let's do it the node way.....

```
# terminal 

touch fileASync.js
subl fileASync.js
```

```
//fileASync.js

var fs = require('fs');

fs.readFile("us-states.txt", "utf-8", function(err, data) {
  if (err) {
    console.log("Uh oh! " + err);
  } else {
    var bufferString = data.toString();
    var newLineCount = bufferString.split("\n").length;
    console.log("There are " + newLineCount + " lines in the file");
    console.log("Oh, you've finished reading the file.");
  }
});

console.log("Oh, where has Oregon? She's gone to Oklahoma.");
```

There are four things to note here:

- The readFile method is taking a function as a parameter. It's a CALLBACK function!
- We can continue to execute the program and the block of code will execute when the file has been read. That's why we can console.log() out to the screen before printing out the length of the file.
- But the body of the callback is not run until the file has been read.
- The callback function itself takes 2 parameters. The first is an error object and the second the data or content that we're getting back from the method call.

## Callback Exercises

1. Write a function, *functionCaller*, that takes a function (myCallback) and a number as parameters. The *functionCaller* returns myCallback called with the number (as an argument).

2. **Maths Fun:** Write two functions *increment* and *square*. *increment* should take in a number and return the number plus 1. *square* should take in a number and return it multiplied by itself.

  Write another function called *doSomeMathsForMe* that takes in a number (*n*) and a function (a callback) and executes the callback, passing in *n* as an argument.

  Invoke *doSomeMathsForMe* by passing it a number and the *increment* and/or *square* function.

