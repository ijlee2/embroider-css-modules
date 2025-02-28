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
): Promise<void> {
  // Check if Percy is enabled
  if (!alwaysRun && !(await utils.isPercyEnabled())) {
    return;
  }

  const name = generateName(qunitAssertOrName);

  console.log(name);
}
