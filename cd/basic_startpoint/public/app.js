window.onload = function(){
  console.log('App started');
  var canvas = document.getElementById('main');
  var context = canvas.getContext('2d');
  
  context.fillStyle = 'blue';
  context.fillRect(10, 10, 50, 50);

  context.beginPath();
  context.moveTo(100,100);
  context.lineTo(100,150);
  context.stroke();

  var drawCircle = function(x,y){
    context.beginPath();
    context.arc(x, y, 20, 0, 2*Math.PI,false);
    context.stroke();
  }

  canvas.onclick = function(event){
    console.log('clicked', event);
    drawCircle(event.x, event.y);
  }

};
