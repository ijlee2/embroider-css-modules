import postcss from 'postcss';

import type { ClassToStyles } from '../../types/index.js';

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

function getClasses(selector: string): string[] {
  const matches = Array.from(selector.matchAll(/\.([\w-]+)/g));

  return matches.map((results) => results[1]!);
}

function getRootClass(selector: string): string | undefined {
  const matches = selector.match(/^\.([\w-]+).*$/);

  if (matches === null) {
    return undefined;
  }

  return matches[1];
}

export function getClassToStyles(file: string): ClassToStyles {
  const classToStyles: ClassToStyles = new Map();

  function processRule(node: Node): void {
    const allSelectors = node.selector.split(/\s*,\s*/);
    const clone = node.clone();

    allSelectors.forEach((selector) => {
      const containerClass = getRootClass(selector);

      if (containerClass === undefined) {
        return;
      }

      clone.selector = selector;

      const data = {
        classes: getClasses(selector),
        location: {
          end: node.source.end,
          start: node.source.start,
        },
        raw: clone.toString(),
        selector,
      };

      if (classToStyles.has(containerClass)) {
        classToStyles.get(containerClass)!.push(data);
      } else {
        classToStyles.set(containerClass, [data]);
      }
    });
  }

  const plugins = [
    {
      postcssPlugin: 'postcss-get-class-to-styles',
      prepare() {
        return {
          Rule: processRule,
        };
      },
    },
  ];

  // @ts-expect-error: Incorrect type
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  postcss(plugins).process(file).css;

  return classToStyles;
}
