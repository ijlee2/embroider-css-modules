import { createFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | create-files', function () {
  const inputProject = {};

  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            'information.ts': 'some code for information.ts',
          },
        },
        widgets: {
          'widget-1.ts': 'some code for widget-1.ts',
        },
        'navigation-menu.ts': 'some code for navigation-menu.ts',
      },
      controllers: {
        'application.ts': 'some code for application.ts',
        'index.ts': 'some code for index.ts',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const fileMapping = new Map([
    ['app/components/navigation-menu.ts', 'some code for navigation-menu.ts'],
    ['app/components/ui/form/information.ts', 'some code for information.ts'],
    ['app/components/widgets/widget-1.ts', 'some code for widget-1.ts'],
    ['app/controllers/application.ts', 'some code for application.ts'],
    ['app/controllers/index.ts', 'some code for index.ts'],
  ]);

  createFiles(fileMapping, options);

  assertFixture(outputProject, codemodOptions);
});
