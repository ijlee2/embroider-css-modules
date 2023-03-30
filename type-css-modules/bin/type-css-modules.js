#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { typeCssModules } from '../src/index.js';

// Provide a title to the process in `ps`
process.title = 'type-css-modules';

// Set codemod options
const { argv } = yargs(hideBin(process.argv)).option('src', {
  demandOption: true,
  describe: 'Location(s) of the CSS files (your source code)',
  type: 'array',
});

const codemodOptions = {
  projectRoot: process.cwd(),
  src: argv['src'],
};

typeCssModules(codemodOptions);
