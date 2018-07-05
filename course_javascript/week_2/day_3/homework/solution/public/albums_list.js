var AlbumsList = function(url) {
  this.albums = [];
  this.url = url;
  this.done = null;
};

AlbumsList.prototype = {
  populate: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            this.albums = JSON.parse(jsonString);
            this.done(this.albums);
        }
    }.bind(this);
    request.send();
  }
};