var React = require('react')

var CountrySelect = React.createClass({

  getInitialState: function(){
    return { selectedIndex: null}
  },

  handleChange: function(e){
    var newIndex = e.target.value
    this.setState( {selectedIndex: newIndex} )
    this.props.setCurrentCountry( this.props.countries[newIndex] )
  },

  render: function(){
    var countries = this.props.countries.map(function(country, index){
      return (
        <option value={index} key={index}>
          {country.name}
        </option>
      )
    }.bind(this))
    return(
      <select value={this.state.selectedIndex} onChange={this.handleChange}>
        {countries}
      </select>
    )
  }

})

module.exports = CountrySelect