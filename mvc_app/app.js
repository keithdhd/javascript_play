window.onload = function(){

  //http://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html



  var model = new TaskModel();
  var view = new TaskView(model);
  var controller = new TaskController(model, view);
}