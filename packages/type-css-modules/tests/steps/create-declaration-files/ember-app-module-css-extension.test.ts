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
} from '../../helpers/shared-test-setups/ember-app-module-css-extension.js';

test('steps | create-declaration-files > ember-app-module-css-extension', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-module-css-extension/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-module-css-extension/output',
  );

  loadFixture(inputProject, codemodOptions);

  createDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
