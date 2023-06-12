import { readPackageJson } from '@codemod-utils/json';

function analyzePackageJson(codemodOptions) {
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
  };
}

export function createOptions(codemodOptions) {
  const project = analyzePackageJson(codemodOptions);

  const options = {
    __styles__: 'styles',
    componentStructure: codemodOptions.componentStructure,
    project,
    projectRoot: codemodOptions.projectRoot,
  };

  return options;
}
