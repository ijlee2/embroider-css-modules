import { createFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | create-files', function () {
  const inputProject = {};

  const outputProject = {
    app: {
      components: {
        ui: {
          'page.css.d.ts': 'some code for page.css.d.ts',
        },
        'navigation-menu.css.d.ts': 'some code for navigation-menu.css.d.ts',
      },
      routes: {
        'application.css.d.ts': 'some code for application.css.d.ts',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const fileMapping = new Map([
    [
      'app/components/navigation-menu.css.d.ts',
      'some code for navigation-menu.css.d.ts',
    ],
    ['app/components/ui/page.css.d.ts', 'some code for page.css.d.ts'],
    ['app/routes/application.css.d.ts', 'some code for application.css.d.ts'],
  ]);

  createFiles(fileMapping, options);

  assertFixture(outputProject, codemodOptions);
});
