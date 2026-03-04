import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | analyze-project > base case', function () {
  const inputProject = {
    app: {
      assets: {
        'app.css': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(Array.from(project.components.keys()), []);

  assert.deepStrictEqual(Array.from(project.routes.keys()), []);
});
