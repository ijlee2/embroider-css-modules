import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module(
  'Integration | Component | some-component-with-splattributes',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <SomeComponentWithSplattributes />
      `);

      assert.ok(true);
    });
  },
);
