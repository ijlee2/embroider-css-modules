import { setupTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:products');
    assert.ok(controller);
  });
});
