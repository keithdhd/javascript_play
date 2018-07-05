//Create a Planet 'class'
function Planet(name){
  this.name = name;
  this.inhabitants = [];

  this.getName = function(){
    return this.name;
  }

  this.addInhabitant = function(name){
    this.inhabitants.push(name);
  }
}

//Let's make some new planets!
var mercury = new Planet("Mercury");
var venus   = new Planet("Venus");
var alderan = new Planet("Alderan");

//Add them to an array of planets
var planets = [mercury, venus, alderan];

//Create a function that we'll use as a callback
function explode(planet){
  console.log(planet.getName() + " goes Boom!");
}

//Create a function to take in our planets array and a callback fucntion
function destroyAllPlanets(planets, explodeCallback){
  planets.forEach(explodeCallback);
}

//Destroy the planets!
destroyAllPlanets(planets, explode);

//What if we want to destroy only one planet? We can use our callback function again. DRY!
function destroyPlanet(planet, explodeCallback){
  explodeCallback(planet);
}

destroyPlanet(alderan, explode);
