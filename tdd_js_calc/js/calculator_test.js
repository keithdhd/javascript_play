function multipleThreeTimesThreeShouldBeNine() {
    var result = calculator.multiply(3,3);

  // Assert Result is expected
  if (result === 9) {
    console.log('Test Passed');
  } else {
    console.error('Test Failed');
  }
};

function runTests() {
  multipleThreeTimesThreeShouldBeNine();
}