// var logRed = function(){
//   console.log("It's red!");
// }

// var logNotRed = function(message){
//   console.log(message);
// }

// var logFunction = function(message){
//   console.log(message);
// }

// var redChecker = function(colour, logFunction){
//   if(colour === "red"){
//     var message = "red";
//      logFunction(message); 
//   }
//   else{
//     var message = "blue";
//     logFunction(message);
//   }
// }

// redChecker("blue", logFunction);

var darkSideOfTheMoon = {
  title: "Dark Side Of The Moon",
  price: 10,
  quantity: 0
}

var inStock = function(){
  console.log("in stock, Hooray!");
  //do something more complex
}

var outOfstock = function(){
  console.log("out of stock. Uh oh!");
}

function stockChecker(record, inStock, outOfStock){
  if(record.quantity > 0){
    inStock();
  }
  else{
    outOfStock();
  }
}

stockChecker(darkSideOfTheMoon, inStock, outOfstock);