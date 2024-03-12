import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../../../src/migration/ember-app/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-app/ember-container-query-nested/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

test('migration | ember-app | steps | analyze-project > nested', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeProject(options), context);
});
