var solarSystem = require('./models/solar_system.js');
var Firebase = require("firebase");

window.onload = function(){
  console.log("app loaded");
  var myDataRef = new Firebase('https://rqzeuq5izx8.firebaseio-demo.com/');

  //Writing data
  myDataRef.set(solarSystem);

  //Add planet
  var planetRef = myDataRef.child("planets");
  planetRef.push({ name: "Planet x", size: 1008 }, onComplete);

  function onComplete( error ){
    if (error) {
      alert("Planet could not be saved." + error);
    } else {
      alert("Planet saved successfully.");
    }
  }

  //Reading data
  myDataRef.on("value", function(snapshot) {
    console.log("Here's what I got from Firebase: ", snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}



// myDataRef.on('child_added', function(snapshot) {
//   //We'll fill this in later.
// });