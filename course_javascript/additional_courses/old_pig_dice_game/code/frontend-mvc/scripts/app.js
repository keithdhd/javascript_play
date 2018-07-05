MainView = require('./views/main.js')
window.onload = function(){
  console.log('js in play', MainView);
  mainView = new MainView();
  mainView.render(document.body);
  console.log('mainView', mainView)
}
