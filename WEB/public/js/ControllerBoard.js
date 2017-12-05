/*var board,
  game = new Chess();
*/
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


var cfg = {
  draggable: false
};

board = ChessBoard('board', cfg);

function Interpretar (dato) {
   if(dato != null) {
      console.log(dato);
      var vPrimerCaracter = dato.substring(0,1);

      if(vPrimerCaracter == "X") {
         var jugada = dato.replace(vPrimerCaracter,"");
         mover(jugada);
         DesmarcarTodas();
      } else if (vPrimerCaracter  == "C") {
         var casilla = dato.replace(vPrimerCaracter,"");
         Remarcar(casilla);
      } 
   }
}


function ActualizarPosicion(fen) { 
   board.position(fen);  
   DesmarcarTodas();
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