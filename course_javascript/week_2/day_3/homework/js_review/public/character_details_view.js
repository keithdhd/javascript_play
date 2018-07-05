var CharacterDetailsView = function(detailsElement, clearButton){
  this.detailsElement = detailsElement;
  this.clearButton = clearButton;
  this.clearButton.addEventListener('click', this.clear.bind(this));
};

CharacterDetailsView.prototype = {

  render: function(character){
    var pTag = document.createElement('p');
    pTag.innerText = character.actor;
    this.detailsElement.appendChild(pTag);
  },

  clear: function(){
    console.log(this);
    this.detailsElement.innerHTML = '';
  }

};

