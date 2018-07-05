var chai = require('chai');

var assert = chai.assert;

var expect = chai.expect;

describe('assert', function(){
  it('can almost equal', function(){
    assert.closeTo(1.000, 1.001, 0.01);
  })
})

describe('expect', function(){
  it('can do equal stuff', function(){
    expect(1).to.equal(1);
    expect(1.000).to.be.closeTo(1.001, 0.01);
  })
})