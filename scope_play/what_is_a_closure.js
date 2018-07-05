var outer = function(){
  var person = "MiniTest";

  var inner = function(){
    console.log('looking for person', person);
  }

  inner();
}

outer();