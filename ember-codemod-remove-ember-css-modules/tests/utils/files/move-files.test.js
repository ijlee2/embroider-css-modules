import { moveFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | move-files', function () {
  const inputProject = {
    app: {
      styles: {
        products: {
          'product.css': 'some code for product.css',
        },
        'application.css': 'some code for application.css',
        'index.css': 'some code for index.css',
        'products.css': 'some code for products.css',
      },
    },
  };

  const outputProject = {
    app: {
      controllers: {
        products: {
          'product.css': 'some code for product.css',
        },
        'application.css': 'some code for application.css',
        'index.css': 'some code for index.css',
        'products.css': 'some code for products.css',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const migrationStrategy = new Map([
    ['app/styles/application.css', 'app/controllers/application.css'],
    ['app/styles/index.css', 'app/controllers/index.css'],
    ['app/styles/products.css', 'app/controllers/products.css'],
    ['app/styles/products/product.css', 'app/controllers/products/product.css'],
  ]);

  moveFiles(migrationStrategy, options);

  assertFixture(outputProject, codemodOptions);
});
