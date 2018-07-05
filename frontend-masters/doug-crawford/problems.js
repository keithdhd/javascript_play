// WHAT IS x? ANSWER: x = []. funky() just changes what o is pointing to
function funky(o){
  o = null;
}
  
var x = [];
funky(x);

console.log(x);

//WHAT IS x? ANSWER: 1. swap only sees the value of the arguments passed in.
// function swap(a, b){
//   var temp = a;
//   a = b;
//   b = temp;
// }

// var x=1, y=2;
// swap(x,y);

// console.log(x);

//========================================================================
//========================================================================

function identity(x){
  return x;
}

function add(a, b){
  return a + b;
}

function mul(a, b){
  return a * b;
}


//Write a function that takes an argument and returns a function that returns that argument

function identityf(x){
  return function(){
    return x;
  }
}

var idf = identityf(3);
console.log(idf()); // 3

//Write a funciton that adds from two invocations

function addf(num1){
  return function(num2){
    return num1 + num2;
  }
}
var add3 = addf(3);

console.log(add3(4)); // 7

//Write a function that takes a binary function and makes it callable with two invocations

function applyf(func){
  return function(x){
    return function(y){
      return func(x,y);
    }
  }
}

console.log(applyf(mul)(5)(6)); // 30

//Write a function that takes a function and an argument, and returns a function that can supply a second argument.   

function curry(func, x){
  return function(y){
    return func(x, y);
  }
}

console.log(curry(mul, 5)(6)); // 30


