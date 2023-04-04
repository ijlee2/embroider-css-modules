/* https://github.com/ember-cli/ember-cli-string-utils/blob/v1.1.0/test.js */
import { classify } from '../../../../src/utils/string.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | string | ember-cli-string-utils | classify', function () {
  assert.strictEqual(classify(''), '');
  assert.strictEqual(classify('innerHTML'), 'InnerHTML');
  assert.strictEqual(classify('action_name'), 'ActionName');
  assert.strictEqual(classify('css-class-name'), 'CssClassName');
  assert.strictEqual(classify('my favorite items'), 'MyFavoriteItems');
  assert.strictEqual(classify('My favorite items'), 'MyFavoriteItems');
});
