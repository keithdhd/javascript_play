var mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
  name: String,
  genre: String,
  rating: Number
});

var Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;