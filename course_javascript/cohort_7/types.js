var globalVariable = 99;
var separateFunction = function() {
  var separateA = 2;
};
var outerFunction = function() {
  var outerA = 1;
  var innerFunction = function() {
    console.log('outerA ', outerA);
    console.log('globalVariable', globalVariable)
    console.log('separateA ', separateA);
  };

  innerFunction()
};

outerFunction();

// var number = 1;
// number = "something else";
// number = 4;


// var a = "";
// console.log( a );

// var myString = "a nice string";
// console.log( myString.toUpperCase() );

// var a = 1;
// var b = 2;
// var c = 2.5;
//
// console.log( 2 - 4 )


// var myString = "something we want to hold on to";
// console.log(myString);
