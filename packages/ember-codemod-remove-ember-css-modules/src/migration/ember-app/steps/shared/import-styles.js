import { readFileSync } from 'node:fs';
import { join, parse } from 'node:path';

import { ASTJavaScript as AST } from '@codemod-utils/ast';
import { processTemplate } from '@codemod-utils/blueprints';
import { createFiles } from '@codemod-utils/files';

import { blueprintsRoot } from '../../../../utils/blueprints.js';
import { parseEntityName } from '../../../../utils/string.js';

function removeTemplateOnlyComponentMethod(file, data) {
  const traverse = AST.traverse(data.hasTypeScript);

  const ast = traverse(file, {
    visitCallExpression(path) {
      if (path.value.callee.name !== 'templateOnlyComponent') {
        return false;
      }

      const superClass = AST.builders.identifier('Component');

      if (data.hasTypeScript) {
        superClass.typeAnnotation = path.value.typeParameters;
      }

      return AST.builders.classExpression(
        null,
        AST.builders.classBody([
          AST.builders.classProperty(
            AST.builders.identifier(data.__styles__),
            AST.builders.identifier(data.__styles__),
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
        (specifier) => specifier.type === 'ImportDefaultSpecifier',
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

function importStylesInClass(file, data) {
  const traverse = AST.traverse(data.hasTypeScript);

  // Find the last import statement
  let lastImportDeclarationPath;

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      if (!lastImportDeclarationPath) {
        lastImportDeclarationPath = path;
      } else if (path.node.start > lastImportDeclarationPath.node.start) {
        lastImportDeclarationPath = path;
      }

      return false;
    },
  });

  // Append the styles import
  const nodes = ast.program.body;
  const index = lastImportDeclarationPath?.name ?? -1;

  nodes.splice(
    index + 1,
    0,
    AST.builders.importDeclaration(
      [
        AST.builders.importDefaultSpecifier(
          AST.builders.identifier(data.__styles__),
        ),
      ],
      AST.builders.literal(`./${data.fileName}.css`),
    ),
  );

  return AST.print(ast);
}

function addStylesAsClassProperty(file, data) {
  const traverse = AST.traverse(data.hasTypeScript);

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      const { body } = path.node.body;

      const nodesToAdd = [
        AST.builders.classProperty(
          AST.builders.identifier(data.__styles__),
          AST.builders.identifier(data.__styles__),
        ),
      ];

      if (body.length > 0) {
        nodesToAdd.push(AST.builders.noop());
      }

      body.unshift(...nodesToAdd);

      return false;
    },
  });

  return AST.print(ast);
}

function createClass(customizations, options) {
  const { blueprintFilePaths, entity, filePath } = customizations;

  const fileMapping = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const blueprintFile = readFileSync(
        join(blueprintsRoot, blueprintFilePath),
        'utf8',
      );

      const file = processTemplate(blueprintFile, {
        entity,
        options,
      });

      return [filePath, file];
    }),
  );

  createFiles(fileMapping, options);
}

function updateClass(customizations, options) {
  const { filePath } = customizations;
  const { __styles__, projectRoot } = options;

  const { ext: fileExtension, name: fileName } = parse(filePath);
  const hasTypeScript = fileExtension === '.ts';

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    file = removeTemplateOnlyComponentMethod(file, {
      __styles__,
      hasTypeScript,
    });

    file = importStylesInClass(file, {
      __styles__,
      fileName,
      hasTypeScript,
    });

    file = addStylesAsClassProperty(file, {
      __styles__,
      hasTypeScript,
    });

    const fileMapping = new Map([[filePath, file]]);

    createFiles(fileMapping, options);
  } catch (e) {
    console.warn(
      `WARNING: updateClass could not update \`${filePath}\`. Please update the file manually. (${e.message})\n`,
    );
  }
}

export function importStyles(customizations, options) {
  const { blueprintFilePaths, entities, getFilePath } = customizations;

  for (const [entityName, extensions] of entities) {
    const hasClass = extensions.has('.js') || extensions.has('.ts');
    const hasStylesheet = extensions.has('.css');

    if (!hasStylesheet) {
      continue;
    }

    const entity = parseEntityName(entityName);
    const filePath = getFilePath(entityName);

    if (!hasClass) {
      createClass({ blueprintFilePaths, entity, filePath }, options);

      continue;
    }

    updateClass({ filePath }, options);
  }
}
