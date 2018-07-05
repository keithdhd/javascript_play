console.log(foo);
var foo = 2;
var notHoisted;

hoisted(); // logs "foo"

function hoisted() {
  console.log("foo");
}

console.log(typeof(notHoisted));//undefined

notHoisted = function(){
  //something
}

notHoisted();