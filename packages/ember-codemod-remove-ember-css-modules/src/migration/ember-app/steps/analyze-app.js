import { join, parse } from 'node:path';

import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

function analyzeFilePaths(filePaths) {
  const entities = new Map();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parse(filePath);
    const entityName = join(dir, name);

    if (entities.has(entityName)) {
      entities.get(entityName).add(ext);

      return;
    }

    entities.set(entityName, new Set([ext]));
  });

  return entities;
}

function analyzeComponents(options) {
  const { componentStructure, projectRoot } = options;

  const classFilePaths = findFiles('app/components/**/*.{js,ts}', {
    ignoreList: ['app/components/**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const stylesheetFilePaths = findFiles('app/components/**/*.css', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const templateFilePaths = findFiles('app/components/**/*.hbs', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const filePaths = [
    ...classFilePaths,
    ...stylesheetFilePaths,
    ...templateFilePaths,
  ].sort();

  const entities = analyzeFilePaths(filePaths);

  if (componentStructure === 'nested') {
    return new Map(
      [...entities.entries()].map(([entityName, extensions]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, extensions];
      }),
    );
  }

  return entities;
}

function analyzeRoutes(options) {
  const { projectRoot } = options;

  const classFilePaths = findFiles('app/controllers/**/*.{js,ts}', {
    ignoreList: ['app/controllers/**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/controllers',
      to: '',
    });
  });

  const stylesheetFilePaths = findFiles('app/styles/**/*.css', {
    ignoreList: ['app/styles/app.css'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/styles',
      to: '',
    });
  });

  const templateFilePaths = findFiles('app/templates/**/*.hbs', {
    ignoreList: ['app/templates/components/**/*'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/templates',
      to: '',
    });
  });

  const filePaths = [
    ...classFilePaths,
    ...stylesheetFilePaths,
    ...templateFilePaths,
  ].sort();

  return analyzeFilePaths(filePaths);
}

export function analyzeApp(options) {
  return {
    components: analyzeComponents(options),
    routes: analyzeRoutes(options),
  };
}
