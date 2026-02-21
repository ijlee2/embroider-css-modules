import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-name-to-styles > simple case (2)', function () {
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

  const classNameToStyles = getClassNameToStyles(file);

  assert.deepStrictEqual(Array.from(classNameToStyles.keys()), [
    'list',
    'link',
  ]);

  const styles = classNameToStyles.get('link');

  assert.deepStrictEqual(styles, [
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
  ]);
});
