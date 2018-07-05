var express = require('express');
var Playlist   = require('../models/playlist');
var playlistRouter = express.Router();
var bodyParser = require('body-parser');

//set up bodyParser to use JSON
playlistRouter.use(bodyParser.urlencoded({ extended: true }));
playlistRouter.use(bodyParser.json());

//Mongoose!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playlist-manager');

//Test route to check we're up and running 
playlistRouter.get('/', function(req, res){
  res.json({ message: 'Success! My new api is here.' });   
});

//INDEX
playlistRouter.get('/playlists', function(req, res){
  Playlist.find(function(err, playlists){
    if(err) console.log(err);
    res.json(playlists);
  })
})

//CREATE
playlistRouter.post('/playlists', function(req, res){
  var playlist = new Playlist(req.body);
  playlist.save(function(err, playlist){
    if(err) console.log(err);
    res.json({ message: "Playlist created!" });
  })
})

//SHOW
playlistRouter.get('/playlists/:id', function(req, res){
  Playlist.findById(req.params.id, function(err, playlist){
    if(err) console.log(err);
    res.json(playlist);
  })
})


//UPDATE
playlistRouter.put('/playlists/:id', function(req, res){
  Playlist.findByIdAndUpdate(req.params.id, req.body, function(err, playlist){
    if(err) console.log(err);
    res.json({message: "Playlist updated!"});
  })
})

//DELETE
playlistRouter.delete('/playlists/:id', function(req, res){
  Playlist.findByIdAndRemove(req.params.id, function(err){
    if(err) console.log(err);
    res.json({message:"Playlist deleted!"});
  })
})














module.exports = playlistRouter;