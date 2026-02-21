import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix(
  'utils | css | get-class-name-to-styles > simple case (3)',
  function () {
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
      getClassNameToStyles(file),
      new Map([
        [
          'input',
          [
            {
              classNames: ['input'],
              code: normalizeFile([
                `.input {`,
                `  border: 0.125rem solid #ffd54f;`,
                `  padding: 0.125rem 0.25rem;`,
                `  width: calc(100% - 0.75rem);`,
                `}`,
              ]),
              line: 1,
              selector: '.input',
            },
            {
              classNames: ['input'],
              code: normalizeFile([
                `.input:focus {`,
                `  background-color: #ffecb3;`,
                `  outline: 0;`,
                `}`,
              ]),
              line: 7,
              selector: '.input:focus',
            },
            {
              classNames: ['input'],
              code: normalizeFile([
                `.input:not(:focus) {`,
                `  border-color: transparent;`,
                `}`,
              ]),
              line: 12,
              selector: '.input:not(:focus)',
            },
            {
              classNames: ['input'],
              code: normalizeFile([
                `.input::placeholder {`,
                `  font-style: italic;`,
                `}`,
              ]),
              line: 16,
              selector: '.input::placeholder',
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
              line: 20,
              selector: '.is-disabled',
            },
          ],
        ],
      ]),
    );
  },
);
