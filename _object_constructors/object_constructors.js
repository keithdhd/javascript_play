var myObject = {};

myObject.shape = 'circle';
myObject.radius = 10;

// console.log(myObject); 

var myOtherObject = new Object();

myOtherObject.size = 6;
myOtherObject.color = 'red';

// console.log(myOtherObject);

var house1 = {
  sqFeet: 2000,
  bathrooms: 2,
  bedrooms: 3
}

var house2 = {
  sqFeet: 2000,
  bathrooms: 2,
  bedrooms: 3
}

var house3 = {
  sqFeet: 2000,
  bathrooms: 2,
  bedrooms: 3
}

var House = function(sqFeet, bathrooms, bedrooms){
  this.sqFeet = sqFeet;
  this.bathrooms = bathrooms;
  this.bedrooms = bedrooms;

  this.numberOfRooms = function(){
    return(this.bathrooms + this.bedrooms);
  }

}

var house1 = new House(1000, 3, 4);
var house2 = new House(100, 1, 2);

// console.log(house1);
// console.log(house2);


var x = "sqFeet";

console.log(house1.sqFeet);
console.log(house1[x]);

console.log(house1.numberOfRooms());

// Create an Office constructor that makes offices that have a number of desks, and  number of meeting rooms, and a function that shows the average number of desks per meeting room.  Create multiple of these objects.

var Office = function(desks,meetingRooms){
  this.desks = desks;
  this.meetingRooms = meetingRooms;

  this.desksPerRoom = function(){
    return (this.desks/this.meetingRooms);
  }
}

var office1 = new Office(15, 3);
var office2 = new Office(12, 3);
var office3 = new Office(20, 4);

console.log(office1.desksPerRoom());




































































