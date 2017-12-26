/*variables de entorno*/
var vp = document.getElementById("villaplatzi");
var papel = vp.getContext("2d");
document.addEventListener("keyup", dibujarCerdo);

var ancho = vp.width-80;
var alto = vp.height-80;

var x_pork = 0;
var y_pork = 0;
var movimiento = 10;

var lista_vacas = new Array();
var lista_pollo = new Array();
var lista_cerdos = new Array();

/*JSON objetos*/
var vaca = {
	url: "vaca.png",
	cargaOK: false
};

var cerdo = {
	url: "cerdo.png",
	cargaOK: false
};

var pollo = {
	url: "pollo.png",
	cargaOK: false
};

var fondo = {
	url: "tile.png",
	cargaOK: false
};

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

/*objetos para html*/
fondo.objeto = new Image();
fondo.objeto.src = fondo.url;
fondo.objeto.addEventListener("load", cargarFondo);

vaca.objeto = new Image();
vaca.objeto.src = vaca.url;
vaca.objeto.addEventListener("load",cargarVaca);

cerdo.objeto = new Image();
cerdo.objeto.src = cerdo.url;
cerdo.objeto.addEventListener("load",cargarCerdo);

pollo.objeto = new Image();
pollo.objeto.src = pollo.url;
pollo.objeto.addEventListener("load",cargarPollo);

/*funciones*/
function cargarFondo(){
	fondo.cargaOK = true;
	dibujar();
}
function cargarVaca(){
	vaca.cargaOK = true;
	dibujar();
}
function cargarCerdo(){
	cerdo.cargaOK = true;
	dibujar();
	console.log("lista de cerditos: ",list_cerditos);
	
}

function cargarPollo(){
	pollo.cargaOK = true;
	dibujar();
}

function dibujar(){
	if(fondo.cargaOK){
		papel.drawImage(fondo.objeto, 0, 0);
	}
	if(vaca.cargaOK){
		var vacas = aleatorio(20,40);

		for(var i = 0; i<vacas;i++){
			var x_vaca = aleatorio(20,ancho);
			var y_vaca = aleatorio(20,alto);
			var collision = false
			
			if (lista_vacas.length == 0){
				lista_vacas.push({x:x_vaca,y:y_vaca});
			}
			else{
				for(var k = 0; k<lista_vacas.length; k++){
					/*x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2*/
					if (Math.sqrt(Math.pow(Math.abs(lista_vacas[k].x - x_vaca), 2) + 
						Math.pow(Math.abs(lista_vacas[k].y - y_vaca), 2)) <= 100){
						collision = true
					}
			    }/*for*/    
			}/*else*/
			if (collision == false){
			    	/*papel.drawImage(vaca.objeto,x_vaca, y_vaca);*/
			    	lista_vacas.push({x:x_vaca,y:y_vaca});
			    	}		
		}/*for*/
		for(var d = 0; d < lista_vacas.length; d++){
			papel.drawImage(vaca.objeto,lista_vacas[d].x, lista_vacas[d].y);
		}
		
	}/*if vaca*/

	if(cerdo.cargaOK){
		x_cerdo = aleatorio(20, ancho);
		y_cerdo = aleatorio(20, alto);
		
		console.log("cerdo: ",x_cerdo,y_cerdo);
		papel.drawImage(cerdo.objeto, x_cerdo, y_cerdo);
		x_pork = x_cerdo;
		y_pork = y_cerdo;
	}

	if(pollo.cargaOK){
		x_pollo = aleatorio(20, ancho);
		y_pollo = aleatorio(20, alto);
		console.log("pollo: ",x_pollo,y_pollo);
		papel.drawImage(pollo.objeto, x_pollo, y_pollo);
		lista_pollo.push({x:x_pollo,y:y_pollo})
	}
	
}


function aleatorio(limit_low,limit_high){
	var resultado = Math.floor(Math.random() * (limit_high - limit_low +1)) + limit_low;
	return resultado
}

function dibujarCerdo(evento){
	papel.drawImage(fondo.objeto, 0, 0);
	switch(evento.keyCode){

		case teclas.UP:
		    console.log(evento);
		    new_y_pos = y_pork- movimiento;
		    papel.drawImage(cerdo.objeto, x_pork,new_y_pos);
		    y_pork = new_y_pos;
		    for(var i = 0;i < lista_vacas.length; i++){
				papel.drawImage(vaca.objeto, lista_vacas[i].x, lista_vacas[i].y);
			}
			papel.drawImage(pollo.objeto, lista_pollo[lista_pollo.length-1].x, lista_pollo[lista_pollo.length-1].y);
		break;
		   
		case teclas.DOWN:
		    console.log(evento);
		    new_y_pos = y_pork + movimiento;
		    papel.drawImage(cerdo.objeto, x_pork,new_y_pos);
		    y_pork = new_y_pos;
		    for(var i = 0;i < lista_vacas.length; i++){
				papel.drawImage(vaca.objeto, lista_vacas[i].x, lista_vacas[i].y);
			}
			papel.drawImage(pollo.objeto, lista_pollo[lista_pollo.length-1].x, lista_pollo[lista_pollo.length-1].y);
		break;
		
		case teclas.RIGHT:
		    console.log(evento);
		    new_x_pos = x_pork + movimiento;
		    papel.drawImage(cerdo.objeto, new_x_pos,y_pork);
		    x_pork = new_x_pos;
		    for(var i = 0;i < lista_vacas.length; i++){
				papel.drawImage(vaca.objeto, lista_vacas[i].x, lista_vacas[i].y);
			}
			papel.drawImage(pollo.objeto, lista_pollo[lista_pollo.length-1].x, lista_pollo[lista_pollo.length-1].y);
		break;
		
		case teclas.LEFT:
		    console.log(evento);
		    new_x_pos = x_pork - movimiento;
		    papel.drawImage(cerdo.objeto, new_x_pos,y_pork);
		    x_pork = new_x_pos;
		    for(var i = 0;i < lista_vacas.length; i++){
				papel.drawImage(vaca.objeto, lista_vacas[i].x, lista_vacas[i].y);
			}
			papel.drawImage(pollo.objeto, lista_pollo[lista_pollo.length-1].x, lista_pollo[lista_pollo.length-1].y);
		break;

		default:
		    console.log("Otra tecla");
		break;
		}
}