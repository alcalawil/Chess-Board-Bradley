//var clock;
var clockBlanco, clockNegro;	
$(document).ready(function() {
	

	clockBlanco = $('#clockBlanco').FlipClock({
        clockFace: 'MinuteCounter',
        autoStart: false,
        callbacks: {
        	stop: function() {
        		$('.message').html('Cambio de turno')
        	}
        }
    });
		    
    clockBlanco.setTime(300);//time seconds here (connect sockets time here)
    clockBlanco.setCountdown(true);
    //clockBlanco.start();

    clockNegro = $('#clockNegro').FlipClock({
        clockFace: 'MinuteCounter',
        autoStart: false,
        callbacks: {
            stop: function() {
                $('.message').html('Cambio de turno')
            }
        }
    });
            
    clockNegro.setTime(300);//time seconds here (connect sockets time here)
    clockNegro.setCountdown(true);
    //clockNegro.start();
});

$("#start").click(function(){
    clockBlanco.start();
});
$("#stop").click(function(){
    clockBlanco.stop();
});