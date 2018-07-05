const express  = require('express');
const app      = express();
const twit     = require('./lib/twit'); 
const http     = require('http').Server(app);
const io       = require('socket.io')(http);

// Setup CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.get('/api/twit/:screen_name', function (req, res) {

  // io.on('connection', (socket) => {
  //   console.log("user connected");

  //   socket.on('twitazon', (message) => {
  //     io.sockets.emit('twitazon', tweets);
  //   });

  //   twit.get('statuses/user_timeline/:screen_name', { screen_name: req.params.screen_name }, function (err, data, response) {
  //     res.send(data);
  //   });

  // })

  twit.get('users/show/:screen_name', { screen_name: req.params.screen_name },  function (err, data, response) {
    res.send(data);
  });
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Happy Days! at http://%s:%s', host, port);
});