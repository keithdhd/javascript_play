const React = require('react');
const ProductRow = require('./ProductRow')

const ProductsBox = (props) => {

    let products = props.products.map(function(product){
      return <ProductRow product={product} />
    })

    return(
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Level</th>
          </tr>
        </thead>
        {products}
      </table>
    )

}

module.exports = ProductsBox