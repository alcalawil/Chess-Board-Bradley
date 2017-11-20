var board,
  game = new Chess();

var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);
  
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
  // do not pick up pieces if the game is over
  // or if it's not that side's turn
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  removeGreySquares();

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
};

var onMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var onSnapEnd = function() {
  board.position(game.fen());
};

var cfg = {
  draggable: false,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};

board = ChessBoard('board', cfg);

function Interpretar (dato) {
   if(dato != null) {
      console.log(dato);
      var vPrimerCaracter = dato.substring(0,1);

      if(vPrimerCaracter == "J") {
         var jugada = dato.replace(vPrimerCaracter,"");
         mover(jugada);
         DesmarcarTodas();
      } else if (vPrimerCaracter  == "C") {
         var casilla = dato.replace(vPrimerCaracter,"");
         Remarcar(casilla);
      } /*else if (vPrimerCaracter == "R") {
        var turno = dato.replace(vPrimerCaracter,"");
        if(turno == "Negras") {
          clockNegro.start();
          clockBlanco.stop();
        } else if (turno == "Blancas") {
          clockNegro.stop();
          clockBlanco.start();
        } else if(turno == "Stop") {
          clockNegro.stop();
          clockBlanco.stop();
        } else if(turno == "Reset") {
          clockNegro.reset();
          clockBlanco.reset();
          clockBlanco.setTime(300);
          clockNegro.setTime(300);
        } 

      }*/
   }
}


function mover(jugada) {
   //var jugada = document.getElementById('in').value;
   var movimiento = jugada.split("-");
   var vFrom = movimiento[0];
   var vTo = movimiento[1];

   game.move({ from: vFrom, to: vTo});
   console.log(game.fen());
   board.position(game.fen());  
   
} 
function Remarcar(square) {
   var squareEl = $('#board .square-' + square);
  
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }
  squareEl.css('background', background);
}

function DesmarcarTodas() {
   $('#board .square-55d63').css('background', '');
}

$('#whiteOrientationBtn').on('click', function() {
  board.orientation('white');
});

$('#blackOrientationBtn').on('click', function() {
  board.orientation('black');
});

$(".switch").click(function(){
	if ($('#switch').is(':checked')) {
		board.orientation('black');
	}else{
		board.orientation('white');
	}
})

$(window).resize(board.resize)