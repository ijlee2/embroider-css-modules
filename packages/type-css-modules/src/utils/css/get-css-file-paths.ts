import type { Options } from '../../types/index.js';

export function getCssFilePaths(options: Options): string[] {
  const { src } = options;

  return src.map((directory) => `${directory}/**/*.css`);
}
