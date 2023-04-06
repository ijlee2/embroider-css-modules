import { readFileSync } from 'node:fs';
import { join, parse } from 'node:path';

import { ASTJavaScript as AST } from '../../../utils/abstract-syntax-tree.js';
import { blueprintRoot, processTemplate } from '../../../utils/blueprints.js';
import { createFiles } from '../../../utils/files.js';
import { parseEntityName } from '../../../utils/string.js';

function getFilePath(entityName, options) {
  const { componentStructure, project } = options;

  let filePath = join('app/components', entityName);

  if (componentStructure === 'nested') {
    filePath += '/index';
  }

  if (project.hasTypeScript) {
    filePath += '.ts';
  } else {
    filePath += '.js';
  }

  return filePath;
}

function createClass(entityName, options) {
  const { project } = options;

  const blueprintFilePaths = project.hasTypeScript
    ? ['ember-cli/component/typescript.ts']
    : ['ember-cli/component/javascript.js'];

  const fileMapping = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = getFilePath(entityName, options);

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

function importStylesInClass(file, data) {
  // Find the last import statement
  const traverse = AST.traverse(data.hasTypeScript);

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
    AST.builder.importDeclaration(
      [
        AST.builder.importDefaultSpecifier(
          AST.builder.identifier(data.__styles__)
        ),
      ],
      AST.builder.literal(`./${data.fileName}.css`)
    )
  );

  return AST.convertToFile(ast);
}

function addStylesAsClassProperty(file, data) {
  const traverse = AST.traverse(data.hasTypeScript);

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      const { body } = path.node.body;

      body.unshift(
        AST.builder.classProperty(
          AST.builder.identifier(data.__styles__),
          AST.builder.identifier(data.__styles__)
        )
      );

      return false;
    },
  });

  const newFile = AST.convertToFile(ast);

  return newFile.replace(
    new RegExp(`(${data.__styles__} = ${data.__styles__};)`),
    '$1\n'
  );
}

function updateClass(entityName, extensions, options) {
  const { __styles__, projectRoot } = options;

  const filePath = getFilePath(entityName, options);

  const { name: fileName } = parse(filePath);
  const hasTypeScript = extensions.has('.ts');

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

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
}

function updateComponentClasses(context, options) {
  for (const [entityName, extensions] of context.components) {
    const hasClass = extensions.has('.js') || extensions.has('.ts');
    const hasStylesheet = extensions.has('.css');

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass(entityName, options);

      continue;
    }

    updateClass(entityName, extensions, options);
  }
}

export function importStylesInComponents(context, options) {
  updateComponentClasses(context, options);
}
