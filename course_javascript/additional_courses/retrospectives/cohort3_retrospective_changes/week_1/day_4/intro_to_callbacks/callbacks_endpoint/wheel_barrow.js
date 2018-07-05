var wheelBarrow = {
  capacity: 100,
  currentVolume: 0,

  fill: function(amount){
    if(this.currentVolume + amount >= this.capacity){
      console.log("Barrow full!");

      if (typeof this.onFull === "function"){
        this.onFull();
      }
     
    }else{
      this.currentVolume = this.currentVolume + amount;
      console.log("New volume: " + this.currentVolume);
    }
  },

  onFull: null

}

wheelBarrow.onFull = function(){
  console.log("Moving the barrow");
};

wheelBarrow.fill(10);
wheelBarrow.fill(20);
wheelBarrow.fill(40);
wheelBarrow.fill(30);