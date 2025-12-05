import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../../src/utils/css/index.js';

test('utils | css | add-local-classes > simple case (1)', function () {
  const file = normalizeFile([
    `{{#if this.isTestEnvironment}}`,
    `  <div class="placeholder-image"></div>`,
    `{{else}}`,
    `  <img alt="" class="image" src={{@src}} />`,
    `{{/if}}`,
  ]);

  const classToStyles = new Map([
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
  ]);

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: false,
    }),
    normalizeFile([
      `{{#if this.isTestEnvironment}}`,
      `  <div class={{styles.placeholder-image}}></div>`,
      `{{else}}`,
      `  <img alt="" class={{styles.image}} src={{@src}} />`,
      `{{/if}}`,
    ]),
  );

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: true,
    }),
    normalizeFile([
      `{{#if this.isTestEnvironment}}`,
      `  <div class={{this.styles.placeholder-image}}></div>`,
      `{{else}}`,
      `  <img alt="" class={{this.styles.image}} src={{@src}} />`,
      `{{/if}}`,
    ]),
  );
});
