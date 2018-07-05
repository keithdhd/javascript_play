function Animal(type, legs) {  
  this.type = type;
  this.legs = legs;  
}

Animal.prototype = {
  logInfo : function() {
    console.log(this === myCat); // => true
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
    console.log(this);
  }
}

var myCat = new Animal('Cat', 4);  
myCat.logInfo();


// ///////////////////////////////////////////////////////////////


function add(a, b) {  
  // console.log(this); // window object
  this.myNumber = 20; // add 'myNumber' property to global object
  // console.log(this);
  return a + b;
}

// add() is invoked as a function
// this in add() is a global object (window)

add(5, 3);  

setTimeout(myCat.logInfo.bind(myCat), 1000); 