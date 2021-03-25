import { Memory } from './src/memory.js';
import { Card } from './src/Card.js';
import { ScoreBoard } from './src/score-board.js';

window.customElements.define('memory-game', Memory);
window.customElements.define('card-memory', Card);
window.customElements.define('score-board', ScoreBoard);
