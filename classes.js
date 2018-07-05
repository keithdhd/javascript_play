class Rectangle {

  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  get area(){
    return this.calcArea();
  }

  calcArea(){
    return this.height * this.width;
  }

}

class Square extends Rectangle {

  constructor(colour, height){
    super(height, height);
    this.colour = colour;
  }

  getColour() {
       return this.colour;
  }

}

let square = new Square("red", 10);
console.log(square.getColour() + " " + square.area);
