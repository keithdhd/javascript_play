function displayData () {
  console.log(this.responseText);
}

document.addEventListener('DOMContentLoaded', function(){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", displayData);
  xhr.open("GET", "https://api.punkapi.com/v2/beers");
  xhr.send();
});
