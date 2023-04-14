import { ASTCSS as AST } from '../../../src/utils/abstract-syntax-tree.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | abstract-syntax-tree | css > file is empty', function () {
  const oldFile = '';

  const ast = AST.traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(newFile, '');
});

test('utils | abstract-syntax-tree | css > visit methods are undefined', function () {
  const oldFile = [
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
    '',
  ].join('\n');

  const ast = AST.traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      '.application{}',
      '.header{}',
      '.main{}',
      '.footer{}',
      '.copyright{}',
      '.copyright .link{}',
      '',
    ].join('')
  );
});

test('utils | abstract-syntax-tree | css > visit methods are well-defined', function () {
  const oldFile = [
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
    '',
  ].join('\n');

  const classNames = new Set();

  AST.traverse(oldFile, {
    ClassSelector(node) {
      classNames.add(node.name);
    },
  });

  assert.deepStrictEqual([...classNames].sort(), [
    'application',
    'copyright',
    'footer',
    'header',
    'link',
    'main',
  ]);
});
