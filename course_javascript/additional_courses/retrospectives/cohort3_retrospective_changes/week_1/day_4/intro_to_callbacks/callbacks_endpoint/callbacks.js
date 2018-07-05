var doSomeMathsForMe = function(num, func){
  console.log( "Calculating result ....", func(num));
}

var increment = function(aNumber){
  return aNumber+1;
}

var square = function(aNumber){
  return aNumber * aNumber;
}

doSomeMathsForMe(5, increment);
doSomeMathsForMe(5, square);

doSomeMathsForMe(6, function(num){
    return num - 1; 
})
