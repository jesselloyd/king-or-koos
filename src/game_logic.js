const readlineSync = require('readline-sync');
const CARD_CONSTANTS = require('./playing_cards_constants');
const Card = require('./card');
const RoundPileItem = require('./round_pile_item');

/**
 * Prints the round pile to remind players of the current state
 * of the game.
 * @param {RoundPileItem[]} roundPile
 */
function printRoundPile(roundPile) {
  if (roundPile.length) {
    console.log('♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️️ ♥️ ♣️ ♦️');
    roundPile[roundPile.length - 1].cards.forEach(c =>
      process.stdout.write(`${c.displayName} `));
    console.log('\n\n♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️ ♠️ ♥️ ♣️ ♦️');
  } else {
    console.log('Pile for this round was empty.\n');
  }
}

/**
 * Evaluates a list of cards against another to ensure
 * that each of the cards in the first list have a greater
 * value.
 * @param {Card[]} selectedCards
 * @param {Card[]} previousCards
 * @returns {boolean}
 */
function turnIsValid(selectedCards, previousCards) {
  return !selectedCards.some(c =>
    previousCards.some(pC => pC.value >= c.value));
}

/**
 * Calculates the maximum number of cards that can be
 * played in one turn for a player. For example, if a
 * player has a hand with 4H, 4D, 8S, AH, 2C, the maximum
 * number of cards that can be played is 2 because there are 2
 * cards with a value of 4 in the hand, and no higher frequency of
 * cards with the same value.
 * @param {Card[]} cards
 * @returns {number}
 */
function calculateMaxNumCardsPerTurn(cards) {
  const cardValueFrequency = {};

  cards.forEach((c) => {
    if (cardValueFrequency[c.value]) {
      cardValueFrequency[c.value] += 1;
    } else {
      cardValueFrequency[c.value] = 1;
    }
  });

  return Math.max(...Object.values(cardValueFrequency));
}

/**
 * Gets the input for a turn from a player and formats
 * it for parsing.
 */
function getFormattedUserInput() {
  return readlineSync
    .question('Select card(s): Enter a value (4 - 10, J, K, Q, A, 2 - 3) ' +
        'followed by a suit (S, C, H, D). To play multiple cards, separate the extra cards by a comma between each suit. ' +
        'For example: 2H,S would play the 2 of hearts and spades. Just press ENTER to skip: ')
    .toUpperCase()
    .trim();
}

/**
 * Evaluates an input and determines if it can be parsed into a card.
 * @param {string} input
 * @returns {boolean}
 */
function inputIsValidCard(input) {
  const value = input.slice(0, input.length - 1);
  const suit = input[input.length - 1];
  return (
    input.length >= 2 &&
    CARD_CONSTANTS.CARD_TO_VALUE_MAP[value] !== undefined &&
    CARD_CONSTANTS.SUIT_MAP[suit] !== undefined
  );
}

/**
 * Takes a user's formatted input and parses each valid
 * card from the input.
 * @param {string} input
 * @returns {Card[]} cards
 */
function getCardsFromInput(input) {
  const cards = [];

  if (input.length) {
    const firstIndexOfNonSuitValue = input
      .split('')
      .findIndex(c =>
        c !== '1' &&
          c !== '0' &&
          CARD_CONSTANTS.CARD_TO_VALUE_MAP[c] === undefined);
    const selectedValue = input.slice(0, firstIndexOfNonSuitValue);
    const cardReferences = input.slice(firstIndexOfNonSuitValue, input.length);
    cardReferences.split(',').forEach((ref) => {
      const tryCard = selectedValue + ref.trim();
      if (inputIsValidCard(tryCard)) {
        const card = new Card(
          CARD_CONSTANTS.CARD_TO_VALUE_MAP[selectedValue],
          ref.trim(),
        );
        cards.push(card);
      }
    });
  }

  return cards;
}

/**
 * Retrieves the cards a player wishes to play for their turn
 * by prompting the user to enter a 2 character string representing
 * a card's value followed by a list of suits.
 * For example, '2H' would represent the 2 of Hearts card.
 * @returns {Card[]}
 */
