describe('calculator functionality', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true; // a bit of functionality to tell Protractor we're not using Angular...
    browser.get('http://0.0.0.0:8000');
  });

  it('should multiply 3x5 and get 15', function() {
    element(by.id('amount1')).sendKeys('5');
    element(by.id('amount2')).sendKeys('3');
    element(by.id('multiplyButton')).click();
    expect(element(by.id('result')).getText()).toBe('15');
  });
});