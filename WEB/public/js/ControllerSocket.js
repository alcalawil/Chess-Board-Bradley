var socket = io.connect();
socket.on('field', function(data) {
   console.log(data);
   var vPrimerCaracter = data.substring(0, 1);
   if (data != null && vPrimerCaracter == "R") {
      var Reloj = data.replace(vPrimerCaracter, "");

   } else {
      Interpretar(data);
   }
});
//Events 
socket.on('inicial', function(data) {
   console.log("Inicial " + data);
   ActualizarPosicion(data);
});

socket.on('jugada', function(data) {
   console.log(data);
   ActualizarPosicion(data);
});

socket.on('casilla', function(data) {
   console.log(data);
   Remarcar(data);
});

socket.on('reloj', function(data) {
   console.log(data);
   MostrarReloj(data);
});



function MostrarReloj(reloj) {
   var TiempoEnSegundos = reloj.split(';');
   clockBlanco.setTime(TiempoEnSegundos[0]);
   clockNegro.setTime(TiempoEnSegundos[1]);
}

var SendRequest = function(argument) {
   var data = {};
   data.title = "title";
   data.message = "message";
   //console.log('URL: ' + window.location.href);
   $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: window.location.href +'endpoint',
      success: function(data) {
            console.log('success');
            $("#status").text('Conectado');
         }, 
      error: function() { 
         console.log('error');
         $("#status").text('Desconectado');
      }
   });
}

$(document).ready(function() {
   socket.on('connect', function(data) {
      socket.emit('join', 'Hello World');
   });
});

window.setInterval(SendRequest, 3000);