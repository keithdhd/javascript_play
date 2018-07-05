console.log('doc', myObj);

window.onload = function(){
  printDivToScreen();
  addAndDisplayFunction(1,2);
};

var add = function(a,b){
  return a + b;
};

var printDivToScreen = function(){
  var playDiv = document.getElementById('play');
  console.log('play', playDiv);
};

var addAndDisplayFunction = function(a,b){
  var sum = add(a,b);
  console.log('sum', sum);
  var div = document.createElement('div');
  div.innerText = sum;
  document.body.appendChild(div);
};







