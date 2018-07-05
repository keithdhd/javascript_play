var Car = require('./car');
var assert = require('assert');

describe('toaster', function(){
  it('trying to access the temperature directly should give undefined', function(){
    var toaster = Toaster();
    assert.equal(undefined, toaster.maxTemp);
  });
  
  it('should ', function(){
    var toaster = Toaster();
    assert.equal(undefined, toaster.increaseTemperature());
  });

  


});