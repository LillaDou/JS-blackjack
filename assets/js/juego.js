
/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Crear nueva baraja

const crearDeck = () => {

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

    deck = _.shuffle( deck );
    console.log( deck );

    return deck;
}

crearDeck();

// Permite tomar una carta

const pedirCarta = () => {
    //Para asegurarnos de no quedarnos sin cartas en el deck:
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    console.log(deck);
    console.log(carta);
    return carta;
}

// pedirCarta();


// Valor de la carta

const valorCarta = (carta) => {

    // Extraer el valor de la carta: 2D = 2; 10H = 10...
    const valor = carta.substring(0, carta.length - 1);
    // isNaN = 'is Not a Number' en JS.
    // Hacemos un operador ternario: si no es un número, el valor del As es 11. Si no, la letra es 10. Si es un número, muestra el valor * 1 (tipo número)
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1; // Transforma el valor de tipo string a tipo número. 
}

const valor = valorCarta( pedirCarta() ); 
console.log({valor});
// El valor de la carta es la combinación de la función de valorCarta + la función de pedirCarta aleatoria. 