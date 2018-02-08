const gameLogic = require('../src/game_logic');
const Card = require('../src/card');
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
