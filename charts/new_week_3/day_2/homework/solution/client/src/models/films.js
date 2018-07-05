var Film = require('./film');
var Review = require('./review');

var Films = function() {}

Films.prototype = {
  makeRequest: function(method, url, callback, payload){
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = callback;
    request.send(payload);
  },
  all: function(callback){
    var self = this;
    this.makeRequest("GET", "http://localhost:3000/api/films", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var films = self.populateFilms(results);
      callback(films);
    });
  },
  populateFilms: function(results){
    var films = [];
    
    for(var result of results){
      var film = new Film(result);
      films.push(film);
    }
    return films;
  },
  add: function(newFilm, callback){
    this.makeRequest("POST", "http://localhost:3000/api/films", callback, newFilm);
  }
}

module.exports = Films;
