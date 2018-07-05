//closure
function stopWatch(interval){
  var elapsed = 0;
  console.log("init");
  console.log(elapsed);

  var countUp = function(){
    console.log(interval, ++elapsed);
  }

  setInterval(countUp, interval);
  return countUp;
}

// var watch = stopWatch(1000);
// var watch2 = stopWatch(2000);


//closure
var lastNameTrier = function(firstName){

  var inner = function(lastName){
    console.log(firstName, lastName);
  }

  return inner;
}

var trier = lastNameTrier("Keith");
trier("Duncan");
trier("Smith");
trier("Douglas");


//functional programming
var sqaure = function(num){
  return num * num;
}

var increment = function(num){
  return num + 1;
}

var doMyMathsForMe = function(num, func){
  return func(num);
}

console.log(doMyMathsForMe(5, sqaure));
