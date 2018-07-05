var React = require('react');

var Counter = React.createClass({
  
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },

  decrementCount: function(){
    this.setState({
      count: this.state.count - 1
    })
  },

  getInitialState: function(){
    return {
      count: 0
    }
  },

  render: function(){
    return(
      <div>
        <h1>Hello, I am { this.props.title }</h1>
        <p>The current count is { this.state.count }</p>
        <button onClick={ this.incrementCount }>Increment</button>
        <button onClick={ this.decrementCount }>Decrement</button>
      </div>
    )
  }
});

module.exports = Counter;