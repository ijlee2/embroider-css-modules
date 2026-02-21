import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/complex-case-5.js';

test('utils | css | print-styles > complex case (5)', function () {
  const styles = classNameToStyles.get('widgets')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.widgets {`,
      `  display: grid;`,
      `  gap: 1rem;`,
      `  grid-template-areas:`,
      `    "widget-1"`,
      `    "widget-2"`,
      `    "widget-3"`,
      `    "widget-4"`,
      `    "widget-5";`,
      `  grid-template-columns: 1fr;`,
      `  grid-template-rows: repeat(4, minmax(12rem, 75%)) 5rem;`,
      `}`,
      ``,
      `.widgets {`,
      `      grid-template-rows: repeat(4, 25%) 5rem;`,
      `    }`,
      ``,
      `.widgets {`,
      `    grid-template-areas:`,
      `      "widget-1 widget-2"`,
      `      "widget-4 widget-2"`,
      `      "widget-4 widget-3"`,
      `      "widget-5 widget-3";`,
      `    grid-template-columns: 2fr 5fr;`,
      `    grid-template-rows: 3fr 1fr 2fr 1fr;`,
      `    height: 40rem;`,
      `  }`,
      ``,
      `.widgets {`,
      `      grid-template-rows: 3fr 1fr 2fr 5rem;`,
      `    }`,
      ``,
      `.widgets {`,
      `    grid-template-areas:`,
      `      "widget-1 widget-2 widget-4"`,
      `      "widget-3 widget-3 widget-4"`,
      `      "widget-3 widget-3 widget-5";`,
      `    grid-template-columns: minmax(25%, 15rem) minmax(50%, 15rem) auto;`,
      `    grid-template-rows: 12fr 3fr 5fr;`,
      `    height: 40rem;`,
      `  }`,
      ``,
      `.widgets {`,
      `      grid-template-rows: 4fr 1fr 10rem;`,
      `    }`,
    ]),
  );
});
