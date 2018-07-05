const React = require('react');
const ReactDOM = require('react-dom');
const ShoppingBasketBox = require('./components/ShoppingBasketBox')

window.onload = function(){
  ReactDOM.render(
    <ShoppingBasketBox />,
    document.getElementById('app')
  );
}
