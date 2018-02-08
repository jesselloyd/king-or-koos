const CARD_CONSTANTS = require('./playing_cards_constants');

class Card {
  /**
   * Represents a playing card with a comparable value (value)
   * as well as a presentable value (cardValue).
   * For example, new Card(0, 'H') represents the 4 of Hearts.
   * This comparable value is required for the game logic.
   * @param {int} value
   * @param {string} suit
   */
  constructor(value, suitChar) {
    this.value = value;
    this.cardValue = CARD_CONSTANTS.VALUE_TO_CARD_MAP[value];
    this.suit = CARD_CONSTANTS.SUIT_MAP[suitChar];
    this.displayName = this.getDisplayName();
  }

  /**
   * Generates a formatted string to identify a card.
   * @example
   * let card = new Card(0, 'H')
   * card.getDisplayName();
   * '4 of ♥️'
   * @returns {string}
   */
  getDisplayName() {
    const { cardValue, suit } = this;
    return `(${cardValue} of ${CARD_CONSTANTS.SUIT_EMOJIS_MAP[suit]} )`;
  }
}

module.exports = Card;
