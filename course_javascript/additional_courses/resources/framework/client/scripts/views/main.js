// var template = require("./main.handlebars");
var MainView = function(model, templateName){
  var template = require("./main.handlebars");
  this.model = model;
  this.el = document.createElement('div');
  this.template = template(model);
}

MainView.prototype = {
  render: function(parentElement){
    this.el.innerHTML = this.template;
    parentElement.appendChild(this.el);
  }
}

module.exports = MainView
