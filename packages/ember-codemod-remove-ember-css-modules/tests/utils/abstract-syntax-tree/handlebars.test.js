import { ASTHandlebars as AST } from '../../../src/utils/abstract-syntax-tree.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | abstract-syntax-tree | handlebars > file is empty', function () {
  const oldFile = '';

  const ast = AST.traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(newFile, '');
});

test('utils | abstract-syntax-tree | handlebars > visit methods are undefined', function () {
  const oldFile = [
    `{{! Some comment }}`,
    `<div data-test-container local-class="container">`,
    `  {{! Some content }}`,
    `</div>`,
    ``,
  ].join('\n');

  const ast = AST.traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `{{! Some comment }}`,
      `<div data-test-container local-class="container">`,
      `  {{! Some content }}`,
      `</div>`,
      ``,
    ].join('\n'),
  );
});

test('utils | abstract-syntax-tree | handlebars > visit methods are well-defined', function () {
  const oldFile = [
    `{{! Some comment }}`,
    `<div data-test-container local-class="container">`,
    `  {{! Some content }}`,
    `</div>`,
    ``,
  ].join('\n');

  const ast = AST.traverse(oldFile, {
    AttrNode(node) {
      if (node.name !== 'local-class') {
        return;
      }

      node.name = 'class';
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `{{! Some comment }}`,
      `<div data-test-container class="container">`,
      `  {{! Some content }}`,
      `</div>`,
      ``,
    ].join('\n'),
  );
});
