import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { type AstRule, createParser, traverse } from 'css-selector-parser';
import type { Plugin } from 'postcss';
import postcss from 'postcss';

import type { Options } from '../../types/index.js';

const parse = createParser({
  // Allow unknown pseudo-classes
  syntax: 'progressive',
});

function parseRule(rule: AstRule): string[] {
  const classNames: string[] = [];

  traverse(rule, (node) => {
    if (node.type === 'ClassName') {
      classNames.push(node.name);
    }
  });

  return classNames;
}

function parseSelector(maybeSelector: string): string[] {
  const classNames: string[] = [];

  try {
    const { rules } = parse(maybeSelector);

    rules.forEach((rule) => {
      traverse(rule, (node) => {
        if (node.type === 'Rule') {
          classNames.push(...parseRule(node));
        }
      });
    });
  } catch {
    // Do nothing
  }

  return classNames;
}

export function getClassNames(filePath: string, options: Options): string[] {
  const { projectRoot } = options;

  const file = readFileSync(join(projectRoot, filePath), 'utf8');
  const classNames: string[] = [];

  const plugins: Plugin[] = [
    {
      postcssPlugin: 'postcss-get-class-names',
      // oxlint-disable-next-line typescript/explicit-function-return-type
      prepare() {
        return {
          Rule(node): void {
            classNames.push(...parseSelector(node.selector));
          },
        };
      },
    },
  ];

  // oxlint-disable-next-line typescript/no-unused-expressions
  postcss(plugins).process(file).css;

  return Array.from(new Set(classNames)).sort();
}
