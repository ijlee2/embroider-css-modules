import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTemplateTag: boolean;
  isTypeScript: boolean;
};

export function addStylesToClass(file: string, data: Data): string {
  if (data.isTemplateTag) {
    return file;
  }

  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      const { body } = path.node.body;

      const nodesToAdd = [
        AST.builders.classProperty(
          AST.builders.identifier('styles'),
          AST.builders.identifier('styles'),
        ),
      ];

      if (body.length > 0) {
        // @ts-expect-error: Incorrect type
        nodesToAdd.push(AST.builders.noop());
      }

      body.unshift(...nodesToAdd);

      return false;
    },
  });

  return AST.print(ast);
}
