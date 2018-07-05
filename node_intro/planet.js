var planet = {
  name: 'Planet X',
  radius: 1000,
  getName: function(){
    return this.name;
  }
}

module.exports.planet = planet;
module.exports.randomNum = Math.random();
