var express = require('express');
var Playlist   = require('../models/playlist');
var playlistRouter = express.Router();
var bodyParser = require('body-parser');

//set up bodyParser to use JSON
playlistRouter.use(bodyParser.urlencoded({ extended: true }));
playlistRouter.use(bodyParser.json());

//Test route to check we're up and running 
playlistRouter.get('/', function(req, res){
  res.json({ message: 'Success! My new api is here.' });   
});

//INDEX
playlistRouter.get('/playlists', function(req, res){
  res.json( Playlist.find() );
})

//CREATE
playlistRouter.post('/playlists', function(req, res){
  Playlist.create(req.body.name);
  res.json({ message: "Playlist created!" });
})

//SHOW

//UPDATE

//DELETE

module.exports = playlistRouter;