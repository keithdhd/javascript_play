function Galaxy(name){
  this.name = name;
  this.planets = new Array();

  this.addPlanet = function(planet){
    this.planets.push(planet);
  }

  this.getPlanets = function(){
    return this.planets;
  }
}

module.exports = Galaxy