import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject, updateProject } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | update-project > base case', function () {
  const inputProject = {
    app: {
      assets: {
        'app.css': '',
      },
    },
  };

  const outputProject = {
    app: {
      assets: {
        'app.css': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  updateProject(project, options);

  assertFixture(outputProject, codemodOptions);
});
