var React = require('react');

var CountriesSelect = React.createClass({

  getInitialState: function(){
    return { selectedIndex: null }
  },

  handleChange: function(e){
    e.preventDefault();
    var newIndex = e.target.value;
    this.setState({
      selectedIndex: newIndex
    })
    var currentCountry = this.props.countries[newIndex];
    this.props.setCurrentCountry(currentCountry);
  },

  render: function(){
    
    var countryOptions = this.props.countries.map(function(country, index){
      return <option value={ index } key={ index }>{ country.name }</option>
    })

    return(
      <select onChange={ this.handleChange } value={ this.state.selectedIndex }>
        <option>Select Country</option>
        { countryOptions }
      </select>
    )
  }
});

module.exports = CountriesSelect;