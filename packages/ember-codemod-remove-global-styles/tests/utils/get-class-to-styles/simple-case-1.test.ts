import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > simple case (1)', function () {
  const file = [
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
  ].join('\n');

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
            raw: '.image {\n  aspect-ratio: 4 / 3;\n  border-radius: 0.75rem;\n  width: 100%;\n}',
            selector: '.image',
          },
          {
            classes: ['image'],
            location: {
              end: { column: 1, line: 10, offset: 127 },
              start: { column: 1, line: 8, offset: 96 },
            },
            raw: '.image {\n  object-fit: cover;\n}',
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
            raw:
              '.placeholder-image {\n' +
              '  aspect-ratio: 4 / 3;\n' +
              '  border-radius: 0.75rem;\n' +
              '  width: 100%;\n' +
              '}',
            selector: '.placeholder-image',
          },
          {
            classes: ['placeholder-image'],
            location: {
              end: { column: 1, line: 19, offset: 280 },
              start: { column: 1, line: 12, offset: 129 },
            },
            raw:
              '.placeholder-image {\n' +
              '  background: linear-gradient(\n' +
              '    36deg,\n' +
              '    rgb(255 224 130 / 40%) 15%,\n' +
              '    rgb(255 248 225 / 80%) 90%\n' +
              '  );\n' +
              '  min-width: 8rem;\n' +
              '}',
            selector: '.placeholder-image',
          },
        ],
      ],
    ]),
  );
});
