import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../types/index.js';
import { getClassNameToStyles } from '../utils/css/index.js';
import { analyzeComponents, analyzeRoutes } from './analyze-project/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function analyzeProject(options: Options): Promise<Project> {
  const { projectRoot, src } = options;

  const stylesheet = readFileSync(join(projectRoot, src), 'utf8');
  const classNameToStyles = getClassNameToStyles(stylesheet);

  const components = analyzeComponents(classNameToStyles, options);
  const routes = analyzeRoutes(classNameToStyles, options);

  return {
    components,
    routes,
  };
}
