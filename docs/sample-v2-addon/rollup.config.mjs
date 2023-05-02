import { Addon } from '@embroider/addon-dev/rollup';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-ts';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      'components/**/!(*.css.d).js',
      'index.js',
      'template-registry.js',
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['components/**/!(*.css.d).js']),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Implement CSS modules
    postcss({
      autoModules: false,
      modules: {
        generateScopedName: 'sample-v2-addon__[sha512:hash:base64:5]',
        // generateScopedName: 'sample-v2-addon__[path][name]__[local]',
      },
    }),

    // compile TypeScript to latest JavaScript, including Babel transpilation
    typescript({
      transpiler: 'babel',
      browserslist: false,
      transpileOnly: false,
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets([]),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
