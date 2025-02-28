import utils from '@percy/sdk-utils';

const alwaysRun = true;

type QunitAssert = {
  test: {
    module: {
      name: string;
    };
    testName: string;
  };
};

// Helper to generate a snapshot name from the test suite
function generateName(qunitAssertOrName: object | string): string {
  const isQunitAssert = typeof qunitAssertOrName !== 'string';

  if (isQunitAssert) {
    const { test } = qunitAssertOrName as unknown as QunitAssert;

    return `${test.module.name} | ${test.testName}`;
  }

  return qunitAssertOrName;
}

// Helper to scope a DOM snapshot to the ember-testing container to capture the
// ember application without the testing UI
function scopeDOM(scope: string, dom: Document): void {
  const bodyElement = dom.querySelector('body');
  const scopedElement = dom.querySelector(scope);

  if (!bodyElement || !scopedElement) {
    return;
  }

  // replace body content with scoped content
  bodyElement.replaceChildren(...scopedElement.children);

  // copy scoped attributes to the body element
  for (let i = 0; i < scopedElement.attributes.length; i++) {
    // eslint-disable-next-line prefer-const
    let { name, value } = scopedElement.attributes.item(i)!;

    // keep any existing body class
    if (name === 'class') {
      value = `${bodyElement.className} ${value}`.trim();
    }

    bodyElement.setAttribute(name, value);
  }

  // remove #ember-testing styles by removing the id
  dom.querySelector('#ember-testing')?.removeAttribute('id');
}

export async function percySnapshot(
  qunitAssertOrName: object | string,
  options: Record<string, unknown> = {},
): Promise<void> {
  // Check if Percy is enabled
  if (!alwaysRun && !(await utils.isPercyEnabled())) {
    return;
  }

  const log = utils.logger('ember');
  const name = generateName(qunitAssertOrName);

  try {
    // Inject @percy/dom
    if (!window.PercyDOM) {
      eval(await utils.fetchPercyDOM());
    }

    // Serialize and capture the DOM
    const domTransformation = options['domTransformation'] as
      | ((dom: Document) => Document)
      | undefined;

    const emberTestingScope =
      (options['emberTestingScope'] as string | undefined) ?? '#ember-testing';

    const domSnapshot = window.PercyDOM!.serialize({
      domTransformation: (dom: Document) => {
        const transformedDom = domTransformation ? domTransformation(dom) : dom;

        return scopeDOM(emberTestingScope, transformedDom);
      },
      ...options,
    });

    await utils.postSnapshot({
      ...options,
      domSnapshot,
      name,
    });
  } catch (error: unknown) {
    // Handle errors
    log.error(`Could not take DOM snapshot "${name}"`);
    log.error(error);
  }
}
