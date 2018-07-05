var testArray = [1,2,3,4];

var sum  = testArray.reduce(function(acc, item){ return acc + item }, 0);
console.log("sum", sum);

var doubledArray = testArray.map( function(item){
  return item * 2;
});

testArray.forEach(function(item){
  console.log("item", item)
});

console.log(' doubled Array', doubledArray);
// var ourForEach = function(array, callOnItem){
//   for( var item of array){
//     callOnItem( item );
//   }
// }
//
// ourForEach( testArray, function(item){ console.log("Item", item)} )




//
// for(var item of testArray){
//   console.log("item", item);
// }
