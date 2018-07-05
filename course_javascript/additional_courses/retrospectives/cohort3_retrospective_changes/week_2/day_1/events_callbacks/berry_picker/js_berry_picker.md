# JS Berry Picker Codealong

## Why Are We Doing This?
- This is a common pattern that we'll see a lot in JavaScript browser programming. We're practicing it here to get familiar with it.

## Learning Objectives
- Implement an event handling pattern we'll see a lot in the browser

### Duration: 1 hour

### Setting a Callback as an Event Listener

[i]:SEND OUT STARTING POINT

Let's create our JS app file.

```
touch public/app.js
```
QUESTION: What's the frist thing we need to do in our app.js? 
Remember our window.onload? We assigned it a function to execute when the DOM has loaded. All of our functionality will waterfall from here.

```
//app.js

window.onload = function{
  console.log("DOM has loaded");
}

```

Well when we do AJAX tomorrow, we'll see a similar pattern. Let's practice it to get it clear.

Let's start our waterfall. We'll create a main entry point function for out app.

```
//app.js
window.onload = function() {
  console.log("DOM has loaded");
  main();
}

function main(){
  
}
```
Let's create a berryPicker object. It will have a method on it called pickBerries.

```
//app.js

function main(){
  var berryPicker = {
    pickBerries: function() {
      console.log('I am picking berries. I may be some time.');
    } 
  }
}
```

Ok great. We have a berryPicker who we can tell to pick berries.

As programmers, we want to tell the berryPicker to make some jam once she's picked the berries. We'll design our berryPicker so that we can give it a function (a callback) to execute once the berries have been picked.

So let's add a property to our berryPicker that we can assign a function to. We'll call it onPickBerries and initially it will be null.

```
//app.js

var berryPicker = {
  pickBerries: function() {
    console.log('I am picking berries. I may be some time.');
  },
  onPickBerries: null  //NEW
}
```

Now let's simulate a long process using the setTimeout function in JavaScript. This is a bit artificial but it illustrates the point.

We'll also check to see if onPickBerries is a function before trying to invoke it.  

```
//berry_picker.js

var berryPicker = {
  pickBerries: function() {
    console.log('I am picking berries. I may be some time.');
 
    setTimeout(function() { //NEW
      if (typeof this.onPickBerries === "function"){ //NEW
        this.onPickBerries(); //NEW
      }
    }.bind(this), 2000) //NEW

  },
  onPickBerries: null  
}
```

We need to bind *this* so that we can call our onPickBerries method.

But wait! onPickBerries is null. We can't run it as a function! 

Right, but we can create a function and assign it to onPickBerries. Let's create a couple of functions that we can use once the berries have been picked.

```
//app.js

var squashBerries = function() {
  console.log('squash, squash, squash them berries');
}

var makeJam = function() {
  squashBerries();
  console.log('make jam');
}
```
And now for the magic bit. We are going to assign the makeJam function to onPickBerries! 

```
//app.js
//inside main function

berryPicker.onPickBerries = makeJam;
```

And finally, we can invoke our pickBerries function and it will run our callback (onPickBerries) once it's finished picking.

```
//app.js

berryPicker.pickBerries();
```

So the berryPicker is listening our for completion of the picking and is going to invoke whatever we've assigned to onPickBerries. 

Say we wanted a different behaviour.

```
//app.js

var eatBerries = function() {
  console.log("I'm eating all the berries");
}

//inside main function
berryPicker.onPickBerries = eatBerries;
```

This is a common pattern that we'll see a lot in the browser. It's event based. Our programs sit and listen and when an event happens (button click, the window loading the HTML document, a select box changing) it will run a function that we have assigned to it. This is when callbacks become really useful.
