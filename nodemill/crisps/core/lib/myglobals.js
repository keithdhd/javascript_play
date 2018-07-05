/*
myglobals.js

how to use this file
====================
1. Copy this file from ./core/lib/myglobals.js to ./lib/myglobals.js
2. Change the contents of loadConfigs to add your own global stuff
3. It will then override the original file

Why this works:
===============
Any file in ./lib will take priority over the same file in ./core/lib
It will also be available as a require, so a file ./lib/mystuff can be accessed by mystuff=require('mystuff');
Just watch out for collisions with standard node_modules as they take priority over everything!

*/




exports.loadConfigs = function() {
  global._mydata = {test: 'test123'};
  global._myvar = 123;
}
