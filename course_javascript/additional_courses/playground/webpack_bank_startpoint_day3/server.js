var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
// var fs = require('fs');
// var ACCOUNTS_FILE = path.join(__dirname + '/sample.json');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/accounts', function(req,res){
  var url = 'mongodb://localhost:27017/bank';
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('accounts');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })
});

app.use(express.static('client/build'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
