import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      generateScopedName: 'my-v2-app__[sha512:hash:base64:5]',
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
