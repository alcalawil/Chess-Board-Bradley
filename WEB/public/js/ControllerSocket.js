
  var socket = io.connect();
  socket.on('field', function (data) {
    console.log(data);
    var vPrimerCaracter = data.substring(0,1);
    if(data != null &&  vPrimerCaracter == "R") {
      var Reloj = data.replace(vPrimerCaracter,"");
      MostrarReloj(Reloj);
    } else {
      Interpretar(data);
    }
  });

  function MostrarReloj(reloj) {
    var TiempoEnSegundos = reloj.split(';');
    clockBlanco.setTime(TiempoEnSegundos[0]);
    clockNegro.setTime(TiempoEnSegundos[1]);
  }



  $(document).ready(function() {
        	socket.on('connect', function(data) {
        		socket.emit('join','Hello World');
        	});
  });
