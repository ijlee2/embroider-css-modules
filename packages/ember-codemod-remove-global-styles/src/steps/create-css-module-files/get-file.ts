import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../../types/index.js';

export function getFile(filePath: string, options: Options): string {
  const { projectRoot } = options;

  try {
    return readFileSync(join(projectRoot, filePath), 'utf8');
  } catch {
    return '';
  }
}
