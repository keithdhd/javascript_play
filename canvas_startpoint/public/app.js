window.onload = function(){
  var canvas = document.getElementById('main');
  console.log(canvas);
  var context = canvas.getContext('2d');
  var points = [];
  var numPoints = 50;
  var bounce = -1;

  for(i = 0; i < numPoints; i += 1) {
      points.push({x:Math.random() * context.width,
                   y:Math.random() * context.height,
                   vx:Math.random() * 10 - 5,
                   vy:Math.random() * 10 - 5});
  }
      
  
  context.fillStyle = "tomato";
  context.fillRect(10, 10, 50, 50);

  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(100, 150);
  context.stroke();

  for (var i = 0; i < 10; i++) {
    context.beginPath();
    context.arc((35+i*20), (75+i*10), 10, 0, Math.PI*2, true); 
    context.closePath();
    context.fill();
  }

  canvas.onclick = function(e){
    drawCircle(e.x, e.y, context);
  }

  setInterval(function() {
      drawCircle(Math.random()*100, Math.random()*100, context);
  }, 1000);

}

function drawCircle(x, y, context){
  context.beginPath();
  context.arc(x, y, 20, 0, Math.PI*2, true); 
  context.closePath();
  context.fill();
}






