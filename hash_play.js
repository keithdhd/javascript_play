var myPerson = {
  name: 'Guybrush',
  age: 32,
  weapon: 'cutlass'
}

var myKey = "weapon";

myPerson.location = "california";
myPerson["location"] = "edinburgh";


console.log(myPerson["location"]);
module.exports = myPerson;
console.log(module);