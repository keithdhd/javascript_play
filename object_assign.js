let animal = {
  animalType: 'animal',

  describe() {
    return `An ${this.animalType}, with ${this.furColour} fur,
    ${this.legs} legs and a ${this.tail} tail.`;
  }
};

let mouseFactory = function mouseFactory() {
  return Object.assign(Object.create(animal), {
    animalType: 'mouse',
    furColour: 'brown',
    legs: 4,
    tail: 'long, skinny'
  });
};

let mickey = mouseFactory();
let squeeky = mouseFactory();
console.log(mickey);
console.log(squeeky);
