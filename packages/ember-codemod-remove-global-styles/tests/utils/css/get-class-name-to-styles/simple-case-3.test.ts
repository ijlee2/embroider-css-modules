import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { classNameToStyles } from '../../../helpers/utils/css/simple-case-3.js';

test('utils | css | get-class-name-to-styles > simple case (3)', function () {
  assert.deepStrictEqual(Array.from(classNameToStyles.keys()), [
    'input',
    'is-disabled',
  ]);

  const styles = classNameToStyles.get('input');

  assert.deepStrictEqual(styles, [
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
  ]);
});
