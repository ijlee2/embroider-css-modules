import { copyFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | copy-files', function () {
  const inputProject = {
    app: {
      components: {
        ui: {
          form: {
            'information.css': '',
            'information.d.ts': 'some code for information.d.ts',
            'information.hbs': '',
          },
        },
        widgets: {
          'widget-1.css': '',
          'widget-1.hbs': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.d.ts': 'some code for navigation-menu.d.ts',
        'navigation-menu.hbs': '',
      },
    },
  };

  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            'information.css': '',
            'information.d.ts': 'some code for information.d.ts',
            'information.hbs': '',
            'information.ts': 'some code for information.d.ts',
          },
        },
        widgets: {
          'widget-1.css': '',
          'widget-1.hbs': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.d.ts': 'some code for navigation-menu.d.ts',
        'navigation-menu.hbs': '',
        'navigation-menu.ts': 'some code for navigation-menu.d.ts',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const migrationStrategy = new Map([
    [
      'app/components/navigation-menu.d.ts',
      'app/components/navigation-menu.ts',
    ],
    [
      'app/components/ui/form/information.d.ts',
      'app/components/ui/form/information.ts',
    ],
  ]);

  copyFiles(migrationStrategy, options);

  assertFixture(outputProject, codemodOptions);
});
