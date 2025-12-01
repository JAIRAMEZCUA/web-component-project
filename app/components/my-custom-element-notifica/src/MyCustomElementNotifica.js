import { LitElement, html } from 'lit';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './my-custom-element-notifica.css.js';

/**
 * ![Lit component](https://img.shields.io/badge/Lit-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <my-custom-element-notifica></my-custom-element-notifica>
 * ```
 */
export class MyCustomElementNotifica extends LitElement {
  static get properties() {
    return {
      /**
       * Número que se mostrará en el círculo de notificación
       */
      count: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.count = 0;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('my-custom-element-notifica-shared-styles'),
    ];
  }

  render() {
    return html`
      <div class="notification-badge">
        <span class="count">${this.count}</span>
      </div>
    `;
  }
}
