var path         = require('path')
  , http         = require('http')
  , express      = require('express')
  , socket       = require('socket.io');

var app    = express()
  , server = http.createServer(app)
  , io     = socket.listen(server);

// Settings
app.set('port', process.env.PORT || 8095);

// Middleware
//app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

var mysocket = 0;
io.on('connection', function(client) {  
    console.log('index Client connected...');

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
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  console.log("msg: " + msg);
  if (mysocket != 0) {
     mysocket.emit('field', "" + msg);
     mysocket.broadcast.emit('field', "" + msg);
     if(msg.substring(0, 1) == 'S') {
      Reproducir(msg);
     }
     
  }
});
server.on("listening", function () {
  var address = server.address();
  console.log("udp server listening " + address.address + ":" + address.port);
});

server.bind(41181);

function Reproducir(reloj) {
  var Clocks = reloj.split(';');
  //play("Blancas");
  //play(Clocks[0]);
  //play("Segundos");
  //play("Negras");
  //play(Clocks[1]);
  //play("Segundos");
}