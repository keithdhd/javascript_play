// Most of ES6 is a better way of communicating what we've already been doing
// There is very little in ES6 that we can't already do
// All the existing stuff still exists
// Look at ES6 as a way to improve the readability of our code
// MOST of us will have jobs where we are working on existing code. Readability is more important than less characters

// ES5
var doSomeMaths = function (x, y){
  return x + y;
}

// ES6
var doSomeMaths = (x, y) => x + y;
const singleArgument = x => `I'm gonna add 1! ${x + 1}`

console.log(doSomeMaths(3, 4));
console.log(singleArgument(4));


const https = require('https');

class CountryFetcher {
  constructor() {
    this.countries = [];
  }

  fetchCountries() {
    var callback  = response => {
      console.log(this.countries)
    };

    https
      .get('https://restcountries.eu/rest/v2/all', callback)
      .end();
  }
}

var countryFetcher = new CountryFetcher();
countryFetcher.fetchCountries();