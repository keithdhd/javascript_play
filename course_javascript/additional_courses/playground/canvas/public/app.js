window.onload = function(){
  var canvas = document.getElementById('main');
  console.log('canvas', canvas);
  var context = canvas.getContext('2d');

  //draw rectangle
  context.fillStyle = 'green';
  context.fillRect( 10, 10, 50, 50 );

  //draw line
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(100, 150);
  context.stroke();

  //draw circle


  canvas.onclick = function(event){
    context.beginPath();
    context.arc(event.x,event.y,20,0,Math.PI*2,false);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.arc(event.x+10,event.y+10,20,0,Math.PI*2,false);
    context.stroke();
  }

}
