function Universe(){
  this.galaxies = new Array();

  this.addGalaxy = function(galaxy){
    this.galaxies.push(galaxy);
  }

  this.getGalaxies = function(){
    return this.galaxies;
  }

}

module.exports = Universe;