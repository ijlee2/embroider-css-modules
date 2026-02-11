import { render } from '@ember/test-helpers';
import { local } from 'embroider-css-modules';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-embroider-css-modules/tests/helpers';

module('Integration | Helper | local', function (hooks) {
  setupRenderingTest(hooks);

  module('<template> tag', function () {
    test('returns an empty string when there are no local class names', async function (assert) {
      const styles = {
        container: 'container-hashed',
        'is-inline': 'is-inline-hashed',
        'is-wide': 'is-wide-hashed',
        'no-feedback': 'no-feedback-hashed',
      };

      await render(
        <template>
          <div class={{local styles}} data-test-element>
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute('class', '', 'We see the correct global class names.');
    });

    test('returns a concatenated string when there are local class names', async function (assert) {
      const styles = {
        container: 'container-hashed',
        'is-inline': 'is-inline-hashed',
        'is-wide': 'is-wide-hashed',
        'no-feedback': 'no-feedback-hashed',
      };

      await render(
        <template>
          <div
            class={{local styles "container" "is-wide" "is-inline"}}
            data-test-element
          >
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.',
        );
    });
  });
});
