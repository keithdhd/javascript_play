var express = require('express');
var app     = express();
var playlistRouter = require('./controllers/playlistRouter');
var playList = require('./models/playlist');

//Use the router in the controllers folder and prefix with 'api'
app.use('/api', playlistRouter);

app.listen('3000');
console.log('The magic is all happening on port 3000');