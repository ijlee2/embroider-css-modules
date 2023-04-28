import { removeDirectoryIfEmpty } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | remove-directory-if-empty > parent directories are empty', function () {
  const inputProject = {
    app: {
      components: {},
    },
  };

  const outputProject = {};

  loadFixture(inputProject, codemodOptions);

  removeDirectoryIfEmpty({
    oldPath: 'app/components/navigation-menu.css.d.ts',
    projectRoot: options.projectRoot,
  });

  assertFixture(outputProject, codemodOptions);
});

test('utils | files | remove-directory-if-empty > a parent directory is not empty', function () {
  const inputProject = {
    app: {
      components: {},
      '.gitkeep': '',
    },
  };

  const outputProject = {
    app: {
      '.gitkeep': '',
    },
  };

  loadFixture(inputProject, codemodOptions);

  removeDirectoryIfEmpty({
    oldPath: 'app/components/navigation-menu.css.d.ts',
    projectRoot: options.projectRoot,
  });

  assertFixture(outputProject, codemodOptions);
});
