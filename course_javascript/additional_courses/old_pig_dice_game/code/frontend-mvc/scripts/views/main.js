
var MainView = function(){
  this.el = document.createElement('div');
  html = new EJS({url: 'main.ejs'}).render(data)
}

MainView.prototype = {
  render: function(parentElement){
    parentElement.appendChild(this.el)
  }
}

module.exports = MainView
