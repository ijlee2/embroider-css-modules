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
} from '../../../../helpers/shared-test-setups/ember-app/javascript.js';

test('migration | ember-app | steps | import-styles-in-components > javascript', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-components/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-components/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
