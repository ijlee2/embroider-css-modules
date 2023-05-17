import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createDeclarationFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';

test('steps | create-declaration-files > ember-app-flat', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-flat/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-flat/output',
  );

  loadFixture(inputProject, codemodOptions);

  createDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
