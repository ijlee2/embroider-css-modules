import { createParser, render, traverse } from 'css-selector-parser';
import type { Plugin } from 'postcss';
import postcss from 'postcss';

import type { ClassNameToStyles } from '../../types/index.js';

type Node = {
  [key: string]: unknown;
  clone: () => Node;
  selector: string;
  source: {
    end: {
      column: number;
      line: number;
      offset: number;
    };
    start: {
      column: number;
      line: number;
      offset: number;
    };
  };
  toString: () => string;
};

const parse = createParser({
  // Allow unknown pseudo-classes
  syntax: 'progressive',
});

function parseSelector(maybeSelector: string): {
  classNames: string[];
  selector: string;
}[] {
  try {
    const { rules } = parse(maybeSelector);

    return rules.map((rule) => {
      const classNames: string[] = [];

      traverse(rule, (node) => {
        if (node.type === 'ClassName') {
          classNames.push(node.name);
        }
      });

      return {
        classNames,
        selector: render(rule),
      };
    });
  } catch {
    return [];
  }
}

export function getClassNameToStyles(file: string): ClassNameToStyles {
  const classNameToStyles: ClassNameToStyles = new Map();

  function processRule(node: Node): void {
    const clone = node.clone();
    const data = parseSelector(node.selector);
    const line = node.source.start.line;

    data.forEach(({ classNames, selector }) => {
      const containerClass = classNames[0];

      if (containerClass === undefined) {
        return;
      }

      clone.selector = selector;

      const data = {
        classNames,
        code: clone.toString(),
        line,
        selector,
      };

      if (classNameToStyles.has(containerClass)) {
        classNameToStyles.get(containerClass)!.push(data);
      } else {
        classNameToStyles.set(containerClass, [data]);
      }
    });
  }

  const plugins: Plugin[] = [
    {
      postcssPlugin: 'postcss-get-class-name-to-styles',
      // @ts-expect-error: Incorrect type
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      prepare() {
        return {
          Rule: processRule,
        };
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  postcss(plugins).process(file).css;

  return classNameToStyles;
}
