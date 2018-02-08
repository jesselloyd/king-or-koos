class RoundPileItem {
  /**
   * Represents a player's turn in a round of King or Koos, and the
   * metadata associated with that turn.
   * @param {Card[]} cards
   * @param {Player} playedBy
   */
  constructor(cards, playedBy) {
    this.cards = cards;
    this.playedBy = playedBy;
  }
}

module.exports = RoundPileItem;
