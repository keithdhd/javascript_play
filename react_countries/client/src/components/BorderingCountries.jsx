var React = require('react')

var BorderingCountries = function(props){
  var countryItems = props.countries.map(function(country, index){
    return <li key={index}> {country.name} </li>
  })

  return(
    <ul>
      {countryItems}
    </ul>
  )

}

module.exports = BorderingCountries