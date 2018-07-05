var assert = require('assert');
var pedometer = require('../pedometer');

describe("Pedometer", function() {

  beforeEach(function() {
    pedometer.count = 0;
  });

  it('should start at 0',function() {
    assert.equal(0,pedometer.count);
  });

  it('should increment by 1 per step',function() {
    pedometer.increment();
    assert.equal(1,pedometer.count);
  });

  it('should increment by number of steps passed',function() {
    pedometer.increment(10);
    assert.equal(10,pedometer.count);
  });

});