#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { removeEmberCssModules } from '../src/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-remove-ember-css-modules';

// Set codemod options
const { argv } = yargs(hideBin(process.argv))
  .option('component-structure', {
    choices: ['flat', 'nested'],
    default: 'flat',
    describe: 'Component structure (how your components are colocated)',
    type: 'string',
  })
  .option('root', {
    describe: 'Location of your Ember project',
    type: 'string',
  });

function castEmptyStringToUndefined(string) {
  return string === '' ? undefined : string;
}

const codemodOptions = {
  componentStructure: castEmptyStringToUndefined(argv['component-structure']),
  projectRoot: argv['root'] ?? process.cwd(),
};

removeEmberCssModules(codemodOptions);
