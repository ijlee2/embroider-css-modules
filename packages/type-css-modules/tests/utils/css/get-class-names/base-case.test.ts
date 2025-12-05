import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-class-names > base case', function () {
  const cssFile = normalizeFile([
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
  ]);

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'application',
    'copyright',
    'footer',
    'header',
    'link',
    'main',
  ]);
});
