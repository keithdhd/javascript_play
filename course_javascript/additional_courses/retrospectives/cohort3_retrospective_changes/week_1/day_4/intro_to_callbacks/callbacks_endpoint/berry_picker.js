var squashBerries = function(){
  console.log('squash, squash, squash them berries');
}

var makeJam = function(){
  squashBerries();
  console.log('make jam');
}

var berryPicker = {
  pickBerries: function(){
    console.log('I am picking berries. I may be some time.');

    setTimeout(function(){
      this.onPickBerries();
    }.bind(this), 2000)
  
  },
  onPickBerries: null  
}


berryPicker.onPickBerries = makeJam;
berryPicker.pickBerries();