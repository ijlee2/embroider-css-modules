import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix('utils | css | get-class-to-styles > simple case (3)', function () {
  const file = normalizeFile([
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
  ]);

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'input',
        [
          {
            classes: ['input'],
            code: normalizeFile([
              `.input {`,
              `  border: 0.125rem solid #ffd54f;`,
              `  padding: 0.125rem 0.25rem;`,
              `  width: calc(100% - 0.75rem);`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 5, offset: 104 },
              start: { column: 1, line: 1, offset: 0 },
            },
            selector: '.input',
          },
          {
            classes: ['input'],
            code: normalizeFile([
              `.input:focus {`,
              `  background-color: #ffecb3;`,
              `  outline: 0;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 10, offset: 165 },
              start: { column: 1, line: 7, offset: 106 },
            },
            selector: '.input:focus',
          },
          {
            classes: ['input'],
            code: normalizeFile([
              `.input:not(:focus) {`,
              `  border-color: transparent;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 14, offset: 218 },
              start: { column: 1, line: 12, offset: 167 },
            },
            selector: '.input:not(:focus)',
          },
          {
            classes: ['input'],
            code: normalizeFile([
              `.input::placeholder {`,
              `  font-style: italic;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 18, offset: 265 },
              start: { column: 1, line: 16, offset: 220 },
            },
            selector: '.input::placeholder',
          },
        ],
      ],
      [
        'is-disabled',
        [
          {
            classes: ['is-disabled'],
            code: normalizeFile([
              `.is-disabled {`,
              `  composes: input-disabled from global;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 22, offset: 323 },
              start: { column: 1, line: 20, offset: 267 },
            },
            selector: '.is-disabled',
          },
        ],
      ],
    ]),
  );
});
