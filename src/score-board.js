import {
  css,
  html,
  LitElement
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';

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

      .turn {
        font-size: 3em;
        z-index: 2;
        background-color: green;
      }
    `;
  }

  static get properties() {
    return {
      isTurn: {
        type: Boolean
      },
      score: {
        type: Number,
      },
      player: {
        type: String
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    this.score = 0;
    this.isTurn = false;
  } 

  render() {
    return html `
      <div class="score">
        <div class='${classMap({turn: this.isTurn})}'>
        <span >${this.player} ${this.score}</span>
        </div>
      </div>
    `;
  }
}
