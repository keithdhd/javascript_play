#Webpack

##Learning Objectives
- Explain why we might use a module bundlers
- Demonstrate using webpack to bundle up a package for the browser

We we're writing nice test driven javascript in separate files in week 1.  Think record shop.  However this all seemed to be lost when doing stuff in the browser. Spaghetti Javascript is a very common sight due to this.  

We also saw how we can split our project into multiple files in the browser, but this got ugly with having to load the files in the right order.

Wouldn't it be nice if we could write our program like we did in node, requiring files, with test etc, and then use them in the browser?

Well guess what we can.  What we need is a module bundler.

Module bundlers allow us to take multiple files and bundle them into a single file for the browser.  Browserify and Webpack are the most popular.

They alloww us to write our programs like we did using node, using commonJS to require files,  and the bundle it up making a single file for the browser with all our program.  Webpack, packing it up for the web


We'll make a little browser application to use our water bottle.

#Set up
We are now going to make a folder which will contain all our client code. We will then use webpack to use the files in here to bundle it up.

```
  mkdir water_bottle_app
  mkdir client
  cd client
  mkdir build
  mkdir src
```

Build is where the bundled up version is going to go, in src we are going to write our program.

Let's put the water bottle logic into our client folder. We can check this is all running fine.

```
  mocha specs
```

Now we can think about the browser user interface for our water bottle.  To start we just want to log the water bottle.
```
touch app.js
```

```
  var waterBottle = require('./water_bottle/water_bottle.js')
  window.onload = function(){
    console.log('App created from webpack', waterbottle.volume);
  };
```

Now we want to bundle up our code into one file, in the way that the browser likes!


##Webpack

```
  npm install -g webpack
  webpack
```

Now webpack is installed we can tell it to bundle up a package for us using the webpack command.

```
  webpack
```

We need to give it some information about how to bundle it up. We need to create a
webpack.config.js file

```
  touch webpack.config.js

  config = {
    entry: "./src/app.js",
    output: {
      filename: "bundle.js",
      path: "./build"
    },
  }

  module.exports = config;
```

Now if we run webpack we should see a bundled up file created for us!

```
  webpack
```

Check bundle

Annoying having to run command each time.
```
webpack -w
```
Will listen to changes and update bundle. Cool.  We have a dynamically updating bundle.


Task:  What does webpack -p do.
```
webpack -p
```

We have a file being created that we can use now we want to serve it up to the browser!

##Creating a server to deliver our program.

Let's make a file to serve up our program.

```
  touch server.js
```

Hand this out.  I'll pass out the code to serve this out.  Just what we've seen before.  But it will look for the code in the client folder.

```
  var express = require('express');
  var app = express();
  var path = require('path')

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  app.use(express.static('client/build'));


  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
```


There are ways to get Webpack to generate a html file for us, but it's fine for us to create it ourselves.

## UI Interface for bottle.
```
//client/build/index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Startpoint</title>
    <link rel='stylesheet' type='text/css' href='main.css'>
    <script src='bundle.js'></script>
  </head>
  <body>
    <h1> Water Bottle </h1>
    <h4 id="volume"></h4>
    <button id="drink"> Drink </button>
    <button id='refil'> Refill </button>
  </body>
</html>
```

If we run our server we should see our.
Logic to make water bottle work.

```
src/app.js
var waterBottle = require('./water_bottle/water_bottle.js')

var displayVolume = function(){
  var volumeDisplay = document.getElementById('volume');
  volumeDisplay.innerText = waterBottle.volume;
}

window.onload = function(){
  displayVolume();

  var refillButton = document.getElementById('refill');

  refillButton.onclick = function(){
    waterBottle.fill();
    displayVolume();
  }

  var drinkButton = document.getElementById('drink');

  drinkButton.onclick = function(){
    waterBottle.drink();
    displayVolume();
  }
};
```



##Source Map
We are working with one file, bundle.js.  So this is what the browser is showing in our console.  This can make debugging confusing.  Webpack provides an easy solution for this by providing a source map.
```
//webpack.config.js
config = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  devtool: 'source-map'
}

module.exports = config;
```

restarting webpack will show the file that the code was written in.

```
webpack -w
```
##Libraries
Show using Lodash.
We can load libraries easily into our libraries.

First we install it.
npm install lodash

And then we can require them in our files.
var _ = require('lodash');

NPM gives us a lot of libraries.
Over 3 billion download in the last month!
We'll see later how we can create our own NPM modules.


##Summary
A module bundler allows us to write our code in small files requiring each other. We can write our business logic in separate files, have them tested and require them in our bundle. We can do the same with external libraries.  It can help a lot in structure our front end applications.
