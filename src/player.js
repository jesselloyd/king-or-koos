class Player {
  /**
   * Represents a player who has a hand of playing cards.
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  /**
   * Prints the player's name and their hand of cards.
   */
  showHand() {
    process.stdout.write(`\n${this.name}: `);
    this.hand.forEach(card => process.stdout.write(`${card.displayName} `));
    process.stdout.write('\n\n');
  }

  /**
   * Sorts a player's hand in ascending order as a convenience
   * when selecting a card.
   * @param {Card[]} hand
   */
  sortHand() {
    this.hand.sort((cardOne, cardTwo) => (cardOne.value > cardTwo.value ? 1 : -1));
  }

  /**
   * Removes the specified cards from a hand.
   * @param {Card[]} hand
   * @param {Card[]} cards
   */
  removeCardsFromHand(cards) {
    this.hand = this.hand.filter(h => !cards.some(c => h.value === c.value && h.suit === c.suit));
  }

  /**
   * Retrieves a card from a player's hand based on
   * a card value (the number on the card) and a suit.
   * @param {number} cardValue
   * @param {string} suit
   * @returns {Card[]}
   */
  getCardFromHand(cardValue, suit) {
    return this.hand.find(c => c.cardValue === cardValue && c.suit === suit);
  }

  /**
   * Evaluates a list of cards and determines
   * if all of the cards are in a player's hand.
   * @param {Card[]} cards
   * @returns {boolean}
   */
  cardsAreInHand(cards) {
    const compareCards = (c1, c2) => c1.value === c2.value && c1.suit === c2.suit;
    return cards.reduce((included, c) => included &&
                        this.hand.some(hC => compareCards(c, hC)), true);
  }
}

module.exports = Player;
