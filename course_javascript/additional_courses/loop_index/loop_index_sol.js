var array = [1,2,3,4,5,6];
for (var i = 0; i < array.length; i++) {
  var createFunc = function(i){
    var display = function(){
      console.log('i', i);
    }
    return display
  }
  setTimeout(createFunc(i), 10)
}
