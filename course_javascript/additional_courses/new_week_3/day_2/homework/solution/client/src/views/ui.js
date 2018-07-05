var Films = require('../models/films');

var UI = function() {
  var films = new Films();
  films.all(function(result){
    this.render(result);
  }.bind(this));

  this.createForm();

}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },

  render: function(films) {
    var container = document.getElementById('films');

    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.genre, 'Genre: ');
      
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);
    }
  },

  createForm: function(){
    //create the form and a div
    var div = document.createElement('div');
    var form = document.createElement('form');
    var body = document.querySelector('body');

    //append input boxes to the form
    var titleInput = document.createElement('input');
    titleInput.id = 'title';
    form.appendChild(titleInput);

    var actorsInput = document.createElement('input');
    actorsInput.id = 'actors';
    form.appendChild(actorsInput);

    //append a button to submit the form
    var button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Add Film';
    form.appendChild(button);

    //add event handler to the onSubmit event of the form
    form.onsubmit = function(e){
      e.preventDefault();
      var newFilm = {
        title: e.target.title.value,
        actors: e.target.actors.value.split(',')
      }
      
      var films = new Films(); 
      films.add(newFilm, function(data){
        console.log(data);
      });

    }

    div.appendChild(form);
    body.insertBefore( div, body.firstChild );
  }

}

module.exports = UI;
