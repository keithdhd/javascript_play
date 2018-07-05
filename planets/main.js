'use strict';

var Planet      = require('./planet.js')
var SolarSystem = require('./solar_system')
var Universe    = require('./universe.js')
var Galaxy      = require('./galaxy.js')
var Wookie      = require('./wookie.js')
var SandPerson  = require('./sandPerson.js')

var ourUniverse = new Universe();
var milkyWay    = new Galaxy("Milky Way");

console.log(Planet.randomNum);

ourUniverse.addGalaxy(milkyWay);

ourUniverse.getGalaxies().forEach(function(galaxy, index){
  console.log(index+1 + ". " + galaxy.name + " has " + galaxy.planets.length + " planets.");
});

// Differential inheritance
var mercury    = Object.create(Planet);
mercury.name   = "Mercury";
mercury.radius = 3940;

var venus    = Object.create(Planet);
venus.name   = "Venus";
venus.radius = 2940;

var earth    = Object.create(Planet);
earth.name   = "Earth";
earth.radius = 1940;

var mars    = Object.create(Planet);
mars.name   = "Mars";
mars.radius = 940;

var alderan    = Object.create(Planet);
alderan.name   = "Alderan";
alderan.radius = 3940;
alderan.explode = function(){
  console.log(this.getName() + " has gone BOOM!");
}

var solarSystem = new SolarSystem("Our Solar System");
solarSystem.addPlanet(mercury);

console.log(solarSystem);

alderan.explode();
// mercury.explode(); // fail

milkyWay.addPlanet(mercury);
milkyWay.addPlanet(venus);
milkyWay.addPlanet(earth);
milkyWay.addPlanet(mars);
milkyWay.addPlanet(alderan);

milkyWay.getPlanets().forEach(function(planet){
  console.log(planet.getName());
});

ourUniverse.getGalaxies().forEach(function(galaxy, index){
  console.log(index+1 + ". " + galaxy.name + " has " + galaxy.planets.length + " planets.");
  console.log(galaxy);
});

var chewie = new Wookie("Chewbacca");
var chukka = new Wookie("Chukka");
chewie.attack();
chukka.attack();

var sandy = new SandPerson("Sandy");
var tusks = new SandPerson("Tusks");
sandy.attack();
tusks.goCrazy();
