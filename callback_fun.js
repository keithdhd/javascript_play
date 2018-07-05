var getSomethingFromTheDatabase = function(messageMe){
  // do some heavy database stuff
  messageMe("Yo dude! I'm done");
}

var myFunc = function(message){
  console.log(message);
}

getSomethingFromTheDatabase(myFunc);


console.log("Carrying on the program");

//CUSTOMER 1
console.log("Latte please");

setTimeout(function coffeeIsReady(){
  console.log("latte is ready");
}, 4000);


// CUSTOMER 2
console.log("Espresso please");

setTimeout(function coffeeIsReady(){
  console.log("espresso is ready");
}, 2000);