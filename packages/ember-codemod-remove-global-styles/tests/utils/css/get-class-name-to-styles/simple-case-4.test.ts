import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { classNameToStyles } from '../../../helpers/utils/css/simple-case-4.js';

test('utils | css | get-class-name-to-styles > simple case (4)', function () {
  assert.deepStrictEqual(Array.from(classNameToStyles.keys()), [
    'checkbox',
    'checkmark-icon',
    'is-checked',
    'is-disabled',
  ]);

  const styles = classNameToStyles.get('checkbox');

  assert.deepStrictEqual(styles, [
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
  ]);
});
