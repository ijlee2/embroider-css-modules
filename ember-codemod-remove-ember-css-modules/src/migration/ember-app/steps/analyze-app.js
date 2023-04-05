import { join, parse } from 'node:path';

import { findFiles, renameDirectory } from '../../../utils/files.js';

function findAndRenameFiles(findOptions, replaceOptions) {
  const { globPattern, ignoreList, projectRoot } = findOptions;
  const { from, to } = replaceOptions;

  const filePaths = findFiles(globPattern, {
    cwd: projectRoot,
    ignoreList,
  });

  return filePaths.map((filePath) => {
    return renameDirectory(filePath, { from, to });
  });
}

function analyzeEntities({
  classFilePaths,
  stylesheetFilePaths,
  templateFilePaths,
}) {
  const filePaths = [
    ...classFilePaths,
    ...stylesheetFilePaths,
    ...templateFilePaths,
  ].sort();

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

  const classFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/components/**/*.{js,ts}',
      ignoreList: ['app/components/**/*.d.ts'],
      projectRoot,
    },
    {
      from: 'app/components',
      to: '',
    }
  );

  const stylesheetFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/components/**/*.css',
      projectRoot,
    },
    {
      from: 'app/components',
      to: '',
    }
  );

  const templateFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/components/**/*.hbs',
      projectRoot,
    },
    {
      from: 'app/components',
      to: '',
    }
  );

  if (componentStructure === 'nested') {
    const entities = analyzeEntities({
      classFilePaths,
      stylesheetFilePaths,
      templateFilePaths,
    });

    return new Map(
      [...entities.entries()].map(([entityName, extensions]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, extensions];
      })
    );
  }

  return analyzeEntities({
    classFilePaths,
    stylesheetFilePaths,
    templateFilePaths,
  });
}

function analyzeRoutes(options) {
  const { projectRoot } = options;

  const classFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/controllers/**/*.{js,ts}',
      ignoreList: ['app/controllers/**/*.d.ts'],
      projectRoot,
    },
    {
      from: 'app/controllers',
      to: '',
    }
  );

  const stylesheetFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/styles/**/*.css',
      ignoreList: ['app/styles/app.css'],
      projectRoot,
    },
    {
      from: 'app/styles',
      to: '',
    }
  );

  const templateFilePaths = findAndRenameFiles(
    {
      globPattern: 'app/templates/**/*.hbs',
      ignoreList: ['app/templates/components/**/*'],
      projectRoot,
    },
    {
      from: 'app/templates',
      to: '',
    }
  );

  return analyzeEntities({
    classFilePaths,
    stylesheetFilePaths,
    templateFilePaths,
  });
}

export function analyzeApp(options) {
  return {
    components: analyzeComponents(options),
    routes: analyzeRoutes(options),
  };
}
