const gl = require('./game_logic');
const Deck = require('./deck');

class Game {
  /**
   * Plays a full game of King or Koos and returns an
   * object representing the outcome of the game:
   * { king: //first winner, koos: //last winner }
   * @param {Player[]} players
   * @returns {{king: Player, koos: Player}}
   */
  play(players) {
    if (players && players.length) {
      const deck = new Deck();
      const finishedPlayers = [];
      deck.deal(players);
      players = gl.reorderPlayers(players);
      let player = players[0];

      while (players.length > 1) {
        const roundPile = [];
        while (gl.tryContinueRound(roundPile, player)) {
          gl.takeTurn(player, roundPile);
          if (player.hand.length &&
              !gl.isTopCardFound(roundPile) &&
              player !== gl.lastCardPlayedBy(roundPile)) {
            player = this.getNextPlayer(players, player);
          }
        }
        console.log('ROUND OVER!');
        if (!player.hand.length) {
          const nextPlayer = this.getNextPlayer(players, player);
          this.setWinner(player, players, finishedPlayers);
          player = nextPlayer;
        }
      }

      return {
        king: finishedPlayers[0],
        koos: players[0],
      };
    }
    throw Error('No players were found. Cannot play the game without any players.');
  }

  /**
   * Sets a player as a winner by moving them from a list of active
   * players to a list of finished players.
   * @param {Player} player
   * @param {Player[]} players
   * @param {Player[]} finishedPlayers
   */
  setWinner(player, players, finishedPlayers) {
    const playerIndex = players.indexOf(player);
    if (players[playerIndex]) {
      finishedPlayers.push(players[playerIndex]);
      players.splice(playerIndex, 1);
    } else {
      throw Error(`Player ${player} in ${this} was not in the list of active players. Cannot set them as a winner.`);
    }
  }

  /**
   * Gets the next player from a circular list of players.
   * @param {Player[]} players
   * @param {Player} player
   * @returns {Player}
   */
  getNextPlayer(players, player) {
    const playerIndex = players.indexOf(player);

    if (players[playerIndex]) {
      return players[(playerIndex + 1) % players.length];
    }
    return players[0];
  }
}

module.exports = Game;
