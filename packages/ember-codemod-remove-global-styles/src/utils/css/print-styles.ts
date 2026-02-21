import { EOL } from 'node:os';

import type { Style } from '../../types/index.js';

export function printStyles(styles: Style[]): string {
  return styles
    .sort((a, b) => a.line - b.line)
    .map(({ code }) => code)
    .join(EOL.repeat(2));
}
