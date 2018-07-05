// Create a bear object that has a type, a name, a belly and an eat method.
// The eat method should add something to the bear's belly.

var myBear = {
  type: "Grizzly",
  name: "Wojtek",
  belly: [],
  eat: function(food){
    this.belly.push( food );
    console.log( "My name is " + this.name + " and once again I'm eating " + food)
  },
  vomit: function(){
    this.belly = [];
  }
};

myBear.eat( "Salmon" );
myBear.eat( "Crisps" );
myBear.vomit();
console.log( myBear.belly );

// var myPerson = {
//   name: "Guybrush",
//   age: 32,
//   weapon: "cutlass",
//   talk: function(){
//     console.log( "I'm alive, my name is " + this.name);
//   }
// };
// console.log("My person", myPerson);
// myPerson.talk();
//
// myPerson.walk = function(){
//   console.log( "Walking walking ");
// }
//
// myPerson.walk();
