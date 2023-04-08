import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ASTHandlebars as AST } from '../../../../utils/abstract-syntax-tree.js';
import { createFiles } from '../../../../utils/files.js';

function sanitizeClassAndLocalClassAttributes(file) {
  function removeAttributeWithoutValue(attributeName, attributes) {
    const attributeIndex = attributes.findIndex(
      (attribute) => attribute.name === attributeName
    );

    if (attributeIndex === -1) {
      return;
    }

    const attribute = attributes[attributeIndex];

    if (attribute.value.type !== 'TextNode') {
      return;
    }

    if (attribute.isValueless) {
      attributes.splice(attributeIndex, 1);
      return;
    }

    const attributeValue = attribute.value.chars.trim();

    if (attributeValue === '') {
      attributes.splice(attributeIndex, 1);
      return;
    }
  }

  const ast = AST.traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      removeAttributeWithoutValue('class', attributes);
      removeAttributeWithoutValue('local-class', attributes);
    },
  });

  return AST.print(ast);
}

function updateTemplate(customizations, options) {
  const { entityName, getFilePath } = customizations;
  const { projectRoot } = options;

  const filePath = getFilePath(entityName);

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    file = sanitizeClassAndLocalClassAttributes(file);

    const fileMapping = new Map([[filePath, file]]);

    createFiles(fileMapping, options);
  } catch (e) {
    console.warn(
      `WARNING: updateTemplate could not update \`${filePath}\`. Please manually update the file. (${e.message})\n`
    );
  }
}

export function updateTemplates(customizations, options) {
  const { entities, getFilePath } = customizations;

  for (const [entityName, extensions] of entities) {
    const hasTemplate = extensions.has('.hbs');

    if (!hasTemplate) {
      continue;
    }

    updateTemplate({ entityName, getFilePath }, options);
  }
}
