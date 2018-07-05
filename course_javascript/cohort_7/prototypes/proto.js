var Fish = function(name, colour){
  this.name = name;
  this.colour = colour;
};

Fish.prototype = {
  swim: function(distance){
    console.log(" splash splash " + this.name);
  }
}


var myFish = new Fish("nemo", "orange");
myFish.swim(123);

console.log( Object.getPrototypeOf( myFish ) )



// var wisePerson = {
//   wisdom: function(){
//     console.log( "commit often" );
//   }
// };
//
// var myPerson = Object.create( wisePerson );
//
// myPerson.walk = function(){ console.log("Left right left right")};
// myPerson.walk();
//
// myPerson.wisdom();
//
// var anotherPerson = Object.create( )
