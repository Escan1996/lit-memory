import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class ScoreBoard extends LitElement {
  static get styles() {
    return css`
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
      isPlayed: {
        type: Boolean
      },
      options: {
        type: Array
      },
      winner: {
        type: String,
        reflect: true
      },
      Score: {
        type: Number,
      }
    }
  }

  constructor() {
    super();
    this.isPlayed = false;
    this.valueClass = { hide: !this.isPlayed };
    this.choiceClass = { hide: this.isPlayed };
    this.options = ['🍕', '🍍', '🍉', '🥕','🍤'];
  }

  render() {
    return html`
      <div class="score">
        <span> Oscar 0</span>
  </div>
    `;
  }
}