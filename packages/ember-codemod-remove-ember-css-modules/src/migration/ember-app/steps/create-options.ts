import { readPackageJson } from '@codemod-utils/json';

import type { CodemodOptions, Options } from '../../../types/index.js';

type Project = Options['project'];

function analyzePackageJson(codemodOptions: CodemodOptions): Project {
  const { dependencies, devDependencies } = readPackageJson(codemodOptions);

  const projectDependencies = new Map([
    ...Object.entries(dependencies ?? {}),
    ...Object.entries(devDependencies ?? {}),
  ]);

  return {
    dependencies: projectDependencies,
    hasEmberCssModules: projectDependencies.has('ember-css-modules'),
    hasGlint: projectDependencies.has('@glint/core'),
    hasTypeScript: projectDependencies.has('typescript'),
  } as unknown as Project;
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const project = analyzePackageJson(codemodOptions);

  const options = {
    __styles__: 'styles',
    componentStructure: codemodOptions.componentStructure,
    project,
    projectRoot: codemodOptions.projectRoot,
  };

  return options;
}