function getCardsToPlay(player, numberOfCardsPerTurn) {
  const numberOfCardsThatCanBePlayed =
    numberOfCardsPerTurn || calculateMaxNumCardsPerTurn(player.hand);
  const input = getFormattedUserInput();
  const cards = getCardsFromInput(input);
  if (input.length) {
    // TODO - clean this up a little. The logic works, but it's a brain teaser
    // each time.
    const playIsValid =
      cards &&
      ((numberOfCardsPerTurn && cards.length === numberOfCardsPerTurn) ||
        (!numberOfCardsPerTurn &&
          cards.length > 0 &&
          cards.length <= numberOfCardsThatCanBePlayed)) &&
      player.cardsAreInHand(cards);
    if (!playIsValid) {
      console.log('Your play was not valid. Either you chose cards not in your hand or the wrong number of cards for this round. Please try again.\n');
      return getCardsToPlay(player, numberOfCardsPerTurn);
    }
  }

  return cards;
}

/**
 * Retrieves the cards from the last turn on the top of the round pile.
 * @param {RoundPileItem[]} roundPile
 * @returns {Cards[]}
 */
function getPreviousTurnCards(roundPile) {
  const pileSize = roundPile.length;

  return pileSize ? roundPile[pileSize - 1].cards : [];
}

/**
 * Retrieves a player's chosen cards and pushes them onto the round's
 * pile if they are valid.
 * @param {Player} player
 * @param {RoundPileItem[]} roundPile
 */
function takeTurn(player, roundPile) {
  player.showHand();
  const previousTurnCards = getPreviousTurnCards(roundPile);
  const cards = getCardsToPlay(player, previousTurnCards.length);
  if (cards && cards.length) {
    if (turnIsValid(cards, previousTurnCards)) {
      player.removeCardsFromHand(cards);
      if (!roundPile.length || cards[0].value > previousTurnCards[0].value) {
        roundPile.push(new RoundPileItem(cards, player.name));
      }
    } else {
      console.log("You can't place down that hand. You have to try again! " +
          "If you don't have any cards you can play, skip your turn!\n");
      takeTurn(player, roundPile);
    }
  }
}

/**
 * Evaluates a round pile and determines if the card on the
 * top of the pile is the top card, and therefore determines the
 * end of a round.
 * @param {RoundPileItem[]} roundPile
 * @returns {boolean}
 */
function isTopCardFound(roundPile) {
  if (roundPile && roundPile.length) {
    if (
      roundPile[roundPile.length - 1].cards &&
      roundPile[roundPile.length - 1].cards.length
    ) {
      return (
        roundPile[roundPile.length - 1].cards[0].value ===
        CARD_CONSTANTS.TOP_CARD
      );
    }
  }
  return false;
}

/**
 * Gets the player who last played a turn.
 * @param {RoundPileItem[]} roundPile
 * @returns {Player}
 */
function lastCardPlayedBy(roundPile) {
  if (roundPile && roundPile.length) {
    return roundPile[roundPile.length - 1].playedBy;
  }
  return null;
}

/**
 * Prints the current round pile and evaluates if a round
 * can continue based on the rules of the game.
 * @param {RoundPileItem[]} roundPile
 * @param {Player} player
 * @returns {boolean}
 */
function tryContinueRound(roundPile, player) {
  if (roundPile && roundPile.length) {
    printRoundPile(roundPile);
    return !(
      isTopCardFound(roundPile) ||
      lastCardPlayedBy(roundPile) === player.name ||
      player.hand.length === 0
    );
  }
  return true;
}

/**
 * Reorders a list of players so that the first player in the list
 * holds the defined starting card. For example, if the starting card is
 * 4 of ♠️, then the player with that card will go first and the players
 * will be chosen as normal in a circular fashion.
 * @param {Player[]} players
 */
function reorderPlayers(players) {
  let orderedPlayers = players;
  const playerWithStartingCard = players.find(p =>
    p.hand.some(c =>
      c.cardValue === CARD_CONSTANTS.STARTING_VALUE &&
      c.suit === CARD_CONSTANTS.STARTING_SUIT));
  const playerIndex = players.indexOf(playerWithStartingCard);
  if (players[playerIndex]) {
    const playersToPushToEnd = players.slice(0, playerIndex);
    const playersToStartFrom = players.slice(playerIndex, players.length);
    orderedPlayers = playersToStartFrom.concat(playersToPushToEnd);
  }
  return orderedPlayers;
}

module.exports = {
  inputIsValidCard,
  turnIsValid,
  calculateMaxNumCardsPerTurn,
  getFormattedUserInput,
  getCardsFromInput,
  getCardsToPlay,
  getPreviousTurnCards,
  takeTurn,
  isTopCardFound,
  lastCardPlayedBy,
  tryContinueRound,
  reorderPlayers,
};
