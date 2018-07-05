var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var FilmQuery = require('./db/filmQuery');

var FilmApi = require('./film_api/filmApi');

app.use(express.static('client/build'));

app.listen(3000, function () {
  new FilmApi(app);
  var query = new FilmQuery();
  query.all(function(data){
    console.log(data);
  });
  console.log('App running on port '+this.address().port);
});
