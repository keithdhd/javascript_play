class Basket {
  constructor() {
    this.items = [];  
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(query) {
    this.items = this.items.filter((item) => {
      if (item.name !== query) return item;
    });
  }

  removeAll() {
    this.items = [];
  }

  totalPrice() {
    return this.items.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }
}

module.exports = Basket;
