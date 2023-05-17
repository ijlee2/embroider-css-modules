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
} from '../../helpers/shared-test-setups/ember-app-nested.js';

test('steps | create-declaration-files > ember-app-nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  createDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
