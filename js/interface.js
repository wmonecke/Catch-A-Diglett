var myGame;

$(document).ready(function(){

  $('#popup').fadeIn(2000, function(){
    $("#sentence").typed({
        strings: ["Hey there, Pokemon trainer! Welcome to Catch-A-Diglett! ^1000", "Catch as many Digletts as you can under the time limit.", "Watch out for Dugtrios,\n they are stronger than you and you will lose points!",
        "Every Diglett gives you 1 point. If you fight a Dugtrio you'll lose 3!", "You might encounter Alakazam's, which will give you 5 points!!", "Or maybe you'll encounter a..^1000.... ^1000 Legendary Pokemon^1000", "GO CATCH 'EM ALL!"],
        typeSpeed: 0,
        cursorChar: ""
      });

    $('#popup').on('click', function(){
      ion.sound.play("click");
      ion.sound.play("Pika");
      $('#popup').fadeOut(300);
    });
  });

ion.sound({
   sounds: [
     {name: "Pokemon2", volume: 0.5},
     {name: "PokeOpening", volume: 0.3},
     {name: "TicToc", volume: 0.8},
     {name: "Heartbeat20s", volume: 0.6},
     {name: "Finish", volume: 2.0},
     {name: "Catch", volume: 1.0},
     {name: "click", volume: 1.0},
     {name: "Alakazam", volume: 0.7},
     {name: "Pika", volume: 0.4},
     {name: "MewTwo", volume: 1.0}
   ],
   volume: 1.0,
   path: "./js/sounds/",
   multiplay: true,
   preload: true
 });

 ion.sound.play("PokeOpening");
    //Update Score
  var score = 0;

  $('#container').on('click', '.mole1', function(){
    score++;
    console.log(this);
    $(this).append('<span id="span">+ 1</span>');
    $('#span').fadeIn(50);
    $('#score').html(score);
    ion.sound.play("Catch");
    $(this).removeClass('mole1');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

    var that = this;
    setTimeout(function(){
      renderBoard();
      $(that).remove('span');
    }, 1000);
  });

  $('#container').on('click', '.mole2', function(){
    score = score - 3;
    $(this).append('<span id="span">- 3</span>');
    $('#span').fadeIn(50);
    $('#score').html(score);
    $(this).removeClass('mole2');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

    var that = this;
    setTimeout(function(){
      renderBoard();
      $(that).remove('span');
    }, 1000);
  });

  $('#container').on('click', '.mole3', function(){
    score = score + 5;
    $(this).append('<span id="span">+ 5</span>');
    $('#span').fadeIn(50);
    $('#score').html(score);
    ion.sound.play("Alakazam");
    changeBackground();
    $(this).removeClass('mole3');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

    var that = this;
    setTimeout(function(){
      renderBoard();
      $(that).remove('span');
    }, 1000);
  });

  $('#container').on('click', '.mole4', function(){
    score = score + 10;
    $(this).append('<span id="span">+ 10</span>');
    $('#span').fadeIn(50);
    ion.sound.play("MewTwo");
    $('#score').html(score);
    backgroundlegendary();
    $(this).removeClass('mole4');
    myGame.removeMole($(this).data('row'), $(this).data('col'));

    var that = this;
    setTimeout(function(){
      renderBoard();
      $(that).remove('span');
    }, 1000);
  });

  function backgroundlegendary(){
    $('.backgroundlegendary').fadeIn(1000);
    setTimeout(function(){
      $('.backgroundlegendary').fadeOut(1000);
      // $('body').css('background', 'linear-gradient(45deg, rgba(163,196,149,1) 0%, rgba(0,128,128,1) 100%');
    }, 4000);
  }

  function changeBackground(){
    $('.backgroundchange').fadeIn(1000);
    // $('body').css({'background': 'url(../img/GifBackground2.gif)', 'background-repeat': 'no-repeat', 'background-size': 'cover'});
    setTimeout(function(){
      $('.backgroundchange').fadeOut(1000);
      // $('body').css('background', 'linear-gradient(45deg, rgba(163,196,149,1) 0%, rgba(0,128,128,1) 100%');
    }, 500);
  }


  function startGame(){
    $('#timer').html('50');
    score = 0;
    $('#score').html('0');
    gameTimer();
    ion.sound.stop();
    ion.sound.play("Pokemon2");
    var interval2 = setInterval(function(){
      console.log(timer);

      if(timer === 5){
        ion.sound.play("TicToc");
      }

      if(timer === 20){
        ion.sound.play("Heartbeat20s");
      }

      if (timer === 0) {
        ion.sound.stop();
        ion.sound.play("Finish");
        clearInterval(interval2);
        renderBoard();

      } else if (timer <= 5) {
        myGame.wildDiglettAppears(1000);
        myGame.wildDiglettAppears(1000);
        myGame.wildDiglettAppears(1000);
        myGame.wildDiglettAppears(1000);
        renderBoard();

        setTimeout(function(){
          renderBoard();
        }, 1000);

      } else if (timer <= 10) {
        myGame.wildDiglettAppears(1800);
        myGame.wildDiglettAppears(1800);
        myGame.wildDiglettAppears(1800);
        myGame.wildDiglettAppears(1800);
        renderBoard();

        setTimeout(function(){
          renderBoard();
        }, 1801);

      } else if (timer <= 20) {
        myGame.wildDiglettAppears(2000);
        myGame.wildDiglettAppears(2000);
        myGame.wildDiglettAppears(2000);
        renderBoard();
        setTimeout(function(){
          renderBoard();
        }, 2000);

      } else if (timer <= 30 ) {
        myGame.wildDiglettAppears(2500);
        myGame.wildDiglettAppears(2500);
        renderBoard();
        setTimeout(function(){
          renderBoard();
        }, 2500);

      } else if (timer <= 40) {
        myGame.wildDiglettAppears(3000);
        myGame.wildDiglettAppears(3000);
        renderBoard();
        setTimeout(function(){
          renderBoard();
        }, 3000);

      } else if (timer <= 50) {
        myGame.wildDiglettAppears(3000);
        renderBoard();
        setTimeout(function(){
          renderBoard();
        }, 3000);

      }
    }, 500);
  }

  myGame = new Game('Walter');

var timer = 50;

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
        } else  if (col === 4) {
          pokemon = 'mole4';
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
      $("#sentence").typed({
          strings: ["Hey there, Pokemon trainer! Welcome to Catch-A-Diglett!", "Catch as many Digletts as you can under the time limit.", "Watch out for Dugtrios, they are stronger than you and you will lose points!",
          "Every Diglett gives you 1 point. If you fight a Dugtrio you'll lose 3!", "You might encounter Alakazam's, which will give you 5 points!!", "Or maybe you'll encounter a ^1000 Legendary Pokemon...", "GO CATCH 'EM ALL!"],
          typeSpeed: 0,
          cursorChar: ""
        });

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
