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
    await utils.postSnapshot({
      ...options,
      name,
    });
  } catch (error: unknown) {
    // Handle errors
    log.error(`Could not take DOM snapshot "${name}"`);
    log.error(error);
  }
}
