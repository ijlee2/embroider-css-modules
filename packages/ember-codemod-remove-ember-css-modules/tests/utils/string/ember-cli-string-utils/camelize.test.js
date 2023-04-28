/* https://github.com/ember-cli/ember-cli-string-utils/blob/v1.1.0/test.js */
import { camelize } from '../../../../src/utils/string.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | string | ember-cli-string-utils | camelize', function () {
  assert.strictEqual(camelize(''), '');
  assert.strictEqual(camelize('innerHTML'), 'innerHTML');
  assert.strictEqual(camelize('action_name'), 'actionName');
  assert.strictEqual(camelize('css-class-name'), 'cssClassName');
  assert.strictEqual(camelize('my favorite items'), 'myFavoriteItems');
  assert.strictEqual(camelize('My favorite items'), 'myFavoriteItems');
});
