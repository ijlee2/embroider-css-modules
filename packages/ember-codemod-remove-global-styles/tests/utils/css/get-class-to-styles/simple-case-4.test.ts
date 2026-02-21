import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix('utils | css | get-class-to-styles > simple case (4)', function () {
  const file = normalizeFile([
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
  ]);

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'checkbox',
        [
          {
            classes: ['checkbox'],
            code: normalizeFile([
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
            ]),
            location: {
              end: { column: 1, line: 11, offset: 213 },
              start: { column: 1, line: 1, offset: 0 },
            },
            selector: '.checkbox',
          },
          {
            classes: ['checkbox'],
            code: normalizeFile([
              `.checkbox:focus {`,
              `  background-color: #ffecb3;`,
              `  outline: 0;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 16, offset: 277 },
              start: { column: 1, line: 13, offset: 215 },
            },
            selector: '.checkbox:focus',
          },
          {
            classes: ['checkbox'],
            code: normalizeFile([
              `.checkbox:not(:focus) {`,
              `  border-color: transparent;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 20, offset: 333 },
              start: { column: 1, line: 18, offset: 279 },
            },
            selector: '.checkbox:not(:focus)',
          },
        ],
      ],
      [
        'checkmark-icon',
        [
          {
            classes: ['checkmark-icon'],
            code: normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
            location: {
              end: { column: 1, line: 24, offset: 370 },
              start: { column: 1, line: 22, offset: 335 },
            },
            selector: '.checkmark-icon',
          },
        ],
      ],
      [
        'is-checked',
        [
          {
            classes: ['is-checked'],
            code: normalizeFile([
              `.is-checked {`,
              `  background-color: #1976d2;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 28, offset: 416 },
              start: { column: 1, line: 26, offset: 372 },
            },
            selector: '.is-checked',
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
              end: { column: 1, line: 32, offset: 474 },
              start: { column: 1, line: 30, offset: 418 },
            },
            selector: '.is-disabled',
          },
          {
            classes: ['is-disabled', 'checkmark-icon'],
            code: normalizeFile([
              `.is-disabled .checkmark-icon {`,
              `  color: #546e7a;`,
              `}`,
            ]),
            location: {
              end: { column: 1, line: 36, offset: 526 },
              start: { column: 1, line: 34, offset: 476 },
            },
            selector: '.is-disabled .checkmark-icon',
          },
        ],
      ],
    ]),
  );
});
