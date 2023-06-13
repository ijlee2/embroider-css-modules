import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-class-names > edge case (nested selector)', function () {
  const cssFile = [
    '#parent-id-1 {',
    '  & .child-selector-1 {}',
    '}',
    '#parent-id-2 {',
    '  .child-selector-2 {}',
    '}',
    '.parent-selector-3 {',
    '  & .child-selector-3 {}',
    '}',
    '.parent-selector-4 {',
    '  .child-selector-4 {}',
    '}',
  ].join('\n');

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'child-selector-1',
    // 'child-selector-2' is missing
    'child-selector-3',
    // 'child-selector-4' is missing
    'parent-selector-3',
    'parent-selector-4',
  ]);
});
