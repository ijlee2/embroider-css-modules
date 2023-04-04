import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function validatePackageJson({ name, version }) {
  if (!name) {
    throw new SyntaxError('Package name is missing.');
  }

  if (name.includes('/')) {
    // eslint-disable-next-line no-unused-vars
    const [_scope, packageName] = name.split('/');

    if (!packageName) {
      throw new SyntaxError('Package name is missing.');
    }
  }

  if (!version) {
    throw new SyntaxError('Package version is missing.');
  }
}

function analyzePackageJson(codemodOptions) {
  const { projectRoot } = codemodOptions;

  try {
    const packageJsonFile = readFileSync(
      join(projectRoot, 'package.json'),
      'utf8'
    );

    const { dependencies, devDependencies, name, version } =
      JSON.parse(packageJsonFile);

    validatePackageJson({ name, version });

    const projectDependencies = new Map([
      ...Object.entries(dependencies ?? {}),
      ...Object.entries(devDependencies ?? {}),
    ]);

    return {
      dependencies: projectDependencies,
      hasEmberCssModules: projectDependencies.has('ember-css-modules'),
      hasGlint: projectDependencies.has('@glint/core'),
      hasTypeScript: projectDependencies.has('typescript'),
      name,
      version,
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
