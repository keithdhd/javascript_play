var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  var button = document.querySelector('button');

  button.onclick = function(){
    makeRequest(url, requestComplete);
  }

}

var makeRequest = function(url, callback){
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();
  //set the type of request we want with the url we want to call
  request.open("GET", url);
  //set the callback we want it to use when it has completed the call
  request.onload = callback;
  //send the request!
  request.send();
}

var requestComplete = function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var countries = JSON.parse(jsonString); //NEW
    var country = countries[0]; //NEW
    populateList(countries); //CHANGED;
}

var populateList = function(countries){
  //Here we're going to populate the list
  var ul = document.getElementById('country-list');

  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  });
}

window.onload = app;