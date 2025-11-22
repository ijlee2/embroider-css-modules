import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > simple case (3)', function () {
  const file = [
    `.input {`,
    `  border: 0.125rem solid #ffd54f;`,
    `  padding: 0.125rem 0.25rem;`,
    `  width: calc(100% - 0.75rem);`,
    `}`,
    ``,
    `.input:focus {`,
    `  background-color: #ffecb3;`,
    `  outline: 0;`,
    `}`,
    ``,
    `.input:not(:focus) {`,
    `  border-color: transparent;`,
    `}`,
    ``,
    `.input::placeholder {`,
    `  font-style: italic;`,
    `}`,
    ``,
    `.is-disabled {`,
    `  composes: input-disabled from global;`,
    `}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'input',
        [
          {
            classes: ['input'],
            location: {
              end: { column: 1, line: 5, offset: 104 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw:
              '.input {\n' +
              '  border: 0.125rem solid #ffd54f;\n' +
              '  padding: 0.125rem 0.25rem;\n' +
              '  width: calc(100% - 0.75rem);\n' +
              '}',
            selector: '.input',
          },
          {
            classes: ['input'],
            location: {
              end: { column: 1, line: 10, offset: 165 },
              start: { column: 1, line: 7, offset: 106 },
            },
            raw: '.input:focus {\n  background-color: #ffecb3;\n  outline: 0;\n}',
            selector: '.input:focus',
          },
          {
            classes: ['input'],
            location: {
              end: { column: 1, line: 14, offset: 218 },
              start: { column: 1, line: 12, offset: 167 },
            },
            raw: '.input:not(:focus) {\n  border-color: transparent;\n}',
            selector: '.input:not(:focus)',
          },
          {
            classes: ['input'],
            location: {
              end: { column: 1, line: 18, offset: 265 },
              start: { column: 1, line: 16, offset: 220 },
            },
            raw: '.input::placeholder {\n  font-style: italic;\n}',
            selector: '.input::placeholder',
          },
        ],
      ],
      [
        'is-disabled',
        [
          {
            classes: ['is-disabled'],
            location: {
              end: { column: 1, line: 22, offset: 323 },
              start: { column: 1, line: 20, offset: 267 },
            },
            raw: '.is-disabled {\n  composes: input-disabled from global;\n}',
            selector: '.is-disabled',
          },
        ],
      ],
    ]),
  );
});
