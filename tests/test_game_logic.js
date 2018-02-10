const gameLogic = require('../src/game_logic');
const Card = require('../src/card');
const Deck = require('../src/deck');
const Player = require('../src/player');

test('Input is a valid card', () => {
  expect(gameLogic.inputIsValidCard('10H')).toBe(true);
});

test('Cards are not in player\'s hand', () => {
  const cards = [];
  cards.push(new Card(1, 'H'));
  const player = new Player();
  player.hand = [new Card(1, 'D'), new Card(8, 'C')];
  expect(player.cardsAreInHand(cards)).toBe(false);
});

test('Cards are in player\'s hand', () => {
  const cards = [];
  cards.push(new Card(1, 'H'));
  const player = new Player();
  player.hand = [new Card(1, 'H')];
  expect(player.cardsAreInHand(cards)).toBe(true);
});

test('Cards are shuffled correctly.', () => {
  const deck = new Deck();
  const players = [new Player('Jesse'), new Player('Asher')];
  deck.deal(players);
  // Reduce ALL THE THINGS!!!
  const isSorted = players.reduce((valuesWereSorted, p) => valuesWereSorted &&
    p.hand.reduce((c1, c2) => (c1 !== false && (c1.value <= c2.value) ? c2 : false))) !== false;
  expect(isSorted).toBe(true);
});

test('Players with starting card is first in the list of players after reordering', () => {
  const players = [new Player('Asher'), new Player('Jesse'), new Player('Jason'), new Player('Audrey')];
  players[0].hand.push(new Card(9, 'H')); // King of Hearts
  players[1].hand.push(new Card(10, 'S')); // Ace of Spades
  players[2].hand.push(new Card(0, 'C')); // 4 of Clubs -> this is the starting card.
  players[3].hand.push(new Card(7, 'D')); // J of Diamonds

  const reorderedPlayers = gameLogic.reorderPlayers(players);

  expect(reorderedPlayers.map(p => p.name)).toEqual(['Jason', 'Audrey', 'Asher', 'Jesse']);
});
