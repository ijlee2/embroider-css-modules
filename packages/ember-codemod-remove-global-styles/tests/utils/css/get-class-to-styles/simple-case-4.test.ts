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
            location: {
              end: { column: 1, line: 11, offset: 213 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw: normalizeFile([
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
            selector: '.checkbox',
          },
          {
            classes: ['checkbox'],
            location: {
              end: { column: 1, line: 16, offset: 277 },
              start: { column: 1, line: 13, offset: 215 },
            },
            raw: normalizeFile([
              `.checkbox:focus {`,
              `  background-color: #ffecb3;`,
              `  outline: 0;`,
              `}`,
            ]),
            selector: '.checkbox:focus',
          },
          {
            classes: ['checkbox'],
            location: {
              end: { column: 1, line: 20, offset: 333 },
              start: { column: 1, line: 18, offset: 279 },
            },
            raw: normalizeFile([
              `.checkbox:not(:focus) {`,
              `  border-color: transparent;`,
              `}`,
            ]),
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
            raw: normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
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
            raw: normalizeFile([
              `.is-checked {`,
              `  background-color: #1976d2;`,
              `}`,
            ]),
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
            raw: normalizeFile([
              `.is-disabled {`,
              `  composes: input-disabled from global;`,
              `}`,
            ]),
            selector: '.is-disabled',
          },
          {
            classes: ['is-disabled', 'checkmark-icon'],
            location: {
              end: { column: 1, line: 36, offset: 526 },
              start: { column: 1, line: 34, offset: 476 },
            },
            raw: normalizeFile([
              `.is-disabled .checkmark-icon {`,
              `  color: #546e7a;`,
              `}`,
            ]),
            selector: '.is-disabled .checkmark-icon',
          },
        ],
      ],
    ]),
  );
});
