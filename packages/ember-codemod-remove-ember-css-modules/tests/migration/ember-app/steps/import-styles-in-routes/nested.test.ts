import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { importStylesInRoutes } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

test('migration | ember-app | steps | import-styles-in-routes > nested', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-routes/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-routes/nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInRoutes(context, options);

  assertFixture(outputProject, codemodOptions);
});
