import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  return {
    projectRoot: codemodOptions.projectRoot,
    src: codemodOptions.src,
  };
}
