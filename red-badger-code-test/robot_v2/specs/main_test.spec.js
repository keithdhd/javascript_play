var robot = require('../robot');

describe("robot", function() {

  it("upper right is 5 3, position is 1 1 E, instructions are F", function() {
    var expectedOutput = "2 1 E";
    expect(robot.move(1, 1, "E", "F")).toEqual(expectedOutput);
  });

  it("upper right is 5 3, position is 2 3 S, instructions are F", function() {
    var expectedOutput = "2 3 S";
    expect(robot.move(2, 4, "S", "F")).toEqual(expectedOutput);
  });

  it("upper right is 5 3, position is 2 2 N, instructions are F", function() {
    var expectedOutput = "2 3 N";
    expect(robot.move(2, 2, "N", "F")).toEqual(expectedOutput);
  });

  it("upper right is 5 3, position is 1 1 E, instructions are RFRFRFRF", function() {
    var expectedOutput = "1 1 E";
    expect(robot.move(1, 1, "E", "RFRFRFRF")).toEqual(expectedOutput);
  });

  it("upper right is 5 3, position is 3 2 N, instructions are FRRFLLFFRRFLL", function() {
    var expectedOutput = "3 3 N LOST";
    expect(robot.move(3, 2, "N", "FRRFLLFFRRFLL")).toEqual(expectedOutput);
  });

  it("upper right is 5 3, position is 0 3 W, instructions are LLFFFLFLFL", function() {
    var expectedOutput = "2 3 S";
    expect(robot.move(0, 3, "W", "LLFFFLFLFL")).toEqual(expectedOutput);
  });
  
});
