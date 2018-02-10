const Game = require('./src/game');
const Player = require('./src/player');

// Static players for demo and testing purposes in early stages of development.
const audrey = new Player('Audrey');
const jesse = new Player('Jesse');
const kirsten = new Player('Kirsten');
const jason = new Player('Jason');
const asher = new Player('Asher');

const players = [audrey, jesse, kirsten, jason, asher];

const game = new Game();

const results = game.play(players);

console.log('GAME OVER. KING ~ ', results.king.name, ' :: KOOS ~ ', results.koos.name);
