import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > simple case (4)', function () {
  const file = [
    `.checkbox {`,
    `  align-items: center;`,
    `  background-color: white;`,
    `  border: 0.125rem solid #ffd54f;`,
    `  cursor: pointer;`,
    `  display: flex;`,
    `  height: 1rem;`,
    `  justify-content: center;`,
    `  position: relative;`,
    `  width: 1rem;`,
    `}`,
    ``,
    `.checkbox:focus {`,
    `  background-color: #ffecb3;`,
    `  outline: 0;`,
    `}`,
    ``,
    `.checkbox:not(:focus) {`,
    `  border-color: transparent;`,
    `}`,
    ``,
    `.checkmark-icon {`,
    `  color: white;`,
    `}`,
    ``,
    `.is-checked {`,
    `  background-color: #1976d2;`,
    `}`,
    ``,
    `.is-disabled {`,
    `  composes: input-disabled from global;`,
    `}`,
    ``,
    `.is-disabled .checkmark-icon {`,
    `  color: #546e7a;`,
    `}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'checkbox',
        [
          {
            classes: ['checkbox'],
            location: {
              end: { column: 1, line: 11, offset: 213 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw:
              '.checkbox {\n' +
              '  align-items: center;\n' +
              '  background-color: white;\n' +
              '  border: 0.125rem solid #ffd54f;\n' +
              '  cursor: pointer;\n' +
              '  display: flex;\n' +
              '  height: 1rem;\n' +
              '  justify-content: center;\n' +
              '  position: relative;\n' +
              '  width: 1rem;\n' +
              '}',
            selector: '.checkbox',
          },
          {
            classes: ['checkbox'],
            location: {
              end: { column: 1, line: 16, offset: 277 },
              start: { column: 1, line: 13, offset: 215 },
            },
            raw: '.checkbox:focus {\n  background-color: #ffecb3;\n  outline: 0;\n}',
            selector: '.checkbox:focus',
          },
          {
            classes: ['checkbox'],
            location: {
              end: { column: 1, line: 20, offset: 333 },
              start: { column: 1, line: 18, offset: 279 },
            },
            raw: '.checkbox:not(:focus) {\n  border-color: transparent;\n}',
            selector: '.checkbox:not(:focus)',
          },
        ],
      ],
      [
        'checkmark-icon',
        [
          {
            classes: ['checkmark-icon'],
            location: {
              end: { column: 1, line: 24, offset: 370 },
              start: { column: 1, line: 22, offset: 335 },
            },
            raw: '.checkmark-icon {\n  color: white;\n}',
            selector: '.checkmark-icon',
          },
        ],
      ],
      [
        'is-checked',
        [
          {
            classes: ['is-checked'],
            location: {
              end: { column: 1, line: 28, offset: 416 },
              start: { column: 1, line: 26, offset: 372 },
            },
            raw: '.is-checked {\n  background-color: #1976d2;\n}',
            selector: '.is-checked',
          },
        ],
      ],
      [
        'is-disabled',
        [
          {
            classes: ['is-disabled'],
            location: {
              end: { column: 1, line: 32, offset: 474 },
              start: { column: 1, line: 30, offset: 418 },
            },
            raw: '.is-disabled {\n  composes: input-disabled from global;\n}',
            selector: '.is-disabled',
          },
          {
            classes: ['is-disabled', 'checkmark-icon'],
            location: {
              end: { column: 1, line: 36, offset: 526 },
              start: { column: 1, line: 34, offset: 476 },
            },
            raw: '.is-disabled .checkmark-icon {\n  color: #546e7a;\n}',
            selector: '.is-disabled .checkmark-icon',
          },
        ],
      ],
    ]),
  );
});
