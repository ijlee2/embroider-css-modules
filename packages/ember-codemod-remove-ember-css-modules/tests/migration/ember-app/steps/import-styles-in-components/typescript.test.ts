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
} from '../../../../helpers/shared-test-setups/typescript.js';

test('migration | ember-app | steps | import-styles-in-components > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/import-styles-in-components/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/import-styles-in-components/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
