import { EOL } from 'node:os';

import type { Style } from '../../types/index.js';

export function printStyles(styles: Style[]): string {
  return styles
    .sort((a, b) => a.line - b.line)
    .map(({ code, mediaQueries }) => {
      let newCode = code;

      mediaQueries.forEach((mediaQuery) => {
        newCode = [`@media ${mediaQuery} {`, newCode, '}'].join(EOL);
      });

      return newCode;
    })
    .join(EOL.repeat(2));
}
