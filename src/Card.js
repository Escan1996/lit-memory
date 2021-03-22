import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static get styles() {
    return css`
      :host {
        background: gray;
        z-index: 1;
        box-shadow: 0 20px 50px rgba(0, 0, 0, .8);
        border-radius: 1rem;
        text-align: center;
        padding: 2em;
        width: 50px;
        height: 50px;
        margin: 50px;
      }
      :host([winner=true]){
        box-shadow: inset 0 0 10px whitesmoke,
        inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff,
        inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff,
        0 0 50px #fff,
        -10px 0 80px #f0f,
        10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      :host(:hover)[winner=false] {
        z-index: 2;
        box-shadow: inset 0 0 10px whitesmoke,
        inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff,
        inset 20px 0 20x #f0f,
          inset -20px 0 20px #0ff,
        0 0 50px #fff,
        -10px 0 80px #f0f,
        10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      #unknown-value, #value {
        font-size: 2em;
      }
      #value {
        cursor: not-allowed;
      }
      #options {
        display: none;
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
      choice: {
        type: String
      },
      options: {
        type: Array
      },
      winner: {
        type: String,
        reflect: true
      }
    }
  }

  __onClick(hyujjjjjjjjjjjjjjuhhh) {
    this.isPlayed = true;
    this.valueClass = { hide: !this.isPlayed };
    this.choiceClass = { hide: this.isPlayed };
  }

  constructor() {
    super();
    this.isPlayed = false;
    this.valueClass = { hide: !this.isPlayed };
    this.choiceClass = { hide: this.isPlayed };
    this.options = ['🍕', '🍍', '🍉', '🥕','🍤'];
    this.choice = this.assignValue();
  }

  assignValue() {
  let value;
  let number = Math.floor((Math.random() * 5) + 1);
  value = this.options[number-1];
  return value;
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('isPlayed') && this.isPlayed) {
      const playEvent = new CustomEvent('choice-selected', {
        detail: {
          choice: this.choice
        }
      });
      this.dispatchEvent(playEvent);
    }
  }



  render() {
    return html`
      <button @click="${this.__onClick}">
        ❔
  </button>
      <div id="value" class='${classMap(this.valueClass)}'>
        ${this.choice}
      </div>
      <slot>
        Player
      </slot>
    `;
  }
}