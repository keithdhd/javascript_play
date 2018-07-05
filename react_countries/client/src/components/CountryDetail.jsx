var React = require('react')
var BorderingCountries = require('./BorderingCountries')

var CountryDetail = function(props){

    if(!props.country){
      return(
        <h4>No country yet</h4>
      )
    }
    return(
      <div>
        <h2>{ props.country.name }</h2>
        <p>Population:{ props.country.population }</p>
        <p>Capital:{ props.country.capital }</p>
        <BorderingCountries countries={props.borderingCountries} />
      </div>
    )
  
}

module.exports = CountryDetail 