import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTemplateTag: boolean;
  isTypeScript: boolean;
};

export function replaceTemplateOnlyComponent(file: string, data: Data): string {
  if (data.isTemplateTag) {
    return file;
  }

  const ast = AST.traverse(file, {
    visitCallExpression(path) {
      // oxlint-disable-next-line typescript/no-unsafe-member-access
      if (path.value.callee.name !== 'templateOnlyComponent') {
        return false;
      }

      const superClass = AST.builders.identifier('Component');

      if (data.isTypeScript) {
        // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
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
      // oxlint-disable-next-line typescript/no-unsafe-member-access
      if (path.value.source.value !== '@ember/component/template-only') {
        return false;
      }

      // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access
      const defaultImport = path.value.specifiers.find(
        (specifier: { type: string }) =>
          specifier.type === 'ImportDefaultSpecifier',
      );

      // oxlint-disable-next-line typescript/no-unsafe-member-access
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
