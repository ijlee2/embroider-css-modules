/* eslint-disable @typescript-eslint/ban-ts-comment */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { createFiles, parseFilePath } from '@codemod-utils/files';

import type { OptionsForImportStyles } from '../../../types/index.js';

type Data = {
  fileName: string;
  isTypeScript: boolean;
};

function canSkip(file: string, data: Data): boolean {
  const traverse = AST.traverse(data.isTypeScript);
  let canSkip = false;

  traverse(file, {
    visitImportDeclaration(path) {
      if (path.node.source.value === `./${data.fileName}.css`) {
        canSkip = true;
      }

      return false;
    },
  });

  return canSkip;
}

function removeTemplateOnlyComponentMethod(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(path) {
      if (path.value.callee.name !== 'templateOnlyComponent') {
        return false;
      }

      const superClass = AST.builders.identifier('Component');

      if (data.isTypeScript) {
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
      if (path.value.source.value !== '@ember/component/template-only') {
        return false;
      }

      const defaultImport = path.value.specifiers.find(
        (specifier: { type: string }) =>
          specifier.type === 'ImportDefaultSpecifier',
      );

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

function importStylesInClass(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  // Find the last import statement
  let lastImportDeclarationPath: unknown;

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      if (!lastImportDeclarationPath) {
        lastImportDeclarationPath = path;
        // @ts-ignore: Assume that types from external packages are correct
      } else if (path.node.start > lastImportDeclarationPath.node.start) {
        lastImportDeclarationPath = path;
      }

      return false;
    },
  });

  // Append the styles import
  // @ts-ignore: Assume that types from external packages are correct
  const nodes = ast.program.body;
  // @ts-ignore: Assume that types from external packages are correct
  const index = lastImportDeclarationPath?.name ?? -1;

  nodes.splice(
    index + 1,
    0,
    AST.builders.importDeclaration(
      [AST.builders.importDefaultSpecifier(AST.builders.identifier('styles'))],
      AST.builders.literal(`./${data.fileName}.css`),
    ),
  );

  return AST.print(ast);
}

function addStylesAsClassProperty(file: string, data: Data): string {
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
        // @ts-ignore: Assume that types from external packages are correct
        nodesToAdd.push(AST.builders.noop());
      }

      body.unshift(...nodesToAdd);

      return false;
    },
  });

  return AST.print(ast);
}

export function updateClass(
  entityName: string,
  { customizations, options }: OptionsForImportStyles,
): void {
  const { getFilePath } = customizations;
  const { projectRoot } = options;

  const filePath = getFilePath(entityName);
  const { ext, name } = parseFilePath(filePath);

  const data = {
    fileName: name,
    isTypeScript: ext === '.ts',
  };

  try {
    let file = readFileSync(join(projectRoot, filePath), 'utf8');

    if (canSkip(file, data)) {
      return;
    }

    file = removeTemplateOnlyComponentMethod(file, data);
    file = importStylesInClass(file, data);
    file = addStylesAsClassProperty(file, data);

    const fileMap = new Map([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    let message = `WARNING: updateClass could not update \`${filePath}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(`${message}\n`);
  }
}
