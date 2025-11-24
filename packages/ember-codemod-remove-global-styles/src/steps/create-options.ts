import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { convert, folder, projectRoot, src } = codemodOptions;

  return {
    convert: {
      components: convert.has('components'),
      routes: convert.has('routes'),
    },
    folder,
    projectRoot,
    src,
  };
}
