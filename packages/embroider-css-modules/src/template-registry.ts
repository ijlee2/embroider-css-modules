import type LocalHelper from './helpers/local.ts';

export default interface EmbroiderCssModulesRegistry {
  local: typeof LocalHelper;
}
