import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../../../src/migration/ember-app/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-app/ember-container-query-typescript/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/typescript.js';

test('migration | ember-app | steps | analyze-project > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeProject(options), context);
});
