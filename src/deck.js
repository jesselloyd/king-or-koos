const Card = require('./card');
const CARD_CONSTANTS = require('./playing_cards_constants');

class Deck {
  /**
   * Creates a new deck of playing cards.
   */
  constructor() {
    this.cards = [];
    for (let i = 0; i < CARD_CONSTANTS.DECK_SIZE; i += 1) {
      const value = i % (CARD_CONSTANTS.TOP_CARD + 1);
      this.cards.push(new Card(value, CARD_CONSTANTS.SUITS[i % 4][0]));
    }
  }

  /**
   * Distributes cards evenly amongst a list of players.
   * @param {Player[]} players
   */
  deal(players) {
    const deck = this.shuffle(this.cards);
    const cardsPerPlayer = Math.floor(CARD_CONSTANTS.DECK_SIZE / players.length);

    players.forEach((player) => {
      for (let i = 0; i < cardsPerPlayer; i += 1) {
        player.hand.push(deck.pop());
      }
      player.sortHand();
    });
  }

  /**
   * Shuffles cards randomly as it is required for most card games.
   * @returns {Card[]}
   */
  shuffle() {
    const { cards } = this;
    for (let i = CARD_CONSTANTS.DECK_SIZE - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  }
}

module.exports = Deck;
