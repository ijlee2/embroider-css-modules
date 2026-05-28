import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTemplateTag: boolean;
};

export function addStylesToClass(file: string, data: Data): string {
  if (data.isTemplateTag) {
    return file;
  }

  const ast = AST.traverse(file, {
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
