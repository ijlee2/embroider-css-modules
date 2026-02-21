import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-name-to-styles > simple case (1)', function () {
  const file = normalizeFile([
    `.image,`,
    `.placeholder-image {`,
    `  aspect-ratio: 4 / 3;`,
    `  border-radius: 0.75rem;`,
    `  width: 100%;`,
    `}`,
    ``,
    `.image {`,
    `  object-fit: cover;`,
    `}`,
    ``,
    `.placeholder-image {`,
    `  background: linear-gradient(`,
    `    36deg,`,
    `    rgb(255 224 130 / 40%) 15%,`,
    `    rgb(255 248 225 / 80%) 90%`,
    `  );`,
    `  min-width: 8rem;`,
    `}`,
    ``,
  ]);

  const classNameToStyles = getClassNameToStyles(file);

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
