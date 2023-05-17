import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { importStylesInComponents } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/nested.js';

test('migration | ember-app | steps | import-styles-in-components > nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/import-styles-in-components/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/import-styles-in-components/nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
