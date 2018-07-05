var TaskModel = function(){
  this.tasks = [];
  this.seletedTasks = [];
  this.addTaskEvent = new Event(this);
  this.removeTaskEvent = new Event(this);
  this.setTastksAsCompletedEvent = new Event(this);
  this.deleteTaskEvent = new Event(this);
}

TaskModel.prototype = {
  
  addTask: function(task){
    this.tasks.push({
      taskName: task,
      taskStatus: 'uncompleted'
    });

    this.addTaskEvent.notify();
  },

  getTasks: function(){
    return this.tasks;
  },

  setSeletedTask: function(taskIndex){
    this.seletedTasks.push(taskIndex);
  },

  unselectTask: function(taskIndex){
    this.selectedTasks.splice(taskIndex, 1);
  },

  setTasksAsComplete: function(){
    var selectedTasks = this.seletedTasks;
    for(var index in selectedTasks){
      this.tasks[selectedTasks[index]].taskStatus = 'completed';
    }

    this.setTastksAsCompletedEvent.notify();

    this.selectedTasks = [];
  },

  deleteTasks: function(){
    var seletedTasks = this.selectedTasks.sort();

    for (var i = selectedTasks.length - 1; i >= 0; i--) {
      this.tasks.splice(this.seletedTasks[i], 1);
    }

    this.selectedTasks = [];

    this.deleteTasksEvent.notify();
  }

}