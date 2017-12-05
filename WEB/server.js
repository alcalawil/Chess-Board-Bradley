var  path         = require('path')
   , http         = require('http')
   , express      = require('express')
   , socket       = require('socket.io')
   , Chess        = require('chess.js').Chess
   , dgram        = require("dgram");

var  app          = express()
   , server       = http.createServer(app)
   , io           = socket.listen(server)
   , game         = new Chess()
   , server2      = dgram.createSocket("udp4");

// Settings
app.set('port', process.env.PORT || 8095);
app.use(express.static(path.join(__dirname, 'public')));
// Middleware
//app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.post('/endpoint',function(req, res) {
   console.log('request POST');
   res.send(req.body);
})


var mysocket = 0;
io.on('connection', function(client) {  
   console.log('index Client connected...');
   var PosicionIncial = game.fen();
   client.emit('inicial',"" + PosicionIncial);
   client.on('join', function(data) {
      console.log(data);        
   });
   mysocket = client;
    
});

// And away we go
server.listen(app.get('port'), function(){
   console.log('Socket.IO Chess is listening on port ' + app.get('port'));
});


/*****************************************/
//Scoket 2 que escucha a la app c#


server2.on("message", function (msg, rinfo) {
   console.log("msg: " + msg);
   var datoUDP = "" + msg;
   var firstChar = datoUDP.substring(0, 1);
   datoUDP = datoUDP.replace(firstChar,"");
   if (mysocket != 0) {
      var eventSocket = "";
      var datoEnviar = "";
      switch (firstChar) {
         case 'J':
            eventSocket = 'jugada';
            datoEnviar = GenerarPosicion(datoUDP);
            break;
         case 'C':
            eventSocket = 'casilla';
            datoEnviar = datoUDP;
            break;
         case 'R':
            eventSocket = 'reloj';
            datoEnviar = datoUDP;
            break;
         case 'S':
            //ReproducirSonido
            break;
      }
      console.log(eventSocket + " :" + datoEnviar);
      mysocket.emit(eventSocket, datoEnviar);
      mysocket.broadcast.emit(eventSocket, datoEnviar);
   }
});

server2.on("listening", function () {
   var address = server2.address();
   console.log("udp server listening " + address.address + ":" + address.port);
});

server2.bind(41181);

function Reproducir(reloj) {
   var Clocks = reloj.split(";");
   //play("Blancas");
   //play(Clocks[0]);
   //play("Segundos");
   //play("Negras");
   //play(Clocks[1]);
   //play("Segundos");
}

function GenerarPosicion(dato) {
   game.move(dato,{
      sloppy: true,
      promotion: 'q'
   });
   var posicion = game.fen();
   return posicion;
 }
  