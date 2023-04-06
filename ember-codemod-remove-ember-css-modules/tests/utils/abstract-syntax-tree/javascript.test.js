import { ASTJavaScript as AST } from '../../../src/utils/abstract-syntax-tree.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | abstract-syntax-tree | javascript > file is empty', function () {
  const oldFile = '';

  const traverse = AST.traverse(false);
  const ast = traverse(oldFile);

  const newFile = AST.convertToFile(ast);

  assert.strictEqual(newFile, '');
});

test('utils | abstract-syntax-tree | javascript > visit methods are undefined', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `export default class NavigationMenuComponent extends Component {}`,
    ``,
  ].join('\n');

  const traverse = AST.traverse(false);
  const ast = traverse(oldFile);

  const newFile = AST.convertToFile(ast);

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `export default class NavigationMenuComponent extends Component {}`,
      ``,
    ].join('\n')
  );
});

test('utils | abstract-syntax-tree | javascript > visit methods are well-defined', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `export default class NavigationMenuComponent extends Component {}`,
    ``,
  ].join('\n');

  const traverse = AST.traverse(false);
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
      `export default class NavigationMenuComponent extends Component {`,
      `  styles = styles;`,
      `}`,
      ``,
    ].join('\n')
  );
});
