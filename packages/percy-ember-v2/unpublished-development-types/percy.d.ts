/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@percy/sdk-utils' {
  async function fetchPercyDOM(): Promise<string> {}

  async function isPercyEnabled(): Promise<boolean> {}

  function logger(namespace: string) {
    return {
      error: (error: unknown) => {},
    };
  }

  async function postSnapshot(options: Record<string, unknown>) {}

  const utils = {
    fetchPercyDOM,
    isPercyEnabled,
    logger,
    postSnapshot,
  };

  export = utils;
}
