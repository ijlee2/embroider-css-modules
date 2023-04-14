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
      '.application {}',
      '.header {}',
      '.main {}',
      '.footer {}',
      '.copyright {}',
      '.copyright .link {}',
      '',
    ].join('\n')
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

  const ast = AST.traverse(oldFile, {
    Rule(node) {
      const selectors = node.selector.split(/\s+/);

      selectors.forEach((selector) => {
        if (!selector.startsWith('.')) {
          return;
        }

        const classSelector = selector.replace(/^\./, '');

        classNames.add(classSelector);
      });
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      '.application {}',
      '.header {}',
      '.main {}',
      '.footer {}',
      '.copyright {}',
      '.copyright .link {}',
      '',
    ].join('\n')
  );

  assert.deepStrictEqual([...classNames].sort(), [
    'application',
    'copyright',
    'footer',
    'header',
    'link',
    'main',
  ]);
});
