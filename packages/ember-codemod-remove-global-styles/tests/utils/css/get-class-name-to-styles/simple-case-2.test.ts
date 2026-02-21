import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix(
  'utils | css | get-class-name-to-styles > simple case (2)',
  function () {
    const file = normalizeFile([
      `.list {`,
      `  align-items: center;`,
      `  display: flex;`,
      `}`,
      ``,
      `.link {`,
      `  display: inline-block;`,
      `  font-size: 0.875rem;`,
      `  padding: 0.875rem 1rem;`,
      `  text-decoration: none;`,
      `  white-space: nowrap;`,
      `}`,
      ``,
      `.link:global(.active) {`,
      `  background-color: #15202d;`,
      `}`,
      ``,
      `.link:hover {`,
      `  background-color: #26313d;`,
      `  transition: background-color 0.17s;`,
      `}`,
      ``,
    ]);

    assert.deepStrictEqual(
      getClassNameToStyles(file),
      new Map([
        [
          'list',
          [
            {
              classNames: ['list'],
              code: normalizeFile([
                `.list {`,
                `  align-items: center;`,
                `  display: flex;`,
                `}`,
              ]),
              line: 1,
              selector: '.list',
            },
          ],
        ],
        [
          'link',
          [
            {
              classNames: ['link'],
              code: normalizeFile([
                `.link {`,
                `  display: inline-block;`,
                `  font-size: 0.875rem;`,
                `  padding: 0.875rem 1rem;`,
                `  text-decoration: none;`,
                `  white-space: nowrap;`,
                `}`,
              ]),
              line: 6,
              selector: '.link',
            },
            {
              classNames: ['link'],
              code: normalizeFile([
                `.link:global(\\.active) {`,
                `  background-color: #15202d;`,
                `}`,
              ]),
              line: 14,
              selector: '.link:global(\\.active)',
            },
            {
              classNames: ['link'],
              code: normalizeFile([
                `.link:hover {`,
                `  background-color: #26313d;`,
                `  transition: background-color 0.17s;`,
                `}`,
              ]),
              line: 18,
              selector: '.link:hover',
            },
          ],
        ],
      ]),
    );
  },
);
