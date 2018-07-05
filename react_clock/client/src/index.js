var React = require('react');
var ReactDOM = require('react-dom');
var Clock = require('./components/Clock.jsx');

window.onload = function(){
  ReactDOM.render(
    <Clock />,
    document.getElementById('app')
  );
}
