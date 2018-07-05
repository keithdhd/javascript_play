var thingWeWantToHappenLater = function(){
  console.log( " I waited to run");
};

var anotherThingWeWantToHappenLater = function(){
  console.log( "Also waited");
};

setTimeout(thingWeWantToHappenLater, 0)
// setTimeout(anotherThingWeWantToHappenLater, 1000)
console.log ("A log a the bottom of the file");

//something here
// sleep( 1000 )

// var myFunction = function( aFunction ){
//   aFunction( 99 );
// };
//
// var anotherFunction = function( number ){
//   console.log( number );
// };
//
// myFunction( anotherFunction );
