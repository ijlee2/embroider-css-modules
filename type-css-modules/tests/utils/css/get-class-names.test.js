import { getClassNames } from '../../../src/utils/css.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assert, loadFixture, test } from '../../helpers/testing.js';

test('utils | css | get-class-names > base case (1)', function () {
  const cssFile = [
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
  ].join('\n');

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'application',
    'copyright',
    'footer',
    'header',
    'link',
    'main',
  ]);
});

test('utils | css | get-class-names > base case (2)', function () {
  const cssFile = '.container.is-inline:not(.is-wide, .no-feedback) {}';

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'container',
    'is-inline',
    'is-wide',
    'no-feedback',
  ]);
});

test('utils | css | get-class-names > non-class selectors are supported', function () {
  const cssFile = [
    '* {}',
    'input {}',
    'input.has-error {}',
    '#ember123 {}',
  ].join('\n');

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'has-error',
  ]);
});

test('utils | css | get-class-names > nested selectors are not supported', function () {
  const cssFile = [
    '#parent-id-1 {',
    '  & .child-selector-1 {}',
    '}',
    '#parent-id-2 {',
    '  .child-selector-2 {}',
    '}',
    '.parent-selector-3 {',
    '  & .child-selector-3 {}',
    '}',
    '.parent-selector-4 {',
    '  .child-selector-4 {}',
    '}',
  ].join('\n');

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  getClassNames('app/styles.css', options);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'child-selector-1',
    'child-selector-3',
    'parent-selector-3',
    'parent-selector-4',
  ]);
});

test('utils | css | get-class-names > pseudo-class selector :global is supported', function () {
  const cssFile = '.link:global(.active) {}';

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), ['link']);
});

test('utils | css | get-class-names > pseudo-class selector :local is not supported', function () {
  const cssFile = ':local(.link).active {}';

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), ['active']);
});
