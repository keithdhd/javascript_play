var app = function(){

  //get some data from API
  var characterList        = new CharacterList("http://hp-api.herokuapp.com/api/characters");
  var charactersSelectView = new CharactersSelectView(document.querySelector("#characters"));
  var characterDetailsView = new CharacterDetailsView(document.querySelector("#character-details"), document.querySelector("#clear-details"));

  //log out the data in console
  characterList.getData(function(characters){
    charactersSelectView.render(characters);
    charactersSelectView.selectElement.addEventListener('change', function(){
      var foundCharacter = characters[this.value];
      characterDetailsView.render(foundCharacter);
    });

  });


  //attach an event to a button to get other data

  //display other data on a page


}

window.onload = app;