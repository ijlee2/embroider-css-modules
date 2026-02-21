import { normalizeFile } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';

const stylesheet = normalizeFile([
  `.list {`,
  `  align-items: center;`,
  `  display: flex;`,
  `}`,
  ``,
  `.link {`,
  `  display: inline-block;`,
  `  font-size: 0.875rem;`,
  `  padding: 0.875rem 1rem;`,
  `  text-decoration: none;`,
  `  white-space: nowrap;`,
  `}`,
  ``,
  `.link:global(.active) {`,
  `  background-color: #15202d;`,
  `}`,
  ``,
  `.link:hover {`,
  `  background-color: #26313d;`,
  `  transition: background-color 0.17s;`,
  `}`,
  ``,
]);

export const classNameToStyles = getClassNameToStyles(stylesheet);
