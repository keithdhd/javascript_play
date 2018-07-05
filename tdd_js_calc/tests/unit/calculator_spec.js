describe('calculator',function(){
  it('should multiply 3x3 and get 9',function(){
    expect(calculator.multiply(3,3)).toEqual(9);
  });
  it('should add 4+5 and get 9',function(){
    expect(calculator.add(4,5)).toEqual(9);
  });
});