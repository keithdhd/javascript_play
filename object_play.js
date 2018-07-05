var countries = {
  uk      : 60000000,
  germany : 90000000,
  france  : 70000000, 
  malaysia: 100000000
}

var getPopulation = function(country){
  return countries[country];
}

countries.japan = 85000000;
countries["singapore"] = 3200000;

console.log(getPopulation("singapore"));

var Guitar = function(brand){
  this.brand = brand;
}

var gretsch = new Guitar("Gretsch");
gretsch.model = "6125";
gretsch["color"] = "two-tone cadiallac green";

console.log(gretsch);







