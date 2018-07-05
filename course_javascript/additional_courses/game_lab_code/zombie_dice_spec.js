ZombieDice = require('./zombie_dice');
assert = require('assert');

describe('Zombie Dice', function(){
  
  it('should have a six sided dice', function(){
    var zombieDice = new ZombieDice('green');
    assert.equal(6, zombieDice.dice.sides)
  });
  it('should complain if doesnt have a color', function(){
    assert.throws(function() {new ZombieDice()}, Error, "Error thrown");
  });
  // it('should setup green with 3 brain 2 walk 1 shotgun'), function(){
  //     var zombieDice = new ZombieDice('green');
  //     assert.equal(, zombieDice.dice.sides)
  //   });
  // });
})