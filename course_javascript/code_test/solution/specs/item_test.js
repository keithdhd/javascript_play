const assert = require('assert');
const Item = require('../item.js');

describe('item', () => {
  let item;

  beforeEach(() => {
    item = new Item('pizza', 2.50);
  });

  it('should have a name', () => {
    assert.equal('pizza', item.name);
  });

  it('should have a price', () => {
    assert.equal(2.50, item.price);
  });
});
