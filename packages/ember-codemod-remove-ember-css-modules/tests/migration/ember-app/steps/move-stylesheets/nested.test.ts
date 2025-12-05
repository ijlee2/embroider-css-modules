import {
  assertFixture,
  loadFixture,
  normalizeFile,
  test,
} from '@codemod-utils/tests';

import { moveStylesheets } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

test('migration | ember-app | steps | move-stylesheets > nested', function () {
  const inputProject = {
    app: {
      controllers: {
        'form.ts': 'some code for form.ts',
        'products.ts': 'some code for products.ts',
      },
      styles: {
        products: {
          'product.css': 'some code for product.css',
        },
        'app.css': 'some code for app.css',
        'application.css': 'some code for application.css',
        'form.css': 'some code for form.css',
        'index.css': 'some code for index.css',
        'product-details.css': 'some code for product-details.css',
        'products.css': 'some code for products.css',
      },
    },
  };

  const outputProject = {
    app: {
      assets: {
        'app.css': 'some code for app.css',
      },
      controllers: {
        products: {
          'product.css': 'some code for product.css',
        },
        'application.css': 'some code for application.css',
        'form.css': 'some code for form.css',
        'form.ts': 'some code for form.ts',
        'index.css': 'some code for index.css',
        'product-details.css': 'some code for product-details.css',
        'products.css': 'some code for products.css',
        'products.ts': 'some code for products.ts',
      },
      styles: {
        'app.css': normalizeFile([
          `/* Ember supports plain CSS out of the box. More info: https://cli.emberjs.com/release/advanced-use/stylesheets/ */`,
          ``,
        ]),
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveStylesheets(options);

  assertFixture(outputProject, codemodOptions);
});
