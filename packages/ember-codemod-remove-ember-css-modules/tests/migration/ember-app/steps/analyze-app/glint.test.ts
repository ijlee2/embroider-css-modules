import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeApp } from '../../../../../src/migration/ember-app/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-app/ember-container-query-glint/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/glint.js';

test('migration | ember-app | steps | analyze-app > glint', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeApp(options), context);
});
