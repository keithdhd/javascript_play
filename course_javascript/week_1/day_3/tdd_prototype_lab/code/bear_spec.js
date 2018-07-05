Bear = require('./bear');
var assert = require('assert');

describe('Bear', function() {
  beforeEach(function() {
    var myBear = new Bear(22, 'Grizzly', 88);
  });

  it('should have an age', function() {
    assert.equal(22, myBear.age);
  });

  it('should have a type', function() {
    assert.equal('Grizzly', myBear.type);
  });

  it('should have a weight', function() {
    assert.equal(88, myBear.weight);
  });

  it('should return ROAR! when roaring', function() {
    assert.equal('ROAR!', myBear.roar());
  })

  it('should eat and increase weight', function() {
    myBear.eat();
    assert.equal(98, myBear.weight);
  });

  it('should be able to hibernate if weight >= 100', function() {
    myBear.weight = 101;
    assert.equal(true, myBear.canHibernate());
  });

  it('should be unable to hibernate if weight <= 100', function() {
    myBear.weight = 99;
    assert.equal(false, myBear.canHibernate());
  });
});
