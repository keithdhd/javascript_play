var React = require('react');
var ReactDOM = require('react-dom');

var Clock = React.createClass({

  getInitialState: function(){
    return {minutes:5, seconds:0}
  },

  componentDidMount: function(){

    var shares = [
      {name: "IBM", price: 250, age: 80},
      {name: "MSN", price: 150, age: 90},
      {name: "AMZ", price: 50, age: 10},
      {name: "APP", price: 350, age: 54},
      {name: "WAL", price: 450, age: 34},
      {name: "TOY", price: 550},
    ]

    console.table(shares);
    setInterval(this.updateCountdown, 1000);
  },

  updateCountdown: function(){
    var seconds = this.state.seconds;
    var minutes = this.state.minutes;

    if(this.state.seconds === 0){
      seconds = 59;
    }
    else{
      seconds -= 1;
    }

    this.setState({minutes:minutes, seconds: seconds});
  },

  render: function(){
    return(
      <h1 className="clock">{this.state.minutes}:{this.state.seconds}</h1>
    )
  }
})

module.exports = Clock;