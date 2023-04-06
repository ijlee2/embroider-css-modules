import { ASTJavaScript as AST } from '../../../src/utils/abstract-syntax-tree.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | abstract-syntax-tree | typescript > file is empty', function () {
  const oldFile = '';

  const traverse = AST.traverse(true);
  const ast = traverse(oldFile);

  const newFile = AST.convertToFile(ast);

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

  const newFile = AST.convertToFile(ast);

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `interface NavigationMenuSignature {}`,
      ``,
      `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}`,
      ``,
    ].join('\n')
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
        AST.builder.classProperty(
          AST.builder.identifier('styles'),
          AST.builder.identifier('styles')
        )
      );

      return false;
    },
  });

  const newFile = AST.convertToFile(ast);

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
    ].join('\n')
  );
});
