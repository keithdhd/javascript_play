'use strict';
var Alien = require('./alien.js');


//Class inheritance
class Wookie extends Alien{
  constructor(name){
    super("Wookie", name);
  }
}

module.exports = Wookie;