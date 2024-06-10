
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    //! Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');


    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHTML = document.querySelectorAll('small');

    //! Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        for( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        console.log({ puntosJugadores });
    }

    //! Crear nueva baraja

    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for (let tipo of tipos) {
                deck.push( i + tipo );
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        }

        return _.shuffle( deck );
    }

    //! Permite tomar una carta

    const pedirCarta = () => {
        //Para asegurarnos de no quedarnos sin cartas en el deck:
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    //! Valor de la carta

    const valorCarta = (carta) => {

        // Extraer el valor de la carta: 2D = 2; 10H = 10...
        const valor = carta.substring(0, carta.length - 1);
        // isNaN = 'is Not a Number' en JS.
        // Hacemos un operador ternario: si no es un número, el valor del As es 11. Si no, la letra es 10. Si es un número, muestra el valor * 1 (tipo número)
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1; // Transforma el valor de tipo string a tipo número. 
    }


    const acumularPuntos = () => {

        
    }



    //! Turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta( carta );
            puntosHTML[1].innerText = puntosComputadora;
            
            // <img class="carta" src="assets/cartas/2C.png"> :
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; //3H, 2D...
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta);

            if ( puntosMinimos > 21 ) {
                break;
            }
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana');
            } else if( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 400);
    }


    //! Eventos - pedir carta

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHTML[0].innerText = puntosJugador;
        // puntosHTML[0] muestra la posición 0, es decir, el primer tag html <small> que hay. Si fuese
        // un 1, sería el segundo <small> del HTML.

        // <img class="carta" src="assets/cartas/2C.png"> :
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, 2D...
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta);

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }  else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }
    })
    //La función de flecha indica que cuando se haga 'click' en el boton btnPedir, se ejecutarán las propiedades
    // de la función. Esto es el callback. 

    //! Eventos - detener

    btnDetener.addEventListener('click', () => {

        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    })

    //! Eventos - nuevo

    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = ''; //El valor es: vacío
        divCartasJugador.innerHTML = '';

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    })


})();


