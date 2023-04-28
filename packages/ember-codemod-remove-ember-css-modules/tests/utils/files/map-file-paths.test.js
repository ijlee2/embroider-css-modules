import { mapFilePaths } from '../../../src/utils/files.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | files | map-file-paths > base case', function () {
  const filePaths = [
    'app/styles/application.css',
    'app/styles/index.css',
    'app/styles/products.css',
    'app/styles/products/product.css',
  ];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/controllers',
  });

  const expectedValue = new Map([
    ['app/styles/application.css', 'app/controllers/application.css'],
    ['app/styles/index.css', 'app/controllers/index.css'],
    ['app/styles/products.css', 'app/controllers/products.css'],
    ['app/styles/products/product.css', 'app/controllers/products/product.css'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths are mapped from the project root', function () {
  const filePaths = [
    'app/styles/application.css',
    'app/styles/index.css',
    'app/styles/products.css',
    'app/styles/products/product.css',
  ];

  const pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: 'css-modules',
  });

  const expectedValue = new Map([
    ['app/styles/application.css', 'css-modules/app/styles/application.css'],
    ['app/styles/index.css', 'css-modules/app/styles/index.css'],
    ['app/styles/products.css', 'css-modules/app/styles/products.css'],
    [
      'app/styles/products/product.css',
      'css-modules/app/styles/products/product.css',
    ],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths are mapped to the project root', function () {
  const filePaths = [
    'app/styles/application.css',
    'app/styles/index.css',
    'app/styles/products.css',
    'app/styles/products/product.css',
  ];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: '',
  });

  const expectedValue = new Map([
    ['app/styles/application.css', 'application.css'],
    ['app/styles/index.css', 'index.css'],
    ['app/styles/products.css', 'products.css'],
    ['app/styles/products/product.css', 'products/product.css'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths remain when there is no match', function () {
  const filePaths = [
    'app/components/navigation-menu.css',
    'app/styles',
    'app/styles.css',
  ];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/controllers',
  });

  const expectedValue = new Map([
    [
      'app/components/navigation-menu.css',
      'app/components/navigation-menu.css',
    ],
    ['app/styles', 'app/styles'],
    ['app/styles.css', 'app/styles.css'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});
