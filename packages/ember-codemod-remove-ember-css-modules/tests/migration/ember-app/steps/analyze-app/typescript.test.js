import { analyzeApp } from '../../../../../src/migration/ember-app/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-container-query-typescript/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-app | steps | analyze-app > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeApp(options), context);
});
