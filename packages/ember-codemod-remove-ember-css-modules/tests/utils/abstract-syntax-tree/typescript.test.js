import { assert, test } from '@codemod-utils/tests';

import { ASTJavaScript as AST } from '../../../src/utils/abstract-syntax-tree.js';

test('utils | abstract-syntax-tree | typescript > file is empty', function () {
  const oldFile = '';

  const traverse = AST.traverse(true);
  const ast = traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(newFile, '');
});

test('utils | abstract-syntax-tree | typescript > visit methods are undefined', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `interface NavigationMenuSignature {}`,
    ``,
    `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}`,
    ``,
  ].join('\n');

  const traverse = AST.traverse(true);
  const ast = traverse(oldFile);

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `interface NavigationMenuSignature {}`,
      ``,
      `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}`,
      ``,
    ].join('\n'),
  );
});

test('utils | abstract-syntax-tree | typescript > visit methods are well-defined', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `interface NavigationMenuSignature {}`,
    ``,
    `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}`,
    ``,
  ].join('\n');

  const traverse = AST.traverse(true);
  const ast = traverse(oldFile, {
    visitClassDeclaration(path) {
      const { body } = path.node.body;

      body.unshift(
        AST.builders.classProperty(
          AST.builders.identifier('styles'),
          AST.builders.identifier('styles'),
        ),
      );

      return false;
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `interface NavigationMenuSignature {}`,
      ``,
      `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {`,
      `  styles = styles;`,
      `}`,
      ``,
    ].join('\n'),
  );
});
