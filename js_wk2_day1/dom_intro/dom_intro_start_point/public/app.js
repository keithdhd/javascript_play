console.log("This is JavaScript calling!");

window.onload = init;

function init(){
  console.log("The DOM has loaded successfully.");
}

console.log(window.onload);