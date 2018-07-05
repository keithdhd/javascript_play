var planet = require('./planet').planet;
var rn = require('./planet').randomNum;
var SolarSystem = require('./solarSystem');

var mercury = Object.create(planet);
mercury.name = "Mercury";
mercury.radius = 20;

var solarSystem = new SolarSystem("Sol");
solarSystem.addPlanet(mercury);

console.log(solarSystem);
























