import type LocalClassHelper from './helpers/local-class.ts';

export default interface EmbroiderCssModulesRegistry {
  'local-class': typeof LocalClassHelper;
}
