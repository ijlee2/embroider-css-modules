import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

interface TestContext extends BaseTestContext {
  styles: {
    container: string;
    'is-inline': string;
    'is-wide': string;
    'no-feedback': string;
  };
}

module('Integration | Helper | local-class', function (hooks) {
  setupRenderingTest(hooks);

  module('When styles is well-defined', function (nestedHooks) {
    nestedHooks.beforeEach(function (this: TestContext) {
      this.styles = {
        container: 'container-hashed',
        'is-inline': 'is-inline-hashed',
        'is-wide': 'is-wide-hashed',
        'no-feedback': 'no-feedback-hashed',
      };
    });

    test('returns an empty string when there are no local class names', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div
          class={{local-class this.styles}}
          data-test-element
        >
        </div>
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute('class', '', 'We see the correct global class names.');
    });

    test('returns a concatenated string when there are local class names', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div
          class={{local-class this.styles "container" "is-wide" "is-inline"}}
          data-test-element
        >
        </div>
      `);

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
