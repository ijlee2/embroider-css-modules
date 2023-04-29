'use strict';

const browsers = [
  'last 2 Chrome versions',
  'last 2 Edge versions',
  'last 2 Firefox versions',
  'last 2 Safari versions',
];

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-order'],
  rules: {
    /*
      Customize plugins
    */
    'order/properties-order': [
      [
        // Defined by CSS modules
        'composes',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],

    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          // grid-template-columns falsely identified as multicolumn
          'multicolumn',
        ],
      },
    ],

    /*
      Customize rules
    */
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignoreProperties: [
          // Defined by CSS modules
          'composes',
        ],
      },
    ],

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
          // Defined by CSS modules
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // Defined by CSS modules
          'global',
        ],
      },
    ],
  },
};
