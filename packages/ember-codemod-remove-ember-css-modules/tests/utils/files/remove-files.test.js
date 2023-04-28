import { removeFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | remove-files', function () {
  const inputProject = {
    app: {
      components: {
        ui: {
          form: {
            'information.css': '',
            'information.d.ts': '',
            'information.hbs': '',
          },
        },
        widgets: {
          'widget-1.css': '',
          'widget-1.hbs': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.d.ts': '',
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
            'information.d.ts': '',
          },
        },
        widgets: {
          'widget-1.css': '',
        },
        'navigation-menu.css': '',
        'navigation-menu.d.ts': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const filePaths = [
    'app/components/navigation-menu.hbs',
    'app/components/ui/form/information.hbs',
    'app/components/widgets/widget-1.hbs',
  ];

  removeFiles(filePaths, options);

  assertFixture(outputProject, codemodOptions);
});
