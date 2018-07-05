var assert = require('assert');
var NinjaTurtle = require('./ninja_turtle')

describe('Ninja Turtle', function(){

  var myTurtleAbilities = ['Master of stealth', 'Highly skilled in ninjutsu', 'hand-to-hand combat']
  var myTurtle = new NinjaTurtle('Leonardo Hamato', myTurtleAbilities);

  it('should have a name', function(){
    assert.equal(myTurtle.name, 'Leonardo Hamato');
  });

  it('should have at least one ability', function() {
    assert.equal(myTurtle.abilities.length > 1, true);
  });

  it('should list turtle abilities count', function() {
    assert.equal(myTurtle.abilityCount(), 3);
  });

  it('should list the first ability', function() {
    assert.equal(myTurtle.listFirstAbility(), 'Master of stealth')
  });

});