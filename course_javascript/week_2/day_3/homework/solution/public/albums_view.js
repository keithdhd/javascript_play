var AlbumsView = function(albumsContainer) {
  this.albumsContainer = albumsContainer;
};

AlbumsView.prototype = {

  render: function(data){
    console.log(data);

    data.albums.items.forEach(function(album){
      var div = document.createElement('div');
      div.className = "album";
      var anchorLink = document.createElement('a');
      anchorLink.href = album.external_urls.spotify;
      anchorLink.innerText = album.name;
      div.appendChild(anchorLink);
      this.albumsContainer.appendChild(div);
    }.bind(this))

  }

};
