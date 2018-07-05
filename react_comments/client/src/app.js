var React = require('react');
var ReactDOM = require('react-dom'); 
var CommentBox = require('./components/CommentBox');

window.onload = function(){
  console.log("webpack app started");
  ReactDOM.render(
    <CommentBox></CommentBox>,
    document.getElementById('app')
  );
};
