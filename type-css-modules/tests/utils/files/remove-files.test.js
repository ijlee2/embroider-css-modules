import { removeFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | remove-files', function () {
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
  };

  const outputProject = {
    app: {
      components: {
        ui: {
          'page.css': '',
          'page.hbs': '',
          'page.ts': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.hbs': '',
        'navigation-menu.ts': '',
      },
      routes: {
        'application.css': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const filePaths = [
    'app/components/navigation-menu.css.d.ts',
    'app/components/ui/page.css.d.ts',
    'app/routes/application.css.d.ts',
  ];

  removeFiles(filePaths, options);

  assertFixture(outputProject, codemodOptions);
});
