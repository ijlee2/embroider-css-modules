import type { PackageJson } from '@codemod-utils/json';

type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  projectType: 'app' | 'v2-addon';
};

type Context = {
  components: Entities;
  routes: Entities;
};

type Entities = Map<string, Set<string>>;

type Options = {
  componentStructure: 'flat' | 'nested';
  project: {
    dependencies: Map<string, string>;
    hasEmberCssModules: boolean;
    hasGlint: boolean;
    hasTypeScript: boolean;
  };
  projectRoot: string;
  projectType: 'app' | 'v2-addon';
};

type OptionsForImportStyles = {
  customizations: {
    blueprintFilePaths: string[];
    getFilePath: (entityName: string) => string;
  };
  options: Options;
};

type OptionsForUpdateTemplates = {
  customizations: {
    getFilePath: (entityName: string) => string;
  };
  options: Options;
};

export type {
  CodemodOptions,
  Context,
  Entities,
  Options,
  OptionsForImportStyles,
  OptionsForUpdateTemplates,
  PackageJson,
};
