## Enumeration

## Intro

Say we want to print to screen the value of an array.

```
  var testArray = [1,2,3,4]

  for (var item of testArray) {
    console.log(item)
  }
```
## Enumeration
We have seen using 'each' and 'map' as a way of looping over arrays. Using this technique we describe what we want to do to each element of an array. In Ruby we could tell our enumerators what to do with each element using a block passed in between curly braces. 

In Javascript we can do this by passing in a function as a callback.  Let's see an example

```
  var testArray = [1,2,3,4]

  testArray.forEach(function(number) {
    console.log('the number is', number);
  })
```

forEach is a method on our array.  We have passed in another function to tell it what to do to each element in the array.  We have passed a function into a function.  forEach is a 'higher order function'.


We can pull out the function to a variable and pass that in as an argument for forEach: 

```
  var testArray = [1,2,3,4]

  var printNumber = function(number) {
    console.log('the number is', number);
  }

  testArray.forEach(printNumber);
```

## Writing our own forEach
> Let class do as exercise if going well.

To really understand what a forEach is doing, we can write our own.

```
  var ourForEach = function(array, callOnItem) {
    for (var item of array) {
      callOnItem(item);
    }
  };

  var testArray = [1, 2, 3, 4];

  ourForEach(testArray, function(item) {
    console.log('the item', item);
  });
```

## this in functions being called back.
Let's write a function to try and sum up the values and store it to an instance variable.

```
  var Bank = function() {
    this.accounts = [100,200,300,400];
    this.total = 0
  }

  Bank.prototype = {
    setTotal: function() {
      this.total = 0;
      this.accounts.forEach(function(account) {
        this.total += account;
      });
    }
  }

  var b = new Bank();
  console.log('b total', b.total)

  b.setTotal();

  console.log('total after', b.total)

```

What happened here?  Inside the iterator function, we are trying to add to the total of the bank, using this.total += account.

This looks alright.  However,  inside this iterator function,  *this* is no longer the bank, it is the global object.  We can check what *this* is by printing it out in the console:

```
setTotal: function() {
  this.total = 0;
  this.accounts.forEach(function(account) {
    this.total += account;
    console.log(this);
  });
}
```

Here we can see that *this* is actually the global node object. In the browser, it will be the window object.

Inside of callback to enforce and be certain of what *this* is, we have to use some tricks.

How can we solve this?

## bind
> Hard topic, put importance on applying

We can call the .bind() function on a function. (Whaaaaat) - remember, functions are objects in JS, we can simply call methods on them. This .bind() function binds the function to the argument we pass in for it.

```
Bank.prototype = {
  setTotal: function() {
    this.total = 0;
    this.accounts.forEach(function(account) {
      this.total += account
    }.bind(this));
  }
}
```

Now inside our iterator this is what we want it to be.  Whenever using an iterator function in an object method and wanting to use this we should bind it, to ensure we get it out.

## Using enumerable methods

Using enumerable methods rather than looping is becoming more and more popular in the Javascript community.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[task]  Identify which enumerable methods.  Talk about when they do.

forEach
map
filter
find
every
some
reduce

Learning to solve problems using combination of these methods


## Enumerable Lab

Create Bank using enumerable methods.

Bank should be able to:  

- Add an account
- Find account by name owner name.
- Find the largest account.
- Find the total account value.
- Find the average value.
- Find the total value for an account type.

<!-- Further:  Write our own map, using forEach -->

<!-- Each is the cornerstone of the enumerable methods. Others can be written from it.
```
  var ourMap = function(testArray, transformItem){
    var mappedArray = [];
    _.forEach(testArray, function(item) {
      mappedArray.push( transformItem(item) )
    })
    return mappedArray;
  }

  var t = ourMap(myArray, function(item) {
    return item * 2;
  })

  console.log(t);
``` -->
