import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../types/index.js';
import { getClassToStyles } from '../utils/css/index.js';
import { analyzeComponents, analyzeRoutes } from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const { projectRoot, src } = options;

  const stylesheet = readFileSync(join(projectRoot, src), 'utf8');
  const classToStyles = getClassToStyles(stylesheet);

  const components = analyzeComponents(classToStyles, options);
  const routes = analyzeRoutes(classToStyles, options);

  return {
    components,
    routes,
  };
}
