import { percySnapshot } from 'percy-ember-v2/test-support';

type QUnitAssert = {
  test: {
    module: {
      name: string;
    };
    testName: string;
  };
};

function getName(qunitAssert: QUnitAssert): string {
  const packageName = 'my-v1-app';
  const moduleName = qunitAssert.test.module.name;
  const testName = qunitAssert.test.testName;

  const name = `${moduleName} | ${testName} (${packageName})`;

  return name;
}

export async function takeSnapshot(qunitAssert: unknown): Promise<void> {
  const name = getName(qunitAssert as QUnitAssert);

  await percySnapshot(name);
}
