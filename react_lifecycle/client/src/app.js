var React = require('react')
var ReactDOM = require('react-dom')

var App = React.createClass({

  getInitialState: function(){
    console.log('Getting initial state ...')
    return({myNumber: 1})
  },

  componentWillMount: function(){
    console.log('Component WILL MOUNT!')
  },

  componentDidMount: function(){
    console.log('Component DID MOUNT!')
  },

  componentWillReceiveProps: function(){
    console.log('Component RECEIVE PROPS!')
  },

  shouldComponentUpdate: function(){
    return true;
  },

  componentWillUpdate: function(){
    console.log('Component WILL UPDATE!')
  },

  componentDidUpdate: function(){
    console.log('Component DID UPDATE!')
  },

  componentWillUnmount: function(){
    console.log('Component WILL UNMOUNT!')
  },


  increment: function(){
    this.setState({myNumber: this.state.myNumber + 1})
  },

  render: function(){
    console.log("Rendering ...")
    return(
      <div>
        <h3>{this.state.myNumber}</h3>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }



})

window.onload = function(){
  ReactDOM.render( 
    <App />,
    document.getElementById('app') 
  );

  setTimeout(function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'))

  }, 10000)
}


