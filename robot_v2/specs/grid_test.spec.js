const Grid = require('./../grid');

describe("grid", function() {

  var grid;

  beforeEach( function(){
    grid = new Grid(5, 3);
  });

  it("should return true if off grid 6, 3", function() {
    expect(grid.isOffGrid(6, 3)).toBeTruthy();
  });

  it("should return true if off grid 4, 4", function() {
    expect(grid.isOffGrid(4, 4)).toBeTruthy();
  });

  it("should return true if off grid -1, 3", function() {
    expect(grid.isOffGrid(-1, 3)).toBeTruthy();
  });

  it("should return true if off grid 6, 3", function() {
    expect(grid.isOffGrid(5, -1)).toBeTruthy();
  });

  it("should set square as scented", function() {
    grid.setScent(2, 3);
    expect(grid.isScented(2, 3)).toBeTruthy();
  });

  it("should return true if square is scented", function() {
    grid.scents.push("23");
    expect(grid.isScented(2, 3)).toBeTruthy();
  });  

  it("should return false if square is scented", function() {
    grid.scents.push("23");
    grid.scents.push("30");
    expect(grid.isScented(5, 3)).toBeFalsy();
  });  

});