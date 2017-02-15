//Constructor for every Game
function Game (player) {
  this.player = player;
  this.board = [
    [null, null, null, null, null, null, null, null, null, null], //0
    [null, null, null, null, null, null, null, null, null, null], //1
    [null, null, null, null, null, null, null, null, null, null], //2
    [null, null, null, null, null, null, null, null, null, null], //3
    [null, null, null, null, null, null, null, null, null, null], //4
    [null, null, null, null, null, null, null, null, null, null], //5
    [null, null, null, null, null, null, null, null, null, null], //6
    [null, null, null, null, null, null, null, null, null, null], //7
    [null, null, null, null, null, null, null, null, null, null], //8
  ];
  this.diglett = 1;
  this.dugtrio = 2;
  this.alakazam = 3;
  this.score = 0;
}

//Choose one random Index in a random Column - Function
Game.prototype.wildDiglettAppears = function(hide) {

  //Picking a random Bush for a DIGLETT, by picking a random Row and then a random Column inside:
  var randomRow = Math.floor(Math.random() * this.board.length);
  var randomCol = Math.floor(Math.random() * this.board[randomRow].length);
  var randomDiglett = this.board[randomRow][randomCol];
  // console.log('My random Bush for Diglett is located at Row: ' + randomRow + ' and Column: ' + randomCol);

  //Picking a random Bush for a DUGTRIO, by picking a random Row and then a random Column:
  var randomRow2 = Math.floor(Math.random() * this.board.length);
  var randomCol2 = Math.floor(Math.random() * this.board[randomRow].length);
  var randomDugtrio = this.board[randomRow2][randomCol2];
  // console.log('My random Bush for Dugtrio is located at Row: ' + randomRow2 + ' and Column: ' + randomCol2);
  var randomRow3 = Math.floor(Math.random() * this.board.length);
  var randomCol3 = Math.floor(Math.random() * this.board[randomRow].length);
  var randomAlakazam = this.board[randomRow3][randomCol3];

  var that = this;
  var x = Math.random();
  //Inserting one random (Diglett = 1) and one random (Dugtrio = 2) into the array
  if (x > 0.3 ) {
    setTimeout(function(){
      that.board[randomRow2][randomCol2] = 2;
    }, 120);
  }

  if ( x > 0.7) {
    this.board[randomRow][randomCol] = 1;
  }

  if (x > 0.95 ) {
    this.board[randomRow][randomCol] = 3;
  }

  setTimeout(function(){
    if (that.board[randomRow][randomCol] === 1 || that.board[randomRow2][randomCol2] === 2 || this.board[randomRow][randomCol] === 3) {
      that.board[randomRow][randomCol] = null;
      that.board[randomRow2][randomCol2] = null;
      that.board[randomRow3][randomCol3] = null;
      // console.log('My second board: ' + that.board);
    }
  }, hide);

};

Game.prototype.removeMole = function (row, column) {
    this.board[row][column] = null;
};

Game.prototype.removeAllMoles = function () {
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[i].length; j++) {
      this.board[i][j] = null;
    }
  }
};
