var increment = function(n){
  return n+1;
}

var square = function(n){
  return n*n;
}

var doSomeMathForMe = function(num, func){
  return func(num);
}

console.log(doSomeMathForMe(5, increment));
console.log(doSomeMathForMe(7, square));