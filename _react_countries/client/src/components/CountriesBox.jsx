var React = require('react');
var CountriesSelect = require('./CountriesSelect');
var CountryDetails = require('./CountryDetails');

var CountriesBox = React.createClass({
  
  getInitialState: function(){
    return {countries: [], currentCountry: null};
  },

  componentDidMount: function(){
    var url = 'https://restcountries.eu/rest/v1/all';
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function(){
      var data = JSON.parse(request.responseText);
      console.log(data);
      
      this.setState({
        countries: data
      });

    }.bind(this);

    request.send(null);
  },

  setCurrentCountry: function(country){
    console.log(country);
    this.setState({
      currentCountry: country
    })
  },

  render: function(){
    return(
      <div>
        <h4>Countries Box</h4>
        <CountriesSelect countries={ this.state.countries } setCurrentCountry={ this.setCurrentCountry }/>
        <CountryDetails country={ this.state.currentCountry } />
      </div>
    );
  }

})

module.exports = CountriesBox;