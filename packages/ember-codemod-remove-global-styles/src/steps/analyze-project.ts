import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../types/index.js';
import { getClassToStyles } from '../utils/css/index.js';

export function analyzeProject(options: Options): Project {
  const { projectRoot, src } = options;

  const stylesheet = readFileSync(join(projectRoot, src), 'utf8');
  const classToStyles = getClassToStyles(stylesheet);

  return {
    classToStyles,
  };
}
