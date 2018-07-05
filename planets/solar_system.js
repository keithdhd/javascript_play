var SolarSystem = function(name){
  this.name = name;
  this.planets = [];

  this.addPlanet = function(planet){
    this.planets.push(planet);
  }

}

module.exports = SolarSystem;