import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix('utils | css | get-class-to-styles > simple case (2)', function () {
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
    getClassToStyles(file),
    new Map([
      [
        'list',
        [
          {
            classes: ['list'],
            location: {
              end: { column: 1, line: 4, offset: 49 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw: normalizeFile([
              `.list {`,
              `  align-items: center;`,
              `  display: flex;`,
              `}`,
            ]),
            selector: '.list',
          },
        ],
      ],
      [
        'link',
        [
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 12, offset: 182 },
              start: { column: 1, line: 6, offset: 51 },
            },
            raw: normalizeFile([
              `.link {`,
              `  display: inline-block;`,
              `  font-size: 0.875rem;`,
              `  padding: 0.875rem 1rem;`,
              `  text-decoration: none;`,
              `  white-space: nowrap;`,
              `}`,
            ]),
            selector: '.link',
          },
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 16, offset: 238 },
              start: { column: 1, line: 14, offset: 184 },
            },
            raw: normalizeFile([
              `.link:global(\\.active) {`,
              `  background-color: #15202d;`,
              `}`,
            ]),
            selector: '.link:global(\\.active)',
          },
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 21, offset: 322 },
              start: { column: 1, line: 18, offset: 240 },
            },
            raw: normalizeFile([
              `.link:hover {`,
              `  background-color: #26313d;`,
              `  transition: background-color 0.17s;`,
              `}`,
            ]),
            selector: '.link:hover',
          },
        ],
      ],
    ]),
  );
});
