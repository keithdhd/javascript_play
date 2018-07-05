function SolarSystem (name){
  this.name = name;
  this.planets = [];

  this.addPlanet = function(planet){
    this.planets.push(planet);
  }

}

module.exports = SolarSystem;