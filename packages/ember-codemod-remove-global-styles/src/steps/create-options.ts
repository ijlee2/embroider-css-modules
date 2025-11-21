import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot, src } = codemodOptions;

  return {
    projectRoot,
    src,
  };
}
