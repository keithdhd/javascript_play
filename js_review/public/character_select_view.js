var CharactersSelectView = function(selectElement){
  this.selectElement = selectElement;
};

CharactersSelectView.prototype = {

  render: function(characters){
    console.log(characters);
    //add the characters to the dropdown (selectElement)
    characters.forEach( this.createOption.bind(this) );
  },

  createOption: function(character, index){
    //create an option element
    var optionElement = document.createElement('option');
    //set the value and text of the option
    optionElement.value = index;
    optionElement.text  = character.name;

    this.selectElement.appendChild(optionElement);
  }

}