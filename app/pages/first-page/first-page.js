/* eslint-disable new-cap  */
import { html, LitElement } from 'lit';
import { CellsPageMixin } from '@cells/cells-page-mixin';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { DemoSphericaTemplate } from '@cells-demo/demo-spherica-template';
import styles from './first-page.css.js';
import { MyCustomElementMenu } from '@cells-components/my-custom-element-menu';
import { MyCustomElementNotifica } from '../../../../../componentes/my-custom-element-notifica/src/MyCustomElementNotifica.js';

class FirstPage extends CellsPageMixin(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'demo-spherica-template': DemoSphericaTemplate,
      'my-custom-element-menu': MyCustomElementMenu,
      'my-custom-element-notifica': MyCustomElementNotifica,
    };
  }

  static get properties() {
    return {
      count: { type: Number },
    };
  }

  static get styles() {
    return [ styles ];
  }

  constructor() {
    super();
    this.count = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleChannels();
  }

  handleChannels() {
    this.subscribe('count-channel', (data) => {
      this.count = data.count;
    });
    console.log('Subscribed to count-channel');
  }

  render() {
    return html`
      <demo-spherica-template class="template" page-title="First page">
        ${this._headerTpl} ${this._mainContentTpl}
      </demo-spherica-template>
    `;
  }

  get _headerTpl() {
    return html`
      <div slot="app-header">
        <h1>First page</h1>
        <div class="display">
          <my-custom-element-notifica .count=${this.count}></my-custom-element-notifica>
        </div>
      </div>
    `;
  }

  _gotoNavigation(e) {
    console.log('Navegando a:', e.detail.item.id);
    this.navigate(e.detail.item.id);
  }

  firstUpdated() {
    this._configureMenu();
  }

  _configureMenu() {
    const menu = this.shadowRoot.querySelector('my-custom-element-menu');

    // Configurar items del menú
    menu.items = [
      { id: 'first', label: 'Inicio', icon: '🏠' },
      {
        id: 'count',
        label: 'Contador',
        icon: '🔢',
      },
      { id: 'second', label: 'Segunda página', icon: '➡️' },
    ];
  }

  get _mainContentTpl() {
    return html`
      <div slot="app-main-content">
        <my-custom-element-menu
          @menu-item-click=${this._gotoNavigation}
        ></my-custom-element-menu>
      </div>
    `;
  }
}

window.customElements.define('first-page', FirstPage);
