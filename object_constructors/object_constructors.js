// var myObject = {};

// myObject.shape = "circle";
// myObject.radius = '10';

// var myOtherObject = new Object();

// myOtherObject.shape = 'square';
// myOtherObject.color = 'red';


// var house1 = {
//   sqFeet: 2000,
//   bathrooms: 2,
//   bedrooms: 3
// }

// var house2 = {
//   sqFeet: 1000,
//   bathrooms: 1,
//   bedrooms: 2
// }



function House(sqFeet, bathrooms, bedrooms){
  this.sqFeet = sqFeet;
  this.bathrooms = bathrooms;
  this.bedrooms = bedrooms;
}


var house1 = new House(2000, 2, 3);
var house2 = new House(3000, 3, 4);

console.log(house1.bathrooms);
console.log(house2.bedrooms);



var Office = function(desks, meetingRooms, coffeeMachines, tableTennisTables){
  this.desks = desks;
  this.meetingRooms = meetingRooms;
  this.coffeeMachines = coffeeMachines;
  this.tableTennisTables = tableTennisTables;


  this.averageDesksPerMeetingRoom = function(){
    return (this.desks / this.meetingRooms);
  };

};


var office1 = new Office(100, 4, 26, 5);

console.log(office1.averageDesksPerMeetingRoom());


