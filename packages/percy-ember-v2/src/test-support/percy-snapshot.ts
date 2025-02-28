import utils from '@percy/sdk-utils';

const alwaysRun = true;

export async function percySnapshot(name: string): Promise<void> {
  // Check if Percy is enabled
  if (!alwaysRun && !(await utils.isPercyEnabled())) {
    return;
  }

  console.log(name);
}
