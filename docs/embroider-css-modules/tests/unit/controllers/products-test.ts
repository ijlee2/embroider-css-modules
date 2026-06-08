import { setupTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:products');

    assert.ok(controller);
  });
});
