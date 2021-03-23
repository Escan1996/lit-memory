import {
  css,
  html,
  LitElement
} from 'lit-element';

export class ScoreBoard extends LitElement {
  static get styles() {
    return css `
      :host {
      }
      
      .score {
        background: black;
        border-radius: 1rem;
        text-align: center;
        padding: 2em;
        width: 200px;
        height: 50px;
      }

      .hide {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      score: {
        type: Number,
      },
      isWinner: {
        type: Boolean
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addScore();
  }

  addScore() {
    if(this.isWinner) {
      this.score++;
    }
  }
  constructor() {
    super();
    this.score = 0;
    this.isWinner = false;
  }

  render() {
    return html `
      <div class="score">
        <span>${this.score}</span>
  </div>
    `;
  }
}
