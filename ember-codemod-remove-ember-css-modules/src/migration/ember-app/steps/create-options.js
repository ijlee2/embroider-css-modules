import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function analyzePackageJson(codemodOptions) {
  const { projectRoot } = codemodOptions;

  try {
    const packageJsonFile = readFileSync(
      join(projectRoot, 'package.json'),
      'utf8'
    );

    const { dependencies, devDependencies } = JSON.parse(packageJsonFile);

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
  } catch (e) {
    throw new SyntaxError(
      `ERROR: package.json is missing or is not valid. (${e.message})\n`
    );
  }
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
