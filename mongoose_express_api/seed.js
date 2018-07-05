var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playlist-manager');


var Playlist = require('./models/playlist');

var playlist = new Playlist({
  name: "Hip Hop",
  rating: 9,
  genre: "Urban"
});

playlist.save(function(err){
  if(err) console.log(err);
  console.log("New playlist created");
})