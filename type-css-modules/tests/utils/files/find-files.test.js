import { findFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assert, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | find-files', function () {
  const inputProject = {
    app: {
      components: {
        ui: {
          'page.css': '',
          'page.css.d.ts': '',
          'page.hbs': '',
          'page.ts': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.css.d.ts': '',
        'navigation-menu.hbs': '',
        'navigation-menu.ts': '',
      },
      routes: {
        'application.css': '',
        'application.css.d.ts': '',
      },
    },
    node_modules: {
      'ember-container-query': {
        dist: {
          components: {
            'container-query.css': '',
          },
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  let filePaths = findFiles('app/**/*.css', {
    cwd: options.projectRoot,
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'app/components/navigation-menu.css',
    'app/components/ui/page.css',
    'app/routes/application.css',
  ]);

  filePaths = findFiles('**/*.css', {
    cwd: options.projectRoot,
    ignoreList: ['node_modules/**/*'],
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'app/components/navigation-menu.css',
    'app/components/ui/page.css',
    'app/routes/application.css',
  ]);
});
