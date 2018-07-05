class Guitar implements Playable{
  constructor(numberOfStrings : number){
    console.log(numberOfStrings)
  }

  play(tune){
    return "I am playing " + tune;
  }
}

interface Playable {
  play(tune: string) : string
}

var guitar = new Guitar(6);
console.log(guitar.play("Highway to Hell"));