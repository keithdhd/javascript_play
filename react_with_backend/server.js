var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.get('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if(err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));


var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
