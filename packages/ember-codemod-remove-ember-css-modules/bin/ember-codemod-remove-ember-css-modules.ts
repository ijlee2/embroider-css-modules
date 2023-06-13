#!/usr/bin/env node
// eslint-disable-next-line n/shebang
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { removeEmberCssModules } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-remove-ember-css-modules';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('component-structure', {
    choices: ['flat', 'nested'] as const,
    default: 'flat',
    describe: 'Component structure (how your components are colocated)',
    type: 'string',
  })
  .option('root', {
    describe: 'Location of your Ember project',
    type: 'string',
  })
  .parseSync();

const codemodOptions: CodemodOptions = {
  componentStructure: argv[
    'component-structure'
  ] as CodemodOptions['componentStructure'],
  projectRoot: argv['root'] ?? process.cwd(),
};

removeEmberCssModules(codemodOptions);
