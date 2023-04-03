import type LocalClassHelper from './helpers/local-class';

export default interface EmbroiderCssModulesRegistry {
  'local-class': typeof LocalClassHelper;
}
