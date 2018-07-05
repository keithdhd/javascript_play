function Playlist(){

  //Some seed data to impersonate a db table.
  var playlists = [
    {name: "Country Cheese"},
    {name: "Christmas Songs"},
    {name: "German Elektro Groove"},
    {name: "Hip Hop Classics"}
  ];

  return {
    find: function(){
      return playlists;
    },

    findById: function(index){
      return playlists[index-1] || {message: "Playlist not found!"};
    },

    create: function(name){
      var newPlaylist = {};
      newPlaylist.name = name;
      playlists.push(newPlaylist);
    },

    update: function(index, name){
      if (!playlists[index-1]) return {message: "Playlist not found!"};
      playlists[index-1].name = name;
      return {message: "Playlist updated!"}
    },

    remove: function(index){
      playlists.splice(index-1, 1);
    }
  }
}

module.exports = Playlist();