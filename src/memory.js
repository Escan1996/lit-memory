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
        height: 500px;
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
      }
      
      .player2 {
        margin-left: 100px;
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
      addScore: {
        type: Number
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
    this.addScore = 1;
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

  assignValue() {
    let value;
    let number = Math.floor((Math.random() * 5) + 1);
    value = this.options[number - 1];
    this.disableNumberEmit = number - 1;
    return value;
  }

  __playerSelect(e) {
    const npcCard = this.shadowRoot.getElementById('npc-card');
    npcCard.dispatchEvent(new CustomEvent('npc-play'));
    this.playerChoice = e.detail.choice;
  }

  changeTotalNumber() {

  }

  __fruitSelected(card, i) {
    this.cardArray[i].isPlayed = true;
    this.playerManage();
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
    this.turnCounter++;
    if (this.turnCounter === 2) {
      this.playerTurn = !this.playerTurn;
      this.turnCounter = 0;
    }
  }

  compareFruits(card, i) {
    if (this.saveFruit.value === card) {
      this.cardArray[i].show = false;
      this.cardArray[this.saveFruit.id].show = false;
    } else {
      this.cardArray[i].isPlayed = false;
      this.cardArray[this.saveFruit.id].isPlayed = false;
    }  
    this.saveFruit = {
      value: '',
      id: ''
    };
    this.requestUpdate();
  }

  render() {
    console.table(this.cardArray);
    return html `
      <div id='welcome-message'>
        <h2>${this.message}</h2>
      </div>
      <div class="score-board">
        <score-board class="player1"></score-board>
        <score-board class="player2"></score-board>
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
