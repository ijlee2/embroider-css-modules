'use strict';

const { browsers } = require('./config/targets');

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    /*
      Customize plugins
    */
    'order/properties-order': [
      [
        // Defined by ember-css-modules
        'composes',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],

    /*
      Customize rules
    */
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-gap', 'grid-template'],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // Defined by ember-css-modules
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // Defined by ember-css-modules
          'global',
        ],
      },
    ],
  },
};
