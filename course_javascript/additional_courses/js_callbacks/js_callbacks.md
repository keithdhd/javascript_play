# JavaScript Callbacks
## Learning Objectives

- Understand callbacks and higher-order functions
- Introduction to a little functional programming
- Write a function that takes a function as an argument
- Write your own callback function
- Understand why they are useful


## Intro
Callback is the name given to a function in JavaScript that is passed to another function and can then be executed in that other function. Eh?? Well, in JavaScript and some other languages, a function is really an object and can be passed around just like any other object or variable. Another way to say this is that functions are **first-class objects**. 

Callbacks are a cornerstone of a way of programming called **functional programming** which is very different from the Object Orientated style we have been looking at - you can go and read about it if you are interested ;)

[http://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/](http://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/)

You'll see callback functions almost everywhere in JavaScript so it's important to understand them. 

They are particaularly useful for tasks that can take a while (in computer terms) like HTTP calls or reading files.

## Our First Callback

```js
var myPerson = {
  gatherBerries: function(success) {
    console.log('Gather berries people');
    var berries = 'blueberries';
    success(berries);
  }
};
var makeJam = function(berries) {
  console.log('making lovely jam from' + berries);
};

myPerson.gatherBerries(makeJam);

```

## Callback Example

Let's look at a common loop in JavaScript and see how it uses a callback. Let's check the docs to see what forEach requires.

[MDN forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```js
var guitars = ["Gretsch", "Gibson", "Martin"];
guitars.forEach(function() {});
```
This code won't do much so let's put a simple console.log inside the function to see what's happening.

```js
guitars.forEach(function() {
  console.log("A guitar!");
});
```
What do you think we'll see printed to the screen here? Here we're passing an ***anonymous function*** to forEach.

Let's make it more useful.

```js
guitars.forEach(function(guitar, index) {
  console.log(index + " " + guitar);
})
```

Where does guitar and index come from? They are passed by the forEach function but we can call them anything we like. Just like we did with a map function on a Hash in Ruby.

We can pull our function out and give it it's own name, then we can use this to pass to the forEach. 

```js
function guitarLooper(guitar, index) {
  console.log(index + " " + guitar);
}

guitars.forEach(guitarLooper);
```

Nice eh? Here we're using a ***named function***. A named function is the opposite of an ***anonymous function***. When we passed the function itself to the foreach, it was anonymous. By pulling it out and passing it to the forEach, it became named. 

Notice that when we pass the function guitarLooper into forEach we don't use the brackets (). Why do you think this is?

Well, we don't want it to execute immediatley. We want our function to be "called back" inside forEach.

#  Why use a callback?

- Do not repeat code (DRY—Do Not Repeat Yourself)
- Create generic functions that are versatile
- Improves maintainability
- Can make code more readable
- Do specialised things in callback functions.  

# Common Callback Example

A very common example of a function that takes a callback is setTimeout.

```js
setTimeout(function() {
  console.log("waiting");
}, 20000);
```

This will wait 20 seconds then print the message "waiting" to the terminal.

You might want to remember this for the lab... ;)

# Code Along
Let's write some code.

```
# terminal
subl explodingPlanets.js
```
We're going to create a planet "class" just like we would in Ruby, which knows some interesting things about it's state that we can play with.

```js
// explodingPlanets.js

function Planet(name) {
  this.name = name;

  this.getName = function() {
    return this.name;
  };
}
```

We can now use this to instantiate some new planets!

```js
var mercury = new Planet("Mercury");
var venus   = new Planet("Venus");
var alderan = new Planet("Alderan");
```

Since planets are all related, we want to group them together into a collection so we can do some fun stuff to them.

```js
var planets = [mercury, venus, alderan];
```

Let's imagine we want to be able to blow up all of the planets we have, much like we were in a Death Star. If you remember, our forEach allows us to do something to every element in our array and we can use a callback to tell it what that something should be. 

Let's make our callback function.

```js
function explode(planet) {
  console.log(planet.getName() + " goes Boom!");
}
```

Now we've got that, we need a little helper function that will marry up the thing we want to do to our planets with our little set of planets.

```js
function planetsWrapper(planets, myCallback) {
  planets.forEach(myCallback);
}
```

We can run this now and destory all the things. Muhahah.

```js
planetsWrapper(planets, explode);
```
Cool, so what if we want to do something else interesting to our planets, like add inhabitants and colonise it.

We need to alter our planet so that it can hold people and we can add people.

[i:] Give the students 5 minutes to think about this then ask for a volunteer to demo

```js
function Planet(name) {
  this.name = name;
  this.inhabitants = [];
  
  this.getName = function() {
    return this.name;
  }
  
  this.addInhabitant = function(name) {
     this.inhabitants.push(name);
  }
}

```

Now have a think about our planetsWrapper function. Is there a way that we could reuse this but instead of exploding planets, how would we colonise them? You might want more than one person on your planet... ;)

```js
function colonise(planet) {
  for(var i = 0; i<100;i++) {
    planet.addInhabitant("Keith");
  }
}

// Colonise planet
planetsWrapper(planets, colonise);

```

```
node explodingPlanets.js
```
