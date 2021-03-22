import {
  css,
  html,
  LitElement
} from 'lit-element';
import './Card.js'

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
        align-items: center;
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
      }
    };
  }

  constructor() {
    super();
    this.message = 'Let\'s play memory!';
    this.namePlayer = '';
    this.playerChoice = '';
    this.npcChoice = '';
    this.winner = '';
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

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (
      _changedProperties.has('npcChoice') && _changedProperties.has('playerChoice') &&
      this.npcChoice !== ''
    ) {
      this.__whoWon();
    }
  }

  render() {
    return html `
      <div id='welcome-message'>
        <h2>${this.message}</h2>
      </div>
      <div id='board'>
        <card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory>
        <card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory><card-memory @choice-selected='${this.__playerSelect}'
                                  .winner="${this.winner !== '' && this.winner === 'player'}">
          ${this.namePlayer}
        </card-memory>
      </div>
    `;
  }
}
