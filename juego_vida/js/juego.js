function celula_individual() { 
    numero = Math.random()*10;
    this.hermanos_vivos = 0;
	if (numero <5){
        this.vivo_antes = false;
        this.vivo_despues = false;
    }
    else{
        this.vivo_antes = true;
        this.vivo_despues = true;
    }   
}
/*variables globales*/
var juego_creado = false;
var tablero = [];
var filas_asignadas = 0;
var columnas_asignadas = 0;

function creacion_juego(filas, columnas){
    document.getElementById("casillero").innerHTML="";
    filas_asignadas = filas;
    columnas_asignadas = columnas;
    for (let i=0; i< filas; i++){
        var fila_tablero= [];
        for (let j=0; j< columnas; j++){
            fila_tablero.push(new celula_individual());
        }
        tablero.push(fila_tablero);
    }
    juego_creado = true;
}

function reinicio(){
    clearInterval(intervalo);
    document.getElementById("error").innerHTML="";
    filas_input = parseInt(document.getElementById("filas").value) ;
    columnas_input = parseInt(document.getElementById("columnas").value) ;

    if( (Number.isInteger(filas_input) &&  filas_input > 2 && filas_input < 9 ) && (Number.isInteger(columnas_input) &&  columnas_input > 2 && columnas_input < 9 )){
        filas_asignadas = filas_input;
        columnas_asignadas = columnas_input;
    }
    else{
        document.getElementById("error").innerHTML="El tablero no cumple con las dimensiones adecuadas (de 3 x 3) a (8 x 8)";
    }
    tablero = [];
    creacion_juego(filas_asignadas,columnas_asignadas);
    representacion_imagenes();
}

function movimiento(){
    if (juego_creado == true){
        var filas_tablero = tablero.length;
        var columnas_tablero = tablero[0].length;

        for (let i=0; i< filas_tablero; i++){
            for (let j=0; j< columnas_tablero; j++){
                tablero[i][j].hermanos_vivos = 0;
                //arriba a la izquierda
                if (i > 0 && j > 0){
                    if (tablero[i-1][j-1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }
                
                //arriba
                if (i > 0){
                    if (tablero[i-1][j].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }

                }

                //arriba a la derecha
                if (i > 0  && j< columnas_tablero -1){
                    if (tablero[i-1][j+1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }
                
                //izquierda
                if(j>0){
                    if (tablero[i][j-1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }

                //derecha
                if(j< columnas_tablero -1){
                    if (tablero[i][j+1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }
                //izquierda abajo
                if (i < filas_tablero-1 && j > 0){
                    if (tablero[i+1][j-1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }

                //abajo centro
                if (i < filas_tablero-1 ){
                    if (tablero[i+1][j].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }
                // abajo derecha
                if (i < filas_tablero-1 && j< columnas_tablero -1){
                    if (tablero[i+1][j+1].vivo_antes == true){
                        tablero[i][j].hermanos_vivos +=1;
                    }
                }
                //da igual que comprobemos vivo antes o vivo despues aqui
                if(tablero[i][j].vivo_antes == true){
                        if(tablero[i][j].hermanos_vivos !=3 && tablero[i][j].hermanos_vivos !=2){
                            tablero[i][j].vivo_despues = false;                                              
                        } 
                    }
                if(tablero[i][j].vivo_antes == false){
                    if (tablero[i][j].hermanos_vivos == 3){
                        tablero[i][j].vivo_despues = true;
                    }
                }                   
            }
        }
    }
    representacion_imagenes();
}

function representacion_imagenes(){
    document.getElementById("casillero").innerHTML="";
    var filas_tablero = tablero.length;
    var columnas_tablero = tablero[0].length;
    for (let i=0; i< filas_tablero; i++){
        var div_fila = document.createElement("DIV");
        div_fila.classList.add("fila");
        for (let j=0; j< columnas_tablero; j++){
            var div_elemento = document.createElement("DIV");
            div_elemento.classList.add("elemento");
            var imagen = document.createElement("img");
            //actualizamos el estado de las células para la siguiente tirada y asignamos la foto a cada celula

            if(tablero[i][j].vivo_despues == true){
                tablero[i][j].vivo_antes = true
                imagen.src = 'img/celula_viva.png';
            }
            else{
                tablero[i][j].vivo_antes = false
                imagen.src = 'img/celula_muerta.png';
            }
            div_elemento.appendChild(imagen);
            div_fila.appendChild(div_elemento);

        }
        document.getElementById("casillero").appendChild(div_fila);
    }
}

function juego_automatico(){
    movimiento();
    intervalo = setInterval(movimiento, 2000);
}

function explicacion(){
    var explicacion = document.getElementById("explicacion");
    if (explicacion.style.display === "block") {
        explicacion.style.display = "none";
      } else {
        explicacion.style.display = "block";
      }
    }
creacion_juego(5,5);
representacion_imagenes();
