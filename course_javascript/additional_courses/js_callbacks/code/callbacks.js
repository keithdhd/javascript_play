var guitars = ["Gretsch", "Gibson", "Martin"];

// guitars.forEach(function(){
//   console.log("a guitar!")
// });

// guitars.forEach(function(guitar, index){
//   console.log(index + " " + guitar);
// })

function guitarLooper(guitar, index){
  console.log(index + " " + guitar);
}

guitars.forEach(guitarLooper);
