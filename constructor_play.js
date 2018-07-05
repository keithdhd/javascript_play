function House(sqFeet, bathrooms, bedrooms) {
  this.sqFeet = sqFeet;
  this.bathrooms = bathrooms;
  this.bedrooms = bedrooms;

  this.collapse = function(){
    console.log('uh oh')
  }
}

House.prototype = {
  getBedrooms: function(){
    return this.bedrooms;
  }
};

var house1 = new House(1000, 3, 4);
var house2 = new House(2000, 4, 5);

// console.log(house1);
// console.log(house2.getBedrooms());
// console.log(Object.getPrototypeOf(house1));

  var myPerson = Object.create(null);
  myPerson.walk = function(){console.log('left right left right')};

  var wisePerson = {
    wisdom: function(){
      console.log('commit often');
    }
  }

  var myPerson = Object.create(wisePerson);
  myPerson.walk = function(){console.log('left right left right')};
  myPerson.wisdom();
  myPerson.walk();