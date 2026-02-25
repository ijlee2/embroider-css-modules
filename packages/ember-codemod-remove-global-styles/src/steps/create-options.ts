import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { convert, entity, projectRoot, src } = codemodOptions;

  return {
    convert: {
      components: convert.has('components'),
      routes: convert.has('routes'),
    },
    entity,
    projectRoot,
    src,
  };
}
