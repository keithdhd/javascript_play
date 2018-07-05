var Robot = require('../robot');

describe("robot", function() {

  var robot;

  beforeEach( function(){
    robot = new Robot("1 1 E", "RFRFRFRF");
  });

  it("should have x position 1", function() {
    expect(robot.x).toEqual(1);
  });

  it("should have y position 1", function() {
    expect(robot.y).toEqual(1);
  });

  it("should have direction E", function() {
    expect(robot.direction).toEqual('E');
  });

  it("should have instructions RFRFRFRF as array", function() {
    expect(robot.instructions).toEqual(['R','F','R','F','R','F','R','F']);
  });

  it("should have direction S", function() {
    robot.turn('R');
    expect(robot.direction).toEqual('S');
  });

  it("should have direction N", function() {
    robot.turn('L');
    expect(robot.direction).toEqual('N');
  });

  it("should have y position 1", function() {
    robot.move();
    expect(robot.y).toEqual(1);
  });
  
  it("should have x position 2", function() {
    robot.move();
    expect(robot.x).toEqual(2);
  });
});
