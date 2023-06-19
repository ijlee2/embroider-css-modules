import type { Context, Options } from '../../../types/index.js';
import { analyzeComponents, analyzeRoutes } from './analyze-app/index.js';

export function analyzeApp(options: Options): Context {
  return {
    components: analyzeComponents(options),
    routes: analyzeRoutes(options),
  };
}
