function Planet() {
  this.inhabitants = ["Keith", "Jay", "Rick", "Valerie"];
  this.foodCount = 100;
  this.primeMinister = "Some Dude"
  this.ship = new Ship();

  this.getSupplies = function(callback){
    console.log("See you in two years, getting supplies");
    this.ship.launch();
    var self = this;

    setTimeout(function(){
      self.foodCount = callback();
      console.log(self.foodCount);
    }, 10000);
  };

  this.holdElection = function(){
    this.primeMinister = this.inhabitants.unshift;
    console.log("We have elected a corrupt billionaire with weird hair");
  };

  this.civilWar = function(){
    this.foodCount = 0;
    console.log(this.foodCount);
    console.log("We didn't like the billionaire, war!!!");
  };
}

function Ship(callback) {
  this.launch = function(){
    console.log("Ship has launched");
  };
}

function supplyReturn(){
  console.log("Food is on it's way, returning home")
  return 100;
}

var mercury = new Planet();

mercury.getSupplies(supplyReturn);
mercury.holdElection();
mercury.civilWar();