var solarSystem = {
  "planets": [
    {id: 1, name: "Saturn"},
    {id: 2, name: "Venus"},
    {id: 3, name: "Mars"},
    {id: 4, name: "Pluto"}
  ],

  findById: function(id){
    var planets = this.planets.filter(function(planet){
      return planet.id === id; 
    });
    return planets;
  }
}

var pla = solarSystem.findById(2);
console.log(pla);