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
            location: {
              end: { column: 1, line: 6, offset: 94 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw: normalizeFile([
              `.image {`,
              `  aspect-ratio: 4 / 3;`,
              `  border-radius: 0.75rem;`,
              `  width: 100%;`,
              `}`,
            ]),
            selector: '.image',
          },
          {
            classes: ['image'],
            location: {
              end: { column: 1, line: 10, offset: 127 },
              start: { column: 1, line: 8, offset: 96 },
            },
            raw: normalizeFile([`.image {`, `  object-fit: cover;`, `}`]),
            selector: '.image',
          },
        ],
      ],
      [
        'placeholder-image',
        [
          {
            classes: ['placeholder-image'],
            location: {
              end: { column: 1, line: 6, offset: 94 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw: normalizeFile([
              `.placeholder-image {`,
              `  aspect-ratio: 4 / 3;`,
              `  border-radius: 0.75rem;`,
              `  width: 100%;`,
              `}`,
            ]),
            selector: '.placeholder-image',
          },
          {
            classes: ['placeholder-image'],
            location: {
              end: { column: 1, line: 19, offset: 280 },
              start: { column: 1, line: 12, offset: 129 },
            },
            raw: normalizeFile([
              `.placeholder-image {`,
              `  background: linear-gradient(`,
              `    36deg,`,
              `    rgb(255 224 130 / 40%) 15%,`,
              `    rgb(255 248 225 / 80%) 90%`,
              `  );`,
              `  min-width: 8rem;`,
              `}`,
            ]),
            selector: '.placeholder-image',
          },
        ],
      ],
    ]),
  );
});
