import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTemplateTag: boolean;
  isTypeScript: boolean;
};

export function replaceTemplateOnlyComponent(file: string, data: Data): string {
  if (data.isTemplateTag) {
    return file;
  }

  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(path) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (path.value.callee.name !== 'templateOnlyComponent') {
        return false;
      }

      const superClass = AST.builders.identifier('Component');

      if (data.isTypeScript) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        superClass.typeAnnotation = path.value.typeParameters;
      }

      return AST.builders.classExpression(
        null,
        AST.builders.classBody([
          AST.builders.classProperty(
            AST.builders.identifier('styles'),
            AST.builders.identifier('styles'),
          ),
        ]),
        superClass,
      );
    },

    visitImportDeclaration(path) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (path.value.source.value !== '@ember/component/template-only') {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const defaultImport = path.value.specifiers.find(
        (specifier: { type: string }) =>
          specifier.type === 'ImportDefaultSpecifier',
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (defaultImport?.local?.name !== 'templateOnlyComponent') {
        return false;
      }

      return AST.builders.importDeclaration(
        [
          AST.builders.importDefaultSpecifier(
            AST.builders.identifier('Component'),
          ),
        ],
        AST.builders.literal('@glimmer/component'),
      );
    },
  });

  return AST.print(ast);
}
