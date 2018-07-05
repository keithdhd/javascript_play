var myObj = {name: "Keith"};
var str = "Argyle Bar";

var play = function(obj, str){
  obj.name = "Chuck";
  str = "The Earl";
  console.log(str);
}

play(myObj, str);
console.log(myObj.name, str);