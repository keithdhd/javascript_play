function GuessWho(){
  this.characters = [4, 6, 10, 20, 21, 43, 45, 60, 63, 65, 70, 80, 81, 82, 83, 85, 87, 88, 90];
}

GuessWho.prototype = {

  find: function(n, start=0, end=this.characters.length){

    let midPoint = Math.floor(this.characters.length/2);

    // Compare to middle number.
    // If smaller, repeat for upper section. If larger, repeat with lower section. If equals, return the position.
    if( n === this.characters[midPoint]){
      console.log("Found it!", midPoint);
      return midPoint;
    }

    else if(n < arrayToSearch[midPoint]){
      this.find( n, arrayToSearch.slice( 0, midPoint ) );
    }

    else{
      this.find( n, arrayToSearch.slice( midPoint ) );
    }

  }

}

let gw = new GuessWho();

console.log(gw.find(90));