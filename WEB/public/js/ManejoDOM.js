$(document).ready(function() {
	$('.nombrejugador').on("input", function() {
		const jugador = this.id;
		const dImput = this.value;

		if(jugador == 'jugador1') {
			$("#etiqueta1").text(dImput);
		} else {
			$("#etiqueta2").text(dImput);
		}


	});
});
