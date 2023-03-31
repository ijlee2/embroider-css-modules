import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | local-class', function (hooks) {
  setupRenderingTest(hooks);

  module('When styles is an empty object', function () {
    test('returns an empty string when there are no local class names', async function (assert) {
      await render(hbs`
        <div
          class={{local-class (hash)}}
          data-test-element
        >
        </div>
      `);

      assert.dom('[data-test-element]').hasAttribute('class', '');
    });

    test('returns an empty string when there are local class names', async function (assert) {
      await render(hbs`
        <div
          {{! @glint-expect-error: We are testing a special case (styles is an empty object) }}
          class={{local-class (hash) "container" "is-wide" "is-inline"}}
          data-test-element
        >
        </div>
      `);

      assert.dom('[data-test-element]').hasAttribute('class', '');
    });
  });
});
