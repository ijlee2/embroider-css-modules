declare module '@percy/sdk-utils' {
  async function isPercyEnabled(): Promise<boolean> {}

  const utils = {
    isPercyEnabled,
  };

  export = utils;
}
