import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class ScoreBoard extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .score {
        background-image: url('https://image.freepik.com/free-vector/beautiful-background-with-pink-clouds-sky_1278-71.jpg');
        border-radius: 1rem;
        text-align: center;
        padding: 2em;
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .turn {
        font-size: 1.2em;
        z-index: 2;
        background-image: url('https://image.winudf.com/v2/image/Y29tLmJsYWNrYmFja2dyb3VuZHdhbGxwYXBlcnNpbWFnZXNfc2NyZWVuXzJfMTUwOTI1MjEyOV8wOTU/screen-2.jpg?h=355&fakeurl=1&type=.jpg');
        border-radius: 1rem;
        padding: 10px;
      }
    `;
  }

  static get properties() {
    return {
      isTurn: {
        type: Boolean,
      },
      score: {
        type: Number,
      },
      player: {
        type: String,
      },
    };
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
    return html`
      <div class="score">
        <div class="${classMap({ turn: this.isTurn })}">
          <span>${this.player}'s Score: ${this.score}</span>
        </div>
      </div>
    `;
  }
}
