import {
  css,
  html,
  LitElement
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static get styles() {
    return css `
      :host {
        width: 80px;
        height: 70px;
        padding: 2em;
        margin: 50px;
        background-image: url('https://image.freepik.com/free-vector/beautiful-background-with-pink-clouds-sky_1278-71.jpg');
        display: flex;
        justify-content: center;
        align-items: flex-start;
        border-radius: 2rem;
      }

      #value {
        font-size: 3em;
        cursor: not-allowed;
      }
      .hide {
        display: none;
      }
      .unplayed {
        border-color: transparent;
        font-size: 2em;
        position: absolute;
        transform: translate(-15px, -20px);
      }
      .card-found {
        text-align: center;
        font-weight: 800;
        font-size: 25px;
      }
    `;
  }

  static get properties() {
    return {
      isPlayed: {
        type: Boolean,
      },
      winner: {
        type: String,
        reflect: true
      },
      fruit: {
        type: String
      },
      showClass: {
        type: Boolean
      }
    }
  }

  constructor() {
    super();
    this.isPlayed = false;
    this.valueClass = {
      hide: !this.isPlayed
    };
    this.showClass = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }


  updated(changedProperties) {
    if (changedProperties.has('isPlayed')) {
      this.valueClass = {
        hide: this.isPlayed
      };
    }
  }

  render() {
    if (this.showClass) {
      return html `
      <div>
        <div class="unplayed">
          ${this.isPlayed ? html`` : html`<p>❔</p>`}
        </div>
        <div id="value" class='${classMap(this.valueClass)}'>
          ${this.fruit}
        </div>
      </div>
    `;
    } else {
      return html `
      <div class="card-found">
        Pair found 
      </div>
      `
    }
  }
}
