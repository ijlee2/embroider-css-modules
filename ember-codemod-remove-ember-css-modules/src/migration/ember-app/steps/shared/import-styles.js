import { readFileSync } from 'node:fs';
import { join, parse } from 'node:path';

import { ASTJavaScript as AST } from '../../../../utils/abstract-syntax-tree.js';
import {
  blueprintRoot,
  processTemplate,
} from '../../../../utils/blueprints.js';
import { createFiles } from '../../../../utils/files.js';
import { parseEntityName } from '../../../../utils/string.js';

function importStylesInClass(file, data) {
  // Find the last import statement
  const traverse = AST.traverse(data.fileExtension === '.ts');

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
          AST.builders.identifier(data.__styles__)
        ),
      ],
      AST.builders.literal(`./${data.fileName}.css`)
    )
  );

  return AST.print(ast);
}

function addStylesAsClassProperty(file, data) {
  const traverse = AST.traverse(data.fileExtension === '.ts');

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      const { body } = path.node.body;

      body.unshift(
        AST.builders.classProperty(
          AST.builders.identifier(data.__styles__),
          AST.builders.identifier(data.__styles__)
        )
      );

      return false;
    },
  });

  const newFile = AST.print(ast);

  return newFile.replace(
    new RegExp(`(${data.__styles__} = ${data.__styles__};)`),
    '$1\n'
  );
}

function createClass(customizations, options) {
  const { blueprintFilePaths, entityName, getFilePath } = customizations;

  const fileMapping = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = getFilePath(entityName);

      const blueprintFile = readFileSync(
        join(blueprintRoot, blueprintFilePath),
        'utf8'
      );

      const file = processTemplate(blueprintFile, {
        entity: parseEntityName(entityName),
        options,
      });

      return [filePath, file];
    })
  );

  createFiles(fileMapping, options);
}

function updateClass(customizations, options) {
  const { entityName, getFilePath } = customizations;
  const { __styles__, projectRoot } = options;

  const filePath = getFilePath(entityName);
  const { ext: fileExtension, name: fileName } = parse(filePath);

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  file = importStylesInClass(file, {
    __styles__,
    fileExtension,
    fileName,
  });

  file = addStylesAsClassProperty(file, {
    __styles__,
    fileExtension,
  });

  const fileMapping = new Map([[filePath, file]]);

  createFiles(fileMapping, options);
}

export function importStyles(customizations, options) {
  const { blueprintFilePaths, entities, getFilePath } = customizations;

  for (const [entityName, extensions] of entities) {
    const hasClass = extensions.has('.js') || extensions.has('.ts');
    const hasStylesheet = extensions.has('.css');

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass({ blueprintFilePaths, entityName, getFilePath }, options);

      continue;
    }

    updateClass({ entityName, getFilePath }, options);
  }
}
