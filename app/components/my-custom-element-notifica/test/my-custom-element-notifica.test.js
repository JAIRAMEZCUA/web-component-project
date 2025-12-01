import '@bbva-web-components/bbva-core-scoped-custom-element-registry';
import {
  html,
  fixture,
  assert,
  fixtureCleanup
} from '@open-wc/testing';
import '../my-custom-element-notifica.js';

suite('MyCustomElementNotifica', () => {
  let el;

  teardown(() => fixtureCleanup());

  suite('default', () => {
    setup(async () => {
      el = await fixture(html`
        <my-custom-element-notifica></my-custom-element-notifica>
      `);
      await el.updateComplete;
    });

    test('a11y', async () => {
      await assert.isAccessible(el);
    });
  });
});
