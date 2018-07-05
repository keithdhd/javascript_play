// for ... in
// A for...in loop only iterates over enumerable properties. Use for looping over objects

//for (variable in object) { ...
//}


var obj = {
  a: 1, 
  b: 2, 
  c: 3
};
    
for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"


// for ... of
// The for...of statement creates a loop iterating over iterable objects like arrays
let animals = ['cat', 'dog', 'aligator'];

for (let a of animals) {
  console.log(a);
}

for (var i = Things.length - 1; i >= 0; i--) {
  Things[i]
}


