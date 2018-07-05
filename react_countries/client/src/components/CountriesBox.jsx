var React = require('react')
var CountrySelect = require('./CountrySelect')
var CountryDetail = require('./CountryDetail')
var _ = require('lodash')

var CountriesBox = React.createClass({

  getInitialState: function(){
    return { countries: [], currentCountry: null }
  },

  setCurrentCountry: function(country){
    this.setState({currentCountry: country})
  },

  getCountryByCode: function(code){
    return _.find(this.state.countries, function(country){
      return country.alpha3Code === code 
    })
  },

  borderingCountries: function(){
    if(!this.state.currentCountry){ return []}

    return this.state.currentCountry.borders.map(function(code){
      return this.getCountryByCode(code)
    }.bind(this))  

  },

  componentWillMount: function(){
    console.log("componentWillMount...")
    var url = "https://restcountries.eu/rest/v1/all"
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onload = function(){
      if(request.status === 200){
        var data = JSON.parse(request.responseText)
        this.setState({countries: data, currentCountry: data[0]})
      } 
    }.bind(this)
    request.send(null)
  },

  render: function(){
    console.log("Rendering....")
    return(
      <div>
        <h4>Countries Box</h4>
        <CountrySelect countries={this.state.countries} setCurrentCountry={this.setCurrentCountry}/>
        <CountryDetail country={ this.state.currentCountry } borderingCountries={this.borderingCountries()}/>
      </div>
    ) 

   
  }
})

module.exports = CountriesBox