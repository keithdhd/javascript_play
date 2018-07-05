window.onload = function () {
    //setup album list model
    var albumsList = new AlbumsList('https://api.spotify.com/v1/search?q=cats&type=album');

    //setup views
    var albumsView = new AlbumsView(document.querySelector('#albums'));

    //set callback for request
    albumsList.done = albumsView.render.bind(albumsView);
    
    //get data from server
    albumsList.populate();
};