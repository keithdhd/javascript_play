'use strict';
var Alien = require('./alien.js');

class SandPerson extends Alien{
  constructor(name){
    super("Sand Person", name);
  }

  goCrazy(){
    console.log(this.name + " goes AAAAARRRGH!!!!");
  }
}

module.exports = SandPerson;