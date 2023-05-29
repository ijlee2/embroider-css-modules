import type LocalClassHelper from './helpers/local-class';
import type LocalClassNewHelper from './helpers/local-class-new';

export default interface EmbroiderCssModulesRegistry {
  'local-class': typeof LocalClassHelper;
  'local-class-new': typeof LocalClassNewHelper;
}
