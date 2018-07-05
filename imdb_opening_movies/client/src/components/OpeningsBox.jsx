var React = require('react')
var Header = require('./Header')
var MovieTable = require('./MovieTable')
var MoreLink = require('./MovieLink')
var ShowTimesButton = require('./ShowTimesButton')

var OpeningsBox = React.createClass({

  handleClick: function(){
    console.log('handling the click')
  },

  render: function(){
    return(
      <div className='openings-box'>
        <Header title='UK Opening This Week' />
        <MovieTable movies={this.props.movies} />
        <MoreLink />
        <ShowTimesButton handleClick={this.handleClick} />
      </div>
    )
  }

})

module.exports = OpeningsBox