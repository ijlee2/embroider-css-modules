import { EOL } from 'node:os';

import type { Style } from '../../types/index.js';

export function printStyles(styles: Style[]): string {
  return styles
    .sort((a, b) => {
      if (a.location.start.offset > b.location.start.offset) {
        return 1;
      }

      if (a.location.start.offset < b.location.start.offset) {
        return -1;
      }

      return 0;
    })
    .map(({ code }) => code)
    .join(EOL.repeat(2));
}
