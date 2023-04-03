import { getDeclarationFile } from '../../../src/utils/css.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | css | get-declaration-file > base case', function () {
  const classNames = ['copyright', 'has-error', 'link', 'list'];

  const expectedValue = [
    'declare const styles: {',
    "  readonly 'copyright': string;",
    "  readonly 'has-error': string;",
    "  readonly 'link': string;",
    "  readonly 'list': string;",
    '};',
    '',
    'export default styles;',
    '',
  ].join('\n');

  assert.deepStrictEqual(getDeclarationFile(classNames), expectedValue);
});

test('utils | css | get-declaration-file > class names missing', function () {
  const classNames = undefined;

  const expectedValue = [
    'declare const styles: Record<string, never>;',
    '',
    'export default styles;',
    '',
  ].join('\n');

  assert.deepStrictEqual(getDeclarationFile(classNames), expectedValue);
});

test('utils | css | get-declaration-file > class names empty', function () {
  const classNames = [];

  const expectedValue = [
    'declare const styles: Record<string, never>;',
    '',
    'export default styles;',
    '',
  ].join('\n');

  assert.deepStrictEqual(getDeclarationFile(classNames), expectedValue);
});
