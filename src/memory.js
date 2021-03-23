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
        type: String
      },
    };
  }

  constructor() {
    super();
    this.message = 'Let\'s play memory!';
    this.namePlayer = '';
    this.playerChoice = '';
    this.npcChoice = '';
    this.winner = '';
    this.cardArray = [{
      value: '🍕',
      show: false
    }, {
      value: '🍍',
      show: false
    }, {
      value: '🍉',
      show: false
    }, {
      value: '🥕',
      show: false
    }, {
      value: '🍤',
      show: false
    }, {
      value: '🍕',
      show: false
    }, {
      value: '🍍',
      show: false
    }, {
      value: '🍉',
      show: false
    }, {
      value: '🥕',
      show: false
    }, {
      value: '🍤',
      show: false
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

  __npcSelect(e) {
    this.npcChoice = e.detail.choice;
  }

  __whoWon() {
    if (this.npcChoice === this.playerChoice) {
      this.message = 'TIE!';
    } else if (
      (this.npcChoice === '✊' && this.playerChoice === '✌️') ||
      (this.npcChoice === '🖐' && this.playerChoice === '✊') ||
      (this.npcChoice === '✌️' && this.playerChoice === '🖐')
    ) {
      this.winner = 'npc';
      this.message = 'Winner NPC';
    } else {
      this.winner = 'player';
      this.message = `Winner ${this.namePlayer}`;
    }
  }

  changeTotalNumber() {

  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (
      _changedProperties.has('npcChoice') && _changedProperties.has('playerChoice') &&
      this.npcChoice !== ''
    ) {
      this.__whoWon();
    }
  }

  __fruitSelected(card, i) {
    console.log(this.saveFruit);
    if (this.saveFruit) {
      this.compareFruits(card, i);
    } else {
      this.saveFruit = card;
    }
  }

  compareFruits(card, i) {
    if (this.saveFruit === card) {
      for (let i = 0; i < 10; i++) {
        this.cardArray[i].show = true;
        console.log(this.cardArray[i].show);
      }
    }
  }

  render() {
    return html `
      <div id='welcome-message'>
        <h2>${this.message}</h2>
      </div>
      <div class="score-board">
        <score-board class="player1"></score-board>
        <score-board class="player2"></score-board>
      </div>
      <div id='board'> 
        ${this.cardArray.map(card, i => html`
        <card-memory @click="${e => this.__fruitSelected(card.value, i)}" .fruit="${card.value}">
        </card-memory>
        `)}
       
      </div>
    `;
  }
}
