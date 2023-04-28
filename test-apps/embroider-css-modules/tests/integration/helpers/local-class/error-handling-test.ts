import { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
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

  module('Error handling', function (nestedHooks) {
    nestedHooks.beforeEach(function (this: TestContext) {
      this.styles = {
        container: 'container-hashed',
        'is-inline': 'is-inline-hashed',
        'is-wide': 'is-wide-hashed',
        'no-feedback': 'no-feedback-hashed',
      };
    });

    test('ignores misspelled local class names', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div
          {{! @glint-expect-error: We are testing a special case (there are typos) }}
          class={{local-class this.styles "ontainer" "is-wide" "is-inlin"}}
          data-test-element
        >
        </div>
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'is-wide-hashed',
          'We see the correct global class names.',
        );
    });

    test('does not ignore duplicated local class names', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div
          class={{local-class this.styles "is-wide" "container" "is-wide" "is-inline"}}
          data-test-element
        >
        </div>
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'is-wide-hashed container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.',
        );
    });
  });
});
