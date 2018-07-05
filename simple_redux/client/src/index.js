var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

// reducer
const auth = function(state= {status: 'logged out', value: 'guest'}, action){
  switch(action.type){
    case 'LOGIN':
      return Object.assign({}, state, {
        status: 'logged in',
        value: action.value
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        status: 'logged out',
        value: action.value
      })
    default: 
      return state;
  }
}

//store
const { createStore } = Redux;
const store = createStore(auth);

var Auth = React.createClass({
  handleLogin: function() {
    let username = this.refs.username.value;
    //dispatch action
    store.dispatch({
      type: 'LOGIN',
      value: username
    });
  },
  handleLogout: function() {},
  render: function() {
    return (
      <div>
        <input type="text" ref="username" />
        <input type="button" value="Login" onClick={this.handleLogin} />    
        <h1>Current state is {this.props.state.status + ' as ' + this.props.state.value}</h1>
      </div>
    );
  }
});

window.onload = function(){
  ReactDOM.render(
    <Auth />,
    document.getElementById('app')
  );
}
