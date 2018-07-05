var React = require('react');
var ReactDOM = require('react-dom'); 
var Counter = require('./components/Counter');

window.onload = function(){
  console.log("webpack app started");
  ReactDOM.render(
    <Counter title="Jack the Counter"/>,
    document.getElementById('app')
  );

};
