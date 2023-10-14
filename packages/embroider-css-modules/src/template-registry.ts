import type LocalHelper from './helpers/local.ts';
import type LocalClassHelper from './helpers/local-class.ts';

export default interface EmbroiderCssModulesRegistry {
  local: typeof LocalHelper;
  'local-class': typeof LocalClassHelper;
}
