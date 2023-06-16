import {
  cleanDeclarationFiles,
  createDeclarationFiles,
  createOptions,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function typeCssModules(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  cleanDeclarationFiles(options);
  createDeclarationFiles(options);
}
