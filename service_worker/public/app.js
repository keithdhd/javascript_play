window.onload = function(){
  navigator.serviceWorker.register("/sw.js").then(function(){
    console.log("Yay! Registered");
  })
}