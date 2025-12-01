/* eslint-disable new-cap  */
import { html, LitElement } from 'lit';
import { CellsPageMixin } from '@cells/cells-page-mixin';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { DemoSphericaTemplate } from '@cells-demo/demo-spherica-template';
import styles from './second-page.css.js';

class SecondPage extends CellsPageMixin(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'demo-spherica-template': DemoSphericaTemplate,
    };
  }

  static get styles() {
    return [
      styles,
    ];
  }

  render() {
    return html` 
      <demo-spherica-template class="template" page-title="Second page">
        ${this._headerTpl} 
        ${this._mainContentTpl}
      </demo-spherica-template>
    `;
  }

  get _headerTpl() {
    return html`
      <div slot="app-header">
        <h1>Second page</h1>
      </div>
    `;
  }

  get _mainContentTpl() {
    return html`
      <div slot="app-main-content">
        <a href="#" @click="${this._navigate}">Return to first page</a>
      </div>
    `;
  }

  _navigate(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.navigate('first');
  }
}

window.customElements.define('second-page', SecondPage);
