var bottle = require('../water_bottle');
var assert = require('assert');

describe('Water bottle', function(){
  beforeEach(function() {
    bottle.volume = 0;
  });
  // 1. water bottle should be empty
  it('should be empty at start', function(){
    assert.equal(0, bottle.volume);
  });
  // 2. should go to 100 when filled
  it('should go to 100 when filled', function(){
    bottle.fill();
    assert.equal(100, bottle.volume);
  });
  // 3. should go down by 10 when drank
  it('should go down by 10 when drunk', function(){
    bottle.fill();
    var startValue = bottle.volume
    bottle.drink();
    assert.equal(startValue - 10, bottle.volume);
  })
  it('should go to 0 when emptied', function(){
    bottle.empty();
    assert.equal(0, bottle.volume);
  });
  it('should not be able to go below 0', function(){
    bottle.empty();
    bottle.drink();
    assert.equal(0, bottle.volume);
  });
});

