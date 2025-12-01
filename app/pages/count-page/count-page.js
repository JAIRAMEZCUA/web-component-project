/* eslint-disable new-cap  */
import { html, css, LitElement } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { CellsPageMixin } from '@cells/cells-page-mixin';
import { DemoSphericaTemplate } from '@cells-demo/demo-spherica-template';
import { MyCustomElementNotifica } from '../../components/my-custom-element-notifica/src/MyCustomElementNotifica.js';

class CountPage extends CellsPageMixin(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'demo-spherica-template': DemoSphericaTemplate,
      'my-custom-element-notifica': MyCustomElementNotifica,

    };
  }

  static get properties() {
    return {
      count: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        min-height: 100vh;
      }

      .layout {
        display: flex;
        width: 100%;
      }

      .sidebar {
        width: 280px;
      }

      .main-content {
        flex: 1;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .counter {
        text-align: center;
        background: white;
        padding: 3rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #004481;
        margin-bottom: 2rem;
      }

      .display {
        font-size: 4rem;
        font-weight: bold;
        color: #0073c1;
        margin: 2rem 0;
      }

      .buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      button {
        padding: 1rem 2rem;
        font-size: 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s;
      }

      button:hover {
        transform: scale(1.05);
      }

      .btn-add {
        background: #28a745;
        color: white;
      }

      .btn-subtract {
        background: #dc3545;
        color: white;
      }

      .btn-reset {
        background: #6c757d;
        color: white;
      }

      @media (max-width: 768px) {
        .layout {
          flex-direction: column;
        }
        .sidebar {
          width: 100%;
        }
        .buttons {
          flex-direction: column;
        }
      }
    `;
  }

  constructor() {
    super();
    this.count = 0;
  }

  get _headerTpl() {
    return html`
      <div slot="app-header">
        <div class="display">
          <my-custom-element-notifica .count=${this.count}></my-custom-element-notifica>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <demo-spherica-template class="template" page-title="First page">
        ${this._headerTpl}
      <div slot="app-main-content">
          <div class="layout">
            <aside class="sidebar">
              <my-custom-element-menu></my-custom-element-menu>
            </aside>

            <main class="main-content">
              <div class="counter">
                <h1>Contador</h1>
                <div class="display">${this.count}</div>
                <div class="buttons">
                  <button class="btn-add" @click=${() => this.count++}>
                    + Sumar
                  </button>
                  <button class="btn-subtract" @click=${() => this.count--}>
                    - Restar
                  </button>
                  <button class="btn-reset" @click=${() => (this.count = 0)}>
                    Reset
                  </button>
                  <button
                    class="btn-back"
                    @click=${() => this.goToHome()}
                  >
                    Volver a Home
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </demo-spherica-template>
    `;
  }
  goToHome() {
    this.publish('count-channel', { count: this.count });
    this.navigate('first');
  }
}

/* como nota se mantiene count :

Esto se llama "state en memoria" y funciona solo mientras:

No recargues la página del navegador (F5)
No cierres la pestaña
La aplicación no destruya el componente

pero al verificar :
Para verificar qué está pasando, puedes hacer una prueba:
Abre la consola del navegador (F12)
Ve a la pestaña "Application" → "Local Storage" y "Session Storage"
Revisa si hay algún valor guardado relacionado con count
app-count	3
*/
window.customElements.define('count-page', CountPage);
