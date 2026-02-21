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

  const classNameToStyles = new Map([
    [
      'image',
      [
        {
          classNames: ['image'],
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
          classNames: ['image'],
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
          classNames: ['placeholder-image'],
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
          classNames: ['placeholder-image'],
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
  ]);

  assert.strictEqual(
    addLocalClasses(file, {
      classNameToStyles,
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
      classNameToStyles,
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
