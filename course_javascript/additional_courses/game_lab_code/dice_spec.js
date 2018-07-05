Dice = require('./dice');
assert = require('assert');

describe('Dice', function(){
  var di = new Dice(6);
  it('should have a number of sides', function(){
    assert.equal(6, di.sides)
  })
  it('should roll and be greater than zero and at most the number of sides', function(){
    var outcome = di.roll()
    assert.equal(true, outcome <= di.sides && outcome > 0)
  })
})