var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Share = require('./models/share.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//Mongoose!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stock_app');

app.get('/', function(req, res){
  res.render('index');
})

app.get('/api', function(req, res){
  Share.find(function(err, data){
    res.json(data);
  });
})

app.listen(3000, function(){
  console.log("Let's rock!");
})
