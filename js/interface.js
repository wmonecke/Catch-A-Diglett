var myGame;

$(document).ready(function(){

    //Update Score
  var score = 0;

  $('#container').on('click', '.mole1', function(){
    score++;
    $('#score').html(score);
    $(this).removeClass('mole1');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

  });

  $('#container').on('click', '.mole2', function(){
    score = score - 3;
    $('#score').html(score);
    $(this).removeClass('mole2');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

  });

  function startGame(){
    setInterval(function(){
      myGame.wildDiglettAppears();
      renderBoard();
    }, 400);
  }

  myGame = new Game('Walter');

  //Render Board
  function renderBoard () {
    $('#container').empty();
    myGame.board.forEach(function (row, rowIndex) {
      row.forEach(function (col, colIndex) {
        var pokemon;

        if (col === 1) {
          pokemon = 'mole1';        //Diglett
        } else if (col === 2) {
          pokemon = 'mole2';        // Dugtrio
        } else {
          pokemon = '';             //Grass
        }

        var slotHtml = '<div class="hole '+pokemon+'" data-row="'+rowIndex+'" data-col="'+colIndex+'"></div>';
        $('#container').append(slotHtml);
      });
    });
  }


  //Start Game on Start press.
  $('#start').on('click', function(){
    startGame();
  });

  //Instructions-Button Pop Up
  $('#instructions').on('click', function(e){
    e.stopPropagation();
    $('#popup').fadeIn(300, function(){

      $('body').on('click', function(){
        e.stopPropagation();
        $('#popup').fadeOut(300);
      });
    });
  });

  //Start-Button Pop Up

});



//Render Board
