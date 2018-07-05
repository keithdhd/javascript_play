var mongoose = require('mongoose');

//create a new mongoose Schema
var portfolioSchema = new mongoose.Schema({
  Stock: { type: String, required: true, unique: false },
  Epic: String,
  Qty: Number,
  Price: Number,
  Target: Number,
  Stop: Number,
  "Buy Date": Date,
  "Sell Date": Date,
  "P/L": Number
},
{ collection : 'portfolio' });

//get a mongoose Model and save to variable Share
var Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Make the Share available to our app
module.exports = Portfolio;