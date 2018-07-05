var React = require('react');

var CountryDetails = React.createClass({

  render: function(){
    var countryDetails = this.props.country || {}

    return(
      <div>
        <p>Name: { countryDetails.name } </p>
        <p>Capital: { countryDetails.capital } </p>
      </div>
    )
  }

})

module.exports = CountryDetails;