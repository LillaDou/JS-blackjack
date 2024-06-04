
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