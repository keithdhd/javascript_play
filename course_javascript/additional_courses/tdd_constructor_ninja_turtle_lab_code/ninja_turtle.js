var NinjaTurtle = function(name, abilities) {
  this.name = name;
  this.abilities = abilities;
}

NinjaTurtle.prototype = {
  abilityCount: function() {
    return this.abilities.length
  },
  listFirstAbility: function() {
    var firstAbility = this.abilities[0];
    console.log('My first ability: ' + firstAbility);
    return firstAbility;
  }
}

module.exports = NinjaTurtle;