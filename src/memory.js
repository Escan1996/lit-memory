import { css, html, LitElement } from 'lit-element';
import './Card.js';
import './score-board.js';

export class Memory extends LitElement {
  static get styles() {
    return css`
      :host {
        background-image: url('https://i.pinimg.com/originals/79/52/6c/79526c076a08e525becfd4215e1c6c16.jpg');
        display: flex;
        color: white;
        font-family: sans-serif;
        flex-direction: column;
        justify-content: center;
        align-available: center;
        border-radius: 30px;
        width: 100%;
        height: auto;
      }
      #board {
        width: 100%;
        display: flex;
        height: auto;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-evenly;
        poisition: relative;
      }

      .score-board {
        display: flex;
        justify-content: space-evenly;
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
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 60px;
        padding: 10px;
        border-radius: 1rem;
        text-align: center;
        z-index: 1;
        background-image: url('https://image.winudf.com/v2/image/Y29tLmJsYWNrYmFja2dyb3VuZHdhbGxwYXBlcnNpbWFnZXNfc2NyZWVuXzJfMTUwOTI1MjEyOV8wOTU/screen-2.jpg?h=355&fakeurl=1&type=.jpg');
      }

      .play-image {
        border-radius: 2rem;
        max-width: 200px;
        max-height: 80px;
      }
    `;
  }

  static get properties() {
    return {
      cardArray: {
        type: Array,
      },
      saveFruit: {
        type: Object,
      },
      turnCounter: {
        type: Number,
      },
      playerTurn: {
        type: Boolean,
      },
      addScore1: {
        type: Number,
      },
      addScore2: {
        type: Number,
      },
      player1Turn: {
        type: Boolean,
      },
      player2Turn: {
        type: Boolean,
      },
      isWinner: {
        type: Boolean,
      },
      gameFinish: {
        type: Number,
      },
      player1Name: {
        type: String,
      },
      player2Name: {
        type: String,
      },
      message: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.saveFruit = {
      value: '',
      id: '',
    };
    this.playerTurn = true;
    this.isWinner = false;
    this.addScore1 = 0;
    this.addScore2 = 0;
    this.message = 'Lets play memory';
    this.player1Name = 'Oscar';
    this.player2Name = 'Rival';
    this.player1Turn = true;
    this.player2Turn = false;
    this.gameFinish = 0;
    this.turnCounter = 0;
    this.cardArray = [
      {
        value: '🍕',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍍',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍉',
        show: true,
        isPlayed: false,
      },
      {
        value: '🥕',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍤',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍕',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍍',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍉',
        show: true,
        isPlayed: false,
      },
      {
        value: '🥕',
        show: true,
        isPlayed: false,
      },
      {
        value: '🍤',
        show: true,
        isPlayed: false,
      },
    ];
  }

  __sortCards() {
    let currentIndex = this.cardArray.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.cardArray[currentIndex];
      this.cardArray[currentIndex] = this.cardArray[randomIndex];
      this.cardArray[randomIndex] = temporaryValue;
    }
    return this.cardArray;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__playerManage();
    this.__sortCards();
  }

  __fruitSelected(card, i) {
    if (this.saveFruit.id !== i) {
      this.__playerManage();
      this.turnCounter += 1;
      this.__changeTurn();
      this.cardArray[i].isPlayed = true;
      if (this.saveFruit.value) {
        this.__compareFruits(card, i);
      } else {
        this.saveFruit = {
          value: card,
          id: i,
        };
      }
      this.requestUpdate();
      if (this.gameFinish === 5) {
        setTimeout(() => {
          if (this.addScore1 > this.addScore2) {
            this.message = 'Oscar Wins';
          } else {
            this.message = 'Rival Wins';
          }
        }, 1000);
      }
    }
  }

  __playerManage() {
    if (this.playerTurn) {
      this.player1Turn = true;
      this.player2Turn = false;
    } else {
      this.player1Turn = false;
      this.player2Turn = true;
    }
  }

  __changeTurn() {
    if (this.turnCounter === 2) {
      setTimeout(() => {
        if (!this.isWinner) {
          this.playerTurn = !this.playerTurn;
          this.player1Turn = !this.player1Turn;
          this.player2Turn = !this.player2Turn;
        }
      }, 1000);
      this.turnCounter = 0;
    }
  }

  __addToBoard() {
    if (this.playerTurn) {
      this.addScore1 += 1;
    } else {
      this.addScore2 += 1;
    }
  }

  __compareFruits(card, i) {
    if (this.saveFruit.value === card) {
      this.turnCounter = 0;
      this.gameFinish += 1;
      setTimeout(() => {
        this.cardArray[i].show = false;
        this.cardArray[this.saveFruit.id].show = false;
        this.isWinner = true;
        this.__addToBoard();
        this.saveFruit = {
          value: '',
          id: '',
        };
      }, 500);
    } else {
      setTimeout(() => {
        this.cardArray[this.saveFruit.id].isPlayed = false;
        this.cardArray[i].isPlayed = false;
        this.isWinner = false;
        this.saveFruit = {
          value: '',
          id: '',
        };
      }, 500);
      this.cardArray[i].isPlayed = true;
      this.cardArray[this.saveFruit.id].isPlayed = true;
    }
  }

  render() {
    return html`
      <div class="score-board">
        <score-board
          .score="${this.addScore1}"
          .isTurn="${this.player1Turn}"
          .player="${this.player1Name}"
          class="player1"
        ></score-board>
        <div id="welcome-message">${this.message}</div>
        <score-board
          .score="${this.addScore2}"
          .isTurn="${this.player2Turn}"
          .player="${this.player2Name}"
          class="player2"
        ></score-board>
      </div>
      <div id="board">
        ${this.cardArray.map(
          (card, i) => html`
            <card-memory
              @click="${e => this.__fruitSelected(card.value, i, e)}"
              .fruit="${card.value}"
              .showClass="${card.show}"
              .isPlayed="${card.isPlayed}"
            >
            </card-memory>
          `
        )}
      </div>
    `;
  }
}
