'use strict';

const { browsers } = require('./config/targets');

module.exports = {
  extends: ['@shared-configs/stylelint'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
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
  },
};
