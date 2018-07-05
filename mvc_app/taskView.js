var TaskView = function (model) {
    this.model = model;
    this.addTaskEvent = new Event(this);
    this.selectTaskEvent = new Event(this);
    this.unselectTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

    this.init();
};

TaskView.prototype = {

  init: function(){
    this.createChildren().setUpHandlers().enable();
  },

  createChildren: function(){
    this.container = document.getElementById('js-container');
    this.addTaskButton = document.getElementById('js-add-task-button');
    this.taskTextBox = document.getElementById('js-task-textbox');
    this.tasksContainer = document.getElementById('js-tasks-container');

    return this;
  },

  setUpHandlers: function(){
    this.addTaskButtonHandler = this.addTaskButton.bind(this);
    console.log(this.addTaskButtonHandler);
    this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
    this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
    this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

     /**
     Handlers from Event Dispatcher
     */
     this.addTaskHandler = this.addTask.bind(this);
     this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
     this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
     this.deleteTasksHandler = this.deleteTasks.bind(this);

     return this;
  },

  enable: function(){
    this.addTaskButton.onclick = this.addTaskButtonHandler;

    this.container.onclick', '.js-task', this.selectOrUnselectTaskHandler);
    this.container.onclick', '.js-complete-task-button', this.completeTaskButtonHandler);
    this.container.onclick', '.js-delete-task-button', this.deleteTaskButtonHandler);

    /**
     * Event Dispatcher
     */
    this.model.addTaskEvent.attach(this.addTaskHandler);
    this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
    this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
    this.model.deleteTasksEvent.attach(this.deleteTasksHandler);

    return this;
  }

}