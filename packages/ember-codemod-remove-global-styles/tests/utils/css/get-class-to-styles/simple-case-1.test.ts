import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix('utils | css | get-class-to-styles > simple case (1)', function () {
  const file = normalizeFile([
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

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'image',
        [
          {
            classes: ['image'],
            code: normalizeFile([
              `.image {`,
              `  aspect-ratio: 4 / 3;`,
              `  border-radius: 0.75rem;`,
              `  width: 100%;`,
              `}`,
            ]),
            line: 1,
            selector: '.image',
          },
          {
            classes: ['image'],
            code: normalizeFile([`.image {`, `  object-fit: cover;`, `}`]),
            line: 8,
            selector: '.image',
          },
        ],
      ],
      [
        'placeholder-image',
        [
          {
            classes: ['placeholder-image'],
            code: normalizeFile([
              `.placeholder-image {`,
              `  aspect-ratio: 4 / 3;`,
              `  border-radius: 0.75rem;`,
              `  width: 100%;`,
              `}`,
            ]),
            line: 1,
            selector: '.placeholder-image',
          },
          {
            classes: ['placeholder-image'],
            code: normalizeFile([
              `.placeholder-image {`,
              `  background: linear-gradient(`,
              `    36deg,`,
              `    rgb(255 224 130 / 40%) 15%,`,
              `    rgb(255 248 225 / 80%) 90%`,
              `  );`,
              `  min-width: 8rem;`,
              `}`,
            ]),
            line: 12,
            selector: '.placeholder-image',
          },
        ],
      ],
    ]),
  );
});
