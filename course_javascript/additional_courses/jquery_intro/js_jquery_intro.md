# Intro to jQuery

### Learning Objectives
- Understand what jQuery is
- Understand what jQuery is used for
- Understand the drawbacks of jQuery
- Manipulating the DOM with jQuery
- Adding event listeners
- Doing an AJAX call

## What is jQuery?

jQuery is a JavaScript library that gives us an API for tasks like traversing the DOM, handling events (like button clicks) and AJAX (along with lots of other methods!).

The [documentation](https://jquery.com/) for jQuery is pretty good.

jQuery IS JUST JAVASCRIPT. Look, [here's the code](http://james.padolsey.com/jquery/).

- jQuery is just JavaScript
- jQuery is just JavaScript
- jQuery is just JavaScript

In fact, you [might not even need jQuery](http://youmightnotneedjquery.com/). You can do most of the things that jQuery does with HTML 5 natively. 

Native methods are usually faster and we often end up using a fraction of the jQuery library but including the whole thing in our app.

From the docs: *The most basic concept of jQuery is to "select some elements and do something with them."*

Let's have a go at some jQuery.

```
mkdir jquery_intro
cd jquery_intro
touch index.html
touch app.js
```

Let's add some boiler-plate HTML and include the scripts.

We're going to use the Google Content Devlivery Network to get our jQuery script. If someone has already downloaded it from here into their browser, our browser will find it in the cache instead of going to get it. 

This gives us a faster loading time.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Let's Try jQuery</title>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script type="text/javascript" src="app.js"></script>
</head>
<body>

</body>
</html>
```

And let's add some elements that we can play with:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Let's Try jQuery</title>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script type="text/javascript" src="app.js"></script>
</head>
<body>
  
  <section id="conversation">
    <p class="dave"></p>
    <p class="hal"></p>
    <p class="dave"></p>
    <p class="hal"></p>
  </section>
  
 </body>
</html>
```

And let's right-click in Sublime and choose ***open in browser.***

If you type '$' into the Chrome console you should see a function. This means we have jQuery installed. Typing 'jQuery' will give us the same result. We can see that it's a function.

The $ is just an alias. We can imagine the jQuery code looking something like this:

```js
window.$ = jQuery;
```

And let's create our first jQuery object.

```js
//app.js

window.onload = function() {
	var $conversation = $("#conversation");
	console.log($conversation);
	
	//for comparison, create a native DOM element
	var nativeElement = document.querySelector("#conversation");
	console.log(nativeElement);
}
```

If we console.log our $conversation variable, and look at it's prototype, we'll see that it has a big bunch of jQuery methods.

When we use the $ function, jQuery returns a jQuery object, NOT a DOM element.

## jQuery Selectors

### Selecting by ID
We've already selected our #conversation object by ID. Let's use the css method. And the width method.

```js
$conversation.css({
  "background-color": "tomato",
  "padding": "10px",
  "color": "wheat"
});
  
$conversation.width("400px"); 
```

### Selecting by Element

```js
var $pTags = $("p");
```
Will give us all the p tags.

### Selecting by Class

```js
$(".dave").css({
  "background-color": "grey",
  "padding": "5px"
});

$(".hal").css({
  "background-color": "coral",
  "padding": "5px"
});
```

### Compound CSS Selectors

```js
$("#conversation .dave").html("This is Dave");
$("#conversation .hal").html("This is Hal");
```

### Psuedo Selectors

To get the first instance of an element in the DOM we can use the :first pseudo-selector.

```js
$("#conversation .dave:first").html("<i>Hello, HAL. Do you read me, HAL?</i>");
$("#conversation .hal:first").html("<i>Affirmative, Dave. I read you.</i>");
```
To get the last child, we could use the :last selector. Or we can reference it as part of a zero based array. Just to illustrate:

```js
$("#conversation .dave:last").html("<i>Open the pod bay doors, HAL.</i>");
$("#conversation .hal").eq(1).html("<i>I'm sorry, Dave. I'm afraid I can't do that.</i>");
```

### Some other selector methods

- [.parent()](https://api.jquery.com/parent/)
- [.children()](https://api.jquery.com/children/)
- [.siblings()](https://api.jquery.com/siblings/)
- [.next()](https://api.jquery.com/next/)
- [.prev()](https://api.jquery.com/prev/)
- [.find()](https://api.jquery.com/find/)

## Event Handlers
We can attach events to a set of elements with the jQuery .on method.

Let's attach a click event to our paragraph elements and do a crazy fadeOut using the jQuery fadeOut method.

```js
$('p').on("click", function() {
  $(this).fadeOut();
});
```
NOTE: **this** inside the callback is a native DOM element so in order to use jQuery methods, we have to wrap it in $() to create a jQuery object.


## AJAX
jQuery gives us an .ajax() method to make ajax calls. Let's do a simple AJAX call and display some data. First let's add a bit of HTML - a button and a couple of divs.

```html
<button id="get-details">Get Movie Details</button>

<div id="movie-data"></div>

<div id="notification-bar"></div>
```
And let's attach an event to the button to make an AJAX call.

```js
$('#get-details').on("click", function() {
  
  $.ajax("http://www.omdbapi.com/?t=2001&y=&plot=short&r=json", {
     success: function(data) {
      $('#movie-data').html(
          "<h1>" + data.Title + "</h1>" + 
          "<h2>" + data.Released + "</h2>" +
          "<h3>" + data.Awards + "</h3>"
        );
     },
     error: function(error) {
        $('#notification-bar').text('An error occurred:');
     }
  });

});
```

The [docs](http://api.jquery.com/jquery.ajax/) for AJAX are quite comprehensive.

## Conventions

One of the conventions when using jQuery is to name all jQuery variables with a '$' prefix. Unfortunately, we're humans and sometimes conventions are not strictly followed! 

Added to this, we can wrap native elements in the $() brackets which turns them in to jQuery objects.  

## Potential Drawbacks of jQuery

Often we'll need to use both jQuery and native objects in our code. This can become confusing! Is this a jQuery object or not? 

Sometimes this leads to developers wrapping ***all*** their variables in jQuery just to make sure!

If you get a code test that has to manipulate the DOM in JS, it's likely that they will ask you not to use any libraries. That includes jQuery! Don't rely on it.

## What we've learned

- What jQuery is
- What it is used for
- Selecting DOM elements 
- Event handlers
- Making an AJAX call
- Some drawbacks of jQuery 




















