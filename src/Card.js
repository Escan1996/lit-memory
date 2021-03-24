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
        background: gray;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        border-radius: 2rem;
      }

      #value {
        font-size: 2em;
        cursor: not-allowed;
        background: gray;
      }
      .hide {
        display: none;
      }
      .unplayed {
        background-color: gray;
        border-color: transparent;
        font-size: 2em;
      }
    `;
  }

  static get properties() {
    return {
      isPlayed: {
        type: Boolean,
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
      },
      available: {
        type: Number,
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
        ❔
    </div>
      <div id="value" class='${classMap(this.valueClass)}'>
        ${this.fruit}
      </div>
      </div>
    `;
    } else {
      return html `
      <div>Pair found</div>
      `
    }
  }
}
