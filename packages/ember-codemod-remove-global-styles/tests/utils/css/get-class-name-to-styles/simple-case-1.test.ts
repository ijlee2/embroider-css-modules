import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { classNameToStyles } from '../../../helpers/utils/css/simple-case-1.js';

test('utils | css | get-class-name-to-styles > simple case (1)', function () {
  assert.deepStrictEqual(Array.from(classNameToStyles.keys()), [
    'image',
    'placeholder-image',
  ]);

  const styles = classNameToStyles.get('image');

  assert.deepStrictEqual(styles, [
    {
      classNames: ['image'],
      code: normalizeFile([
        `.image {`,
        `  aspect-ratio: 4 / 3;`,
        `  border-radius: 0.75rem;`,
        `  width: 100%;`,
        `}`,
      ]),
      line: 1,
      selector: '.image',
    },
    {
      classNames: ['image'],
      code: normalizeFile([`.image {`, `  object-fit: cover;`, `}`]),
      line: 8,
      selector: '.image',
    },
  ]);
});
