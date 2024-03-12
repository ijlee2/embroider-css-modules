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
} from '../../../../helpers/shared-test-setups/ember-app/typescript.js';

test('migration | ember-app | steps | update-app-app-js > typescript', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAppAppJs(options);

  assertFixture(outputProject, codemodOptions);
});
