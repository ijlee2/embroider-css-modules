import type LocalClassNewHelper from './helpers/local-class-new.ts';

export default interface EmbroiderCssModulesTemporaryRegistry {
  'local-class-new': typeof LocalClassNewHelper;
}
