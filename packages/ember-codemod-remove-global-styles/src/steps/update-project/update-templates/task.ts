import type { Options } from '../../../types/index.js';
import { updateTemplate } from '../../../utils/update-project/index.js';

export function task(
  templateFilePath: string,
  options: Options,
): [templateFilePath: string, templateFile: string] | undefined {
  const { output, status } = updateTemplate(templateFilePath, options);

  if (status === 'error') {
    return undefined;
  }

  return [templateFilePath, output.templateFile];
}
