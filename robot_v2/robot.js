class Robot {

  constructor (positions, instructions){
    this.x            = parseInt(positions.split(" ")[0]);
    this.y            = parseInt(positions.split(" ")[1]);
    this.direction    = positions.split(" ")[2];
    this.instructions = instructions.split("");
  }

  turn (direction) {
    const turningMap = {
        'L': {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'},
        'R': {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
    };

    this.direction = turningMap[direction][this.direction];
  }

  move () {
    const moveMap = {
      'N': {x:this.x, y:this.y + 1},
      'E': {x:this.x + 1, y:this.y},
      'S': {x:this.x, y:this.y - 1},
      'W': {x:this.x - 1, y:this.y},
    } 

    this.x = moveMap[this.direction].x;
    this.y = moveMap[this.direction].y;
  }

}

module.exports = Robot;