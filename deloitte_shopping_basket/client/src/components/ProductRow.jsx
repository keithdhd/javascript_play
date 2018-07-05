const React = require('react');

const ProductRow = (props) => {
  return(
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.category}</td>
      <td>{props.product.price}</td>
      <td>{props.product.stockLevel}</td>
    </tr>
  )
}

module.exports = ProductRow