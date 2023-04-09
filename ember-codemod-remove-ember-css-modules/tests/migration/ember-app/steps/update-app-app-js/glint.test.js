import { updateAppAppJs } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-app | steps | update-app-app-js > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-app-app-js/glint/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-app-app-js/glint/output'
  );

  loadFixture(inputProject, codemodOptions);

  updateAppAppJs(options);

  assertFixture(outputProject, codemodOptions);
});
