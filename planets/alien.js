'use strict';

class Alien{
  constructor(race, name){
    this.name = name;
    this.race = race;
  }  
}

Alien.prototype.attack = function(){
  console.log("Alien attack by a " + this.race + " called " + this.name + "!!");
}

module.exports = Alien;