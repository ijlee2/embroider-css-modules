import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAppAppJs } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/glint.js';

test('migration | ember-app | steps | update-app-app-js > glint', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAppAppJs(options);

  assertFixture(outputProject, codemodOptions);
});
