import type { Options } from '../../../types/index.js';
import { updateClass } from '../../../utils/update-project/index.js';

export function task(
  templateFilePath: string,
  options: Options,
): [classFilePath: string, classFile: string] | undefined {
  const { output, status } = updateClass(templateFilePath, options);

  if (status === 'error') {
    return undefined;
  }

  return [output.classFilePath, output.classFile];
}
