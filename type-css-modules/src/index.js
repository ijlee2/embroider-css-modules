import {
  cleanDeclarationFiles,
  createDeclarationFiles,
  createOptions,
} from './steps/index.js';

export function typeCssModules(codemodOptions) {
  const options = createOptions(codemodOptions);

  cleanDeclarationFiles(options);
  createDeclarationFiles(options);
}
