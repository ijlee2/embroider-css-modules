import { findFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';
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
      controllers: {
        'application.css': '',
        'application.css.d.ts': '',
      },
      styles: {
        'app.css': '',
        'app.css.d.ts': '',
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

  let filePaths = findFiles('app/components/**/*.css', {
    cwd: options.projectRoot,
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'app/components/navigation-menu.css',
    'app/components/ui/page.css',
  ]);

  filePaths = findFiles('**/*.css', {
    cwd: options.projectRoot,
    ignoreList: ['node_modules/**/*'],
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'app/components/navigation-menu.css',
    'app/components/ui/page.css',
    'app/controllers/application.css',
    'app/styles/app.css',
  ]);
});
