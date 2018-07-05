
var once = function(func) {
  var beenCalled = false;
  var answer;
  return function() {
    if (beenCalled === true) {
      return answer;
    } else {
      beenCalled = true;
      answer = func();
      return answer;
    }
  }
}

var makeBankCharge = function(num, price){
   //charges bank account for a certain price
   console.log(num, price);
 };
 var processPaymentOnce = once(makeBankCharge);
 processPaymentOnce(0987654321, 10);