var myGame;

$(document).ready(function(){

  $('#popup').fadeIn(2000, function(){

    $('#popup').on('click', function(){
      ion.sound.play("click");
      $('#popup').fadeOut(300);
    });
  });

ion.sound({
   sounds: [
     {name: "Pokemon", volume: 0.8},
     {name: "PokeOpening", volume: 0.3},
     {name: "TicToc", volume: 0.8},
     {name: "Heartbeat20s", volume: 0.6},
     {name: "Finish", volume: 1.7},
     {name: "Catch", volume: 1.0},
     {name: "click", volume: 1.0},
     {name: "Alakazam", volume: 2.5}
   ],
   volume: 1.0,
   path: "./js/sounds/",
   preload: true
 });

 ion.sound.play("PokeOpening");
    //Update Score
  var score = 0;

  $('#container').on('click', '.mole1', function(){
    score++;
    $('#score').html(score);
    ion.sound.play("Catch");
    $(this).removeClass('mole1');
    myGame.removeMole($(this).data('row'), $(this).data('col'));
    renderBoard();
  });

  $('#container').on('click', '.mole2', function(){
    score = score - 3;
    $('#score').html(score);
    $(this).removeClass('mole2');
    myGame.removeMole($(this).data('row'), $(this).data('col'));
    renderBoard();
  });

  $('#container').on('click', '.mole3', function(){
    score = score + 5;
    $('#score').html(score);
    ion.sound.play("Alakazam");
    changeBackground();
    $(this).removeClass('mole3');
    myGame.removeMole($(this).data('row'), $(this).data('col'));
    renderBoard();
  });

  function changeBackground(){
    $('.backgroundchange').fadeIn(1000);
    // $('body').css({'background': 'url(../img/GifBackground2.gif)', 'background-repeat': 'no-repeat', 'background-size': 'cover'});
    setTimeout(function(){
      $('.backgroundchange').fadeOut(1000);
      // $('body').css('background', 'linear-gradient(45deg, rgba(163,196,149,1) 0%, rgba(0,128,128,1) 100%');
    }, 500);
  }


  function startGame(){
    $('#timer').html('50'); $('#score').html('0');
    gameTimer(); score = 0; var timer = 50;
    ion.sound.stop(); ion.sound.play("Pokemon");

    var interval2 = setInterval(function(){
      console.log(timer);
      if (timer === 0) {
        ion.sound.play("Finish");
        clearInterval(interval2);

      } else if (timer <= 5) {
        ion.sound.play("TicToc");
        myGame.wildDiglettAppears(500);
        myGame.wildDiglettAppears(500);
        myGame.wildDiglettAppears(500);
        myGame.wildDiglettAppears(500);
        renderBoard();

      } else if (timer <= 10) {
        myGame.wildDiglettAppears(600);
        myGame.wildDiglettAppears(600);
        myGame.wildDiglettAppears(600);
        myGame.wildDiglettAppears(600);
        renderBoard();

      } else if (timer <= 20) {
        ion.sound.play("Heartbeat20s");
        myGame.wildDiglettAppears(800);
        myGame.wildDiglettAppears(800);
        myGame.wildDiglettAppears(800);
        renderBoard();

      } else if (timer <= 30 ) {
        myGame.wildDiglettAppears(900);
        myGame.wildDiglettAppears(900);
        renderBoard();

      } else if (timer <= 40) {
        myGame.wildDiglettAppears(3000);
        myGame.wildDiglettAppears(3000);
        renderBoard();

      } else if (timer <= 50) {
        myGame.wildDiglettAppears(3000);
        renderBoard();
      }
    }, 500);
  }

  myGame = new Game('Walter');

  function gameTimer (){
    timer = 50;

    var interval = setInterval(function(){
      timer = timer - 1;
      $('#timer').html(timer);

      if (timer === 0) {
        myGame.removeAllMoles();
        renderBoard();

        clearInterval(interval);
      }
    }, 1000);
  }


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
        } else if (col === 3) {
          pokemon = 'mole3';
        } else {
          pokemon = '';             //Grass
        }

        var slotHtml = '<div class="hole '+pokemon+'" data-row="'+rowIndex+'" data-col="'+colIndex+'" ></div>';

        $('#container').append(slotHtml);
      });
    });
  }


  //Start Game on Start press.
  $('#start').on('click', function(){
    ion.sound.stop();
    ion.sound.play("click");
    startGame();
  });

  //Instructions-Button Pop Up
  $('#instructions').on('click', function(e){
    e.stopPropagation();
    ion.sound.play("click");
    $('header, section  ').css('filter', 'blur(5px)');
    $('#popup').fadeIn(300, function(){

      $('#popup').on('click', function(){
        $('header, section, body span.html').css('filter', 'none');
        ion.sound.play("click");
        e.stopPropagation();
        $('#popup').fadeOut(300);
      });
    });
  });

  //Start-Button Pop Up

});



//Render Board
