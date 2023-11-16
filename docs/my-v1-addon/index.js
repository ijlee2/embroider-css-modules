'use strict';

const autoprefixer = require('autoprefixer');
const BroccoliFunnel = require('broccoli-funnel');
const broccoliMergeTrees = require('broccoli-merge-trees');
const compileCSS = require('broccoli-postcss');
const path = require('path');
const postcssModules = require('postcss-modules');

module.exports = {
  name: require('./package').name,

  included(app, parentAddon) {
    this._super.included.apply(this, app, parentAddon);

    if (this.isAddon()) {
      return;
    }

    app.import(`vendor/${this.name}.css`);
  },

  isAddon() {
    const keywords = this.project.pkg.keywords ?? [];

    return keywords.includes('ember-addon');
  },

  treeForVendor(node) {
    if (this.isAddon()) {
      return node;
    }

    const stylesDirectory = path.join(
      /* deprecated */
      this.project.nodeModulesPath,
      this.name,
      'app',
      'styles',
    );

    const tree = new BroccoliFunnel(stylesDirectory, {
      include: ['*.css'],
    });

    const options = {
      browsers: [
        'last 2 Chrome versions',
        'last 2 Edge versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
      ],
      exclude: [],
      include: ['*.css'],
      map: {
        inline: true,
      },
      plugins: [
        postcssModules({
          generateScopedName: 'my-v1-addon__[sha512:hash:base64:5]',
        }),
        autoprefixer(),
      ],
    };

    const css = compileCSS(tree, options);

    if (node) {
      return broccoliMergeTrees([node, css]);
    }

    return css;
  },

  options: {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  },
};
