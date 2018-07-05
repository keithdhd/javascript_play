//1
var functionCaller = function(myCallback, arg) {
  return myCallback(arg);
};

var callback = function(number) {
  console.log("My number is " + number);
};

functionCaller(callback, 5);

//*********************************//
//2
var increment = function(number) {
  return number + 1;
};

var square = function(number) {
  return number * number;
};

var doSomeMathsForMe = function(number, func) {
  return func(number);
};

console.log('increment: ', doSomeMathsForMe(99, increment));
console.log('square: ', doSomeMathsForMe(5, square));