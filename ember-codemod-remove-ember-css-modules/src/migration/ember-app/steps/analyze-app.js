import { join, parse } from 'node:path';

import { findFiles, renameDirectory } from '../../../utils/files.js';

function analyzeExtension(
  extension,
  currentAnalysis = {
    hasClass: false,
    hasStylesheet: false,
    hasTemplate: false,
  }
) {
  switch (extension) {
    case '.js':
    case '.ts': {
      return {
        ...currentAnalysis,
        hasClass: true,
      };
    }

    case '.css': {
      return {
        ...currentAnalysis,
        hasStylesheet: true,
      };
    }

    case '.hbs': {
      return {
        ...currentAnalysis,
        hasTemplate: true,
      };
    }

    default: {
      return currentAnalysis;
    }
  }
}

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
    const analysis = analyzeExtension(ext, entities.get(entityName));

    entities.set(entityName, analysis);
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
      [...entities.entries()].map(([entityName, analysis]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, analysis];
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
