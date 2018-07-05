window.onload = function(){
  var myButton = document.getElementsByTagName("button")[0];
  bindEvents(myButton);
  makeStuff();
}

var myName = "Simon";

function bindEvents(myButton){
  myButton.onclick = logAMessage;
  myButton.addEventListener('click', logAMessage);
}

function logAMessage(){
  console.log(myName);
}

var makeStuff = function(){
  var myDiv = document.createElement('div');

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(myDiv);

  console.log(myDiv);
}



