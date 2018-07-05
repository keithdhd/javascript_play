const _ = require('lodash')

const ShoppingBasket = function(){
  this.products = []
}

ShoppingBasket.prototype = {

  addItem: function(product){
    this.products.push(product)
  },

  removeItem: function(productToRemove){
    let arrRemovedItem = _.remove(this.products, function(p){
      return p.id = productToRemove.id
    })
    return arrRemovedItem
  }

}

module.exports = ShoppingBasket