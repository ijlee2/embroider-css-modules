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
} from '../../../../helpers/shared-test-setups/ember-app/glint.js';

test('migration | ember-app | steps | import-styles-in-components > glint', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-components/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-components/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
