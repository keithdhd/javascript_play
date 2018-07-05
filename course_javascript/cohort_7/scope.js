var globalVariable = 99;
var separateFunction = function() {
  var separateA = 2;
};
var outerFunction = function() {
  var outerA = 1;
  var innerFunction = function() {
    console.log('outerA ', outerA);
    console.log('globalVariable', globalVariable);
    // console.log('separateA ', separateA);
  };

  innerFunction();
};

outerFunction();







// var greet = function( isHappy ){
//   var text = "";
//   if( isHappy ){
//     text = "Hello my friend";
//   }else{
//     text = "Go away";
//   }
//   var displayText = function(){
//     console.log( text );
//   }
//
//   displayText();
//
// };
//
// greet( true );


// var name = "Jay";

// var talk = function(){
//   name = "Rick";
//   console.log( "My name is" + name);
// }
//
// talk();
// console.log( "global name is" + name);
