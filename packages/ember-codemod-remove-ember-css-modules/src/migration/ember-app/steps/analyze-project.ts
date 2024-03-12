import type { Context, Options } from '../../../types/index.js';
import { analyzeComponents, analyzeRoutes } from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  return {
    components: analyzeComponents(options),
    routes: analyzeRoutes(options),
  };
}
