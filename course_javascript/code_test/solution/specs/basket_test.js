const assert = require('assert');
const Item = require('../item.js');
const Basket = require('../basket.js');

describe('basket', () => {
  let item1;
  let item2;
  let item3;
  let basket;

  before(() => {
    item1 = new Item('pizza', 2.50);
    item2 = new Item('bananas', 1.00);
    item3 = new Item('pasta', 2.00);
  })

  beforeEach(() => {
    basket = new Basket();
  });

  const addItems = () => {
    basket.addItem(item1);
    basket.addItem(item2);
    basket.addItem(item3);
  }

  it('should start with an empty array of items', () => {
    assert.deepEqual([], basket.items);
  });

  it('should be able to add items', () => {
    addItems();
    assert.equal(3, basket.items.length);
  });

  it('should be able to remove items', () => {
    addItems();
    basket.removeItem('pizza');
    assert.equal(2, basket.items.length);
  });

  it('should be able to remove all items', () => {
    addItems();
    basket.removeAll();
    assert.deepEqual([], basket.items);
  });

  it('should be able to calculate total value', () => {
    addItems();
    assert.equal(5.5, basket.totalPrice());
  });
});
