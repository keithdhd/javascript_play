var bottle = require('./water_bottle');
var assert = require('assert');

describe("Water bottle", function(){
  it('should be empty at the start', function(){
    assert.equal(0, bottle.volume);
  });

  it('Should go to 100 when filled', function(){
    bottle.fill();
    assert.equal(100, bottle.volume);
  });

  it("Should go down by 10 when drunk", function(){
    bottle.volume = 100;
    bottle.drink();
    assert.equal(90, bottle.volume);
  });

  it("Should go down to 0 when empty", function(){
    bottle.empty();
    assert.equal(0, bottle.volume);
  });

  it("Should not be able to go below 0", function(){
    bottle.volume = 5;
    bottle.drink();
    assert.equal(0, bottle.volume);
  });
})

