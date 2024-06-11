
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    //! Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');


    const divCartasJugadores = document.querySelectorAll('.divCartas');

    const puntosHTML = document.querySelectorAll('small');

    //! Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnDetener.disabled = false;
        btnPedir.disabled = false;
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


    // Turno: 0 = primer jugador, el último será la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, 2D...
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

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

    //! Turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if ( puntosMinimos > 21 ) {
                break;
            }
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }


    //! Eventos - pedir carta

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta(carta, 0);

        // puntosJugador = puntosJugador + valorCarta( carta );
        // puntosHTML[0].innerText = puntosJugador;
        // puntosHTML[0] muestra la posición 0, es decir, el primer tag html <small> que hay. Si fuese
        // un 1, sería el segundo <small> del HTML.

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
        turnoComputadora(puntosJugadores[0]);
    })

    //! Eventos - nuevo

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    })


    return {
        nuevoJuego: inicializarJuego
    };

})();
