var a = 1;
var b = a;
a = 9;

console.log('b1', b);


var a = {num:1};
var b = a; // copy the variables reference to a new location
a.num = 2;
console.log('b2', b)//{num: 2} WOT! objects change in size so variables store a reference to them
// b and a will reference the same object changing the object in a, will change the value of b


var a = {num:1};
var b = a;
a = {num: 2};
console.log('b2', b)//{num: 1} We re assigned a to a new object, so the object b referes to hasn't been altered
