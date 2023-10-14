import type LocalHelper from './helpers/local.ts';
import type LocalClassNewHelper from './helpers/local-class-new.ts';

export default interface EmbroiderCssModulesTemporaryRegistry {
  local: typeof LocalHelper;
  'local-class-new': typeof LocalClassNewHelper;
}
