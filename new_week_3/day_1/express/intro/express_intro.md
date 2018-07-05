# Express Intro

## Learning Objectives
- Understand how to run a tiny express server
- Understand how to define RESTful routes
- Understand the server.js file we have been using

# Duration
45 mins

# Intro

So we're finally going to get to grips the web framework behind those crazy server.js files we've been using! Whoot! But first, let's have a proper look at what is actually going on with Express and what problem it is trying to solve.

# Express

Node is just a runtime for JS, much like the Ruby interpreter. Out of the box, it doesn't listen to HTTP requests or send responses. Not every JS app is a webserver so it wouldn't make sense. Ruby was the same - we had to use Sinatra to achieve this. In the same vein, we use Express to achieve this with JS.

# Our first tiny webserver in JS

We're going to make a tiny webserver, much like we did with Sinatra.

```js
mkdir express_app
cd express_app
touch server.js
npm init
npm install --save express
```

Great, let's open up server.js and send our first web response.

```js
//server.js
var express = require('express');
var app = express();
```

We're immediately invoking our function that express provides, and stuffing it into a variable of our choosing. For convenience, we're calling it app to keep it nice and short.

Let's make a home route.

[Q:] Can anyone remember what symbol we use to represent the home route?

```js
app.get('/', function (req, res) { //NEW
  
});
```

Okay so let's have a look at what we have here. app is the object we get from express that is responsible for handling everything to do with our little server.

We are calling a get method on this object that has 2 arguments - a route and a callback to invoke when that route is matched. There are 2 parameters available on that callback - an object representing the request (req, but we could call this anything) and an object representing the response (res, again the name is up to us).

We use the res object to send responses.

```js
app.get('/', function (req, res) {
  res.json({ data: 'Sup!'}); //NEW
});
```

Note we can also use res.send() to send files, text content etc. We're sticking to json for now.

Lastly, we need to tell express what port it should be listening to for incoming requests. If you remember, our apps always have to run on a port and that's the url we need to use to interact with our app. We might have serveral apps running on different ports.

```js
app.listen(3000, function () {
  console.log('App running on port '+this.address().port);
});
```

And voila! Our first tiny web app! Isn't that cool?

## Nodemon

Now, if we try to change the text what happens? Yes, the change is not picked up! We need to install an additional little tool that will monitor for changes and restart the server (just like with Sinatra). We'll install this globally since it's not project specific.

```
npm install nodemon -g
```

Now we can run our app with 

```
nodemon server.js
```

Whenever we are working on server.js we'll use nodemon. If it's not changing, we can go back to npm start.

## Serving HTML

There's still a couple of missing pieces to get us to where we were in our server.js file. We're effectively making "one page apps" which start from an index.html. So how do we serve that up?

```
touch index.html
//index.html
<!DOCTYPE html>
<html>
<head>
  <title>App</title>
</head>
<body>
  <h1>Sup!</h1>
</body>
</html>
```

We're going to want some information about where that file is, so we need to require another little module that helps us out with the file system. This is something built into node that we can just use, it's nothing to do with express.

```js
var path = require('path');
```

Now we can use this to tell express where the file is, and serve it up as the homepage.

```js
// app.get('/', function (req, res) { //COMMENTED
//   res.json({ data: 'Sup!'});
// });

app.get('/', function (req, res) { //NEW
  res.sendFile(path.join(__dirname + '/index.html'));
});
```

__dirname is the path to the directory where the currently executing file is.

Whoot! And there is our HTML.

## The last piece of the puzzle

Okay let's add a little stylesheet
```js
touch style.css
//index.html
<link rel="stylesheet" href="style.css" />
```

When we reload, nothing shows. Infact, the css is a 404. Why? 

If you remember, we had to put these files into a "public" folder to say they were accessible by the site. Let's do that now.

```
mkdir public
mv style.css public
```

We still need to tell the server that this folder is viewable, so one last little change.

```js
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public')); //NEW
```
