import { normalizeFile } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';

const stylesheet = normalizeFile([
  `.image,`,
  `.placeholder-image {`,
  `  aspect-ratio: 4 / 3;`,
  `  border-radius: 0.75rem;`,
  `  width: 100%;`,
  `}`,
  ``,
  `.image {`,
  `  object-fit: cover;`,
  `}`,
  ``,
  `.placeholder-image {`,
  `  background: linear-gradient(`,
  `    36deg,`,
  `    rgb(255 224 130 / 40%) 15%,`,
  `    rgb(255 248 225 / 80%) 90%`,
  `  );`,
  `  min-width: 8rem;`,
  `}`,
  ``,
]);

export const classNameToStyles = getClassNameToStyles(stylesheet);

export const templateFile = normalizeFile([
  `{{#if this.isTestEnvironment}}`,
  `  <div class="placeholder-image"></div>`,
  `{{else}}`,
  `  <img alt="" class="image" src={{@src}} />`,
  `{{/if}}`,
]);
