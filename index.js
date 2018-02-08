const Game = require('./src/game');
const Player = require('./src/player');

const audrey = new Player('Audrey');
const jesse = new Player('Jesse');
const kirsten = new Player('Kirsten');
const jason = new Player('Jason');
const asher = new Player('Asher');

const players = [audrey, jesse, asher, kirsten, jason];

const game = new Game();

const results = game.play(players);

console.log('GAME OVER. KING ~ ', results.king, ' :: KOOS ~ ', results.koos);
