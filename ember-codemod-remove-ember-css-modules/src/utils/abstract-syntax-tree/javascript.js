import { parse as babelParser } from '@babel/parser';
import { parse, print, types, visit } from 'recast';

/* https://github.com/benjamn/recast/blob/v1.4.0/lib/options.ts */
const formattingOptions = {
  quote: 'single',
};

/* https://github.com/facebook/jscodeshift/blob/v0.14.0/parser/babel5Compat.js */
const jsOptions = {
  sourceType: 'module',
  allowHashBang: true,
  ecmaVersion: Infinity,
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'estree',
    'jsx',
    'asyncGenerators',
    'classProperties',
    'doExpressions',
    'exportExtensions',
    'functionBind',
    'functionSent',
    'objectRestSpread',
    'dynamicImport',
    'nullishCoalescingOperator',
    'optionalChaining',
    [
      'decorators',
      {
        decoratorsBeforeExport: false,
      },
    ],
  ],
};

/* https://github.com/facebook/jscodeshift/blob/v0.14.0/parser/tsOptions.js */
const tsOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'decorators-legacy',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportExtensions',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    ['pipelineOperator', { proposal: 'minimal' }],
    'throwExpressions',
    'typescript',
  ],
};

function getParseOptions(hasTypeScript) {
  return {
    parser: {
      parse(file) {
        return babelParser(file, hasTypeScript ? tsOptions : jsOptions);
      },
    },
  };
}

function traverseJavaScript(file, visitMethods) {
  const ast = parse(file, getParseOptions(false));

  visit(ast, visitMethods);

  return ast;
}

function traverseTypeScript(file, visitMethods) {
  const ast = parse(file, getParseOptions(true));

  visit(ast, visitMethods);

  return ast;
}

const tools = {
  builders: types.builders,
  print(ast) {
    return print(ast, formattingOptions).code;
  },
  traverse(hasTypeScript) {
    return hasTypeScript ? traverseTypeScript : traverseJavaScript;
  },
};

export default tools;
