var increment = function(n){
  return n+1;
}

var square = function(n){
  return n*n;
}

var doSomeMathsForMe = function(num, func){
  return func(num);
}

console.log(doSomeMathsForMe(5,increment));
console.log(doSomeMathsForMe(5,square));