const React = require('react');
const ProductsBox = require('./ProductsBox')
const ShoppingBasket = require('../models/shopping_basket/shopping_basket.js')

const products = [
  {id: 1, name: "Almond Toe Court Shoes, Patent Black", category: "Women’s Footwear", price: 99,  stockLevel: 5},
  {id: 1, name: "Almond Toe Court Shoes, Patent Black", category: "Women’s Footwear", price: 99,  stockLevel: 5},
  {id: 1, name: "Almond Toe Court Shoes, Patent Black", category: "Women’s Footwear", price: 99,  stockLevel: 5},
  {id: 1, name: "Almond Toe Court Shoes, Patent Black", category: "Women’s Footwear", price: 99,  stockLevel: 0},
]

const ShoppingBasketBox = React.createClass({

  getInitialState(){
    let sb = new ShoppingBasket()
    return {basket: sb}
  },

  render(){
    return(
      <div>
        <h1>Shopping Basket</h1>
        <ProductsBox products={products} />
      </div>
    )
  }

})

module.exports = ShoppingBasketBox