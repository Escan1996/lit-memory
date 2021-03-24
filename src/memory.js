import {
  css,
  html,
  LitElement
} from 'lit-element';
import './Card.js'
import './score-board.js';

export class Memory extends LitElement {

  static get styles() {
    return css `
      :host {
        background-color: orange;
        display: flex;
        color: white;
        font-family: sans-serif;
        flex-direction: column;
        justify-content: center;
        align-available: center;
        border-radius: 30px;
      }
      #board {
        padding: 40px;
        width: 100%;
        display: flex;
        height: auto;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-evenly;
      }

      .score-board {
        display: flex;
        justify-content: space-between;
      }

      .player1 {
        margin-right: 100px;
        margin-left: 50px;
      }
      
      .player2 {
        margin-left: 100px;
        margin-right: 50px;
      }

      #welcome-message {
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      namePlayer: {
        type: String,
        reflect: true,
        attribute: 'name-player',
        converter: (value) => {
          let name = value;
          name = name.toUpperCase();
          name = name.substr(0, 6);
          return name;
        }
      },
      playerChoice: {
        type: String
      },
      npcChoice: {
        type: String
      },
      winner: {
        type: String
      },
      message: {
        type: String
      },
      totalNumber: {
        type: Number,
      },
      cardArray: {
        type: Array,
      },
      saveFruit: {
        type: Object
      },
      turnCounter: {
        type: Number
      },
      playerTurn: {
        type: Boolean
      },
      addScore1: {
        type: Number
      },
      addScore2: {
        type: Number
      },
      player1Turn: {
        type: Boolean
      },
      player2Turn: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.message = 'Let\'s play memory!';
    this.saveFruit = {
      value: '',
      id: ''
    };
    this.playerTurn = true;
    this.winner = '';
    this.addScore1 = 0;
    this.addScore2 = 0;
    this.player1Turn = true;
    this.player2Turn = false;
    this.hideCard = true;
    this.turnCounter = 0;
    this.cardArray = [{
      value: '🍕',
      show: true,
      isPlayed: false
    }, {
      value: '🍍',
      show: true,
      isPlayed: false
    }, {
      value: '🍉',
      show: true,
      isPlayed: false
    }, {
      value: '🥕',
      show: true,
      isPlayed: false
    }, {
      value: '🍤',
      show: true,
      isPlayed: false
    }, {
      value: '🍕',
      show: true,
      isPlayed: false
    }, {
      value: '🍍',
      show: true,
      isPlayed: false
    }, {
      value: '🍉',
      show: true,
      isPlayed: false
    }, {
      value: '🥕',
      show: true,
      isPlayed: false
    }, {
      value: '🍤',
      show: true,
      isPlayed: false
    }];
  }

  connectedCallback() {
    super.connectedCallback();
    this.playerManage();
  }

  assignValue() {
    let value;
    let number = Math.floor((Math.random() * 5) + 1);
    value = this.options[number - 1];
    this.disableNumberEmit = number - 1;
    return value;
  }

  __fruitSelected(card, i) {
    this.playerManage();
    this.cardArray[i].isPlayed = true;
    if (this.saveFruit.value) {
      this.compareFruits(card, i);
    } else {
      this.saveFruit = {
        value: card,
        id: i
      };
    }
    this.requestUpdate();
  }

  playerManage() {
    if (this.playerTurn) {
      this.player1Turn = true;
      this.player2Turn = false;
    } else {
      this.player1Turn = false;
      this.player2Turn = true;
    }
    this.turnCounter++;
    if (this.turnCounter === 2) {
      this.playerTurn = !this.playerTurn;
      this.turnCounter = 0;
    }
  }

  add() {
    if (this.playerTurn) {
      this.addScore2++;
    } else {
      this.addScore1++;
    }
  }

  compareFruits(card, i) {
    if (this.saveFruit.value === card) {
      setTimeout(() => {
        this.cardArray[i].show = false;
        this.cardArray[this.saveFruit.id].show = false;
        this.add();
        this.saveFruit = {
          value: '',
          id: ''
        };
      }, 1000);
    } else {
      setTimeout(() => {
        this.cardArray[this.saveFruit.id].isPlayed = false;
        this.cardArray[i].isPlayed = false; //No borra su value
        console.log(this.cardArray[i]);
        this.saveFruit = {
          value: '',
          id: ''
        };
      }, 1000);
      this.cardArray[i].isPlayed = true;
      this.cardArray[this.saveFruit.id].isPlayed = true;
    }
  }

  render() {
    return html `
      <div id='welcome-message'>
        <h2>${this.message}</h2>
      </div>
      <div class="score-board">
        <score-board .score="${this.addScore1}" .isTurn="${this.player1Turn}" .player="${'Oscar'}" class="player1"></score-board>
        <score-board .score="${this.addScore2}" .isTurn="${this.player2Turn}" .player="${'Rival'}" class="player2"></score-board>
      </div>
      <div id='board'> 
        ${this.cardArray.map((card, i) => html`
        <card-memory @click="${e => this.__fruitSelected(card.value, i)}" .fruit="${card.value}" .showClass="${card.show}" .isPlayed="${card.isPlayed}">
        </card-memory>
        `)}
       
      </div>
    `;
  }
}
