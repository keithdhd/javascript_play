var CharacterList = function(url){
  this.url = url;
  this.characters = [];
};

CharacterList.prototype = {

  getData: function(callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        this.characters = JSON.parse(jsonString);
        callback(this.characters);
      }
    }.bind(this);
    request.send();
  }

}