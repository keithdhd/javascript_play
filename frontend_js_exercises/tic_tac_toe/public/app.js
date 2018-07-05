var state = localStorage.getItem('ticTacToe') || [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ]
];

function init(){
  var board = document.getElementsByTagName('table')[0].children[1].children;
  populate(board);
}

function populate (board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].children.length; j++) {
      board[i].children[j].innerHTML = state[i][j];
    }
  }
  console.log(nextPlayer());
}

function nextPlayer () {
  var numberOfx = numberOfTiles("x", state);
  var numberOfo = numberOfTiles("o", state);

  if(numberOfx <= numberOfo){
    return 'x';
  }
  return 'o';
}

function findWinner (board) {
    
}

function numberOfTiles(tile, state){
  var flattenedState = state.reduce(function(a, b){
    return a.concat(b);
  });

  return count(flattenedState, tile);
}

function count(arr, tile){
  var filtered = arr.filter(function(item){
    return item === tile;
  });

  return filtered.length;
}

window.onload = init;

