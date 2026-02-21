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
            classNames: ['checkbox'],
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
            line: 1,
            selector: '.checkbox',
          },
          {
            classNames: ['checkbox'],
            code: normalizeFile([
              `.checkbox:focus {`,
              `  background-color: #ffecb3;`,
              `  outline: 0;`,
              `}`,
            ]),
            line: 13,
            selector: '.checkbox:focus',
          },
          {
            classNames: ['checkbox'],
            code: normalizeFile([
              `.checkbox:not(:focus) {`,
              `  border-color: transparent;`,
              `}`,
            ]),
            line: 18,
            selector: '.checkbox:not(:focus)',
          },
        ],
      ],
      [
        'checkmark-icon',
        [
          {
            classNames: ['checkmark-icon'],
            code: normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
            line: 22,
            selector: '.checkmark-icon',
          },
        ],
      ],
      [
        'is-checked',
        [
          {
            classNames: ['is-checked'],
            code: normalizeFile([
              `.is-checked {`,
              `  background-color: #1976d2;`,
              `}`,
            ]),
            line: 26,
            selector: '.is-checked',
          },
        ],
      ],
      [
        'is-disabled',
        [
          {
            classNames: ['is-disabled'],
            code: normalizeFile([
              `.is-disabled {`,
              `  composes: input-disabled from global;`,
              `}`,
            ]),
            line: 30,
            selector: '.is-disabled',
          },
          {
            classNames: ['is-disabled', 'checkmark-icon'],
            code: normalizeFile([
              `.is-disabled .checkmark-icon {`,
              `  color: #546e7a;`,
              `}`,
            ]),
            line: 34,
            selector: '.is-disabled .checkmark-icon',
          },
        ],
      ],
    ]),
  );
});
