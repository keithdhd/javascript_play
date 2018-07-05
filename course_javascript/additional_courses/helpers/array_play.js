var _ = require('lodash');

var a = [1,2,3,4,5,6,7];

var even = _.filter(a, function(num){
  return num %2 === 0;
});

console.log('even', even);
