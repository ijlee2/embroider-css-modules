import percySnapshot from '@percy/ember';

type QUnitAssert = {
  test: {
    module: {
      name: string;
    };
    testName: string;
  };
};

function getName(qunitAssert: QUnitAssert): string {
  const packageName = 'my-app';
  const moduleName = qunitAssert.test.module.name;
  const testName = qunitAssert.test.testName;

  const name = `${moduleName} | ${testName} (${packageName})`;

  return name;
}

export async function takeSnapshot(qunitAssert: unknown): Promise<void> {
  const name = getName(qunitAssert as QUnitAssert);

  await percySnapshot(name);
}
