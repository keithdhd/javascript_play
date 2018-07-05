var animals = ['cat', 'bat', 'snake', 'frog'];

//for in
// for (var animal in animals) {
//    console.log(animal); //logs 0 1 2 3
// }

// //for of
for (var animal of animals) {
   console.log(animal); //logs cat bat snake frog
}

// var display = function(item){
//   console.log(item);
// }
//
// // //for each
// animals.forEach(display);
