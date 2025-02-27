import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  css: {
    lightningcss: {
      cssModules: {
        pattern: 'my-v2-app__[hash]-[local]',
      },
    },
    transformer: 'lightningcss',
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
