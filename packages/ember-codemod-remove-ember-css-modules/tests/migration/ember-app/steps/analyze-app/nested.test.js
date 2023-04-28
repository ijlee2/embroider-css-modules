import { analyzeApp } from '../../../../../src/migration/ember-app/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-container-query-nested/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/nested.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-app | steps | analyze-app > nested', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeApp(options), context);
});
