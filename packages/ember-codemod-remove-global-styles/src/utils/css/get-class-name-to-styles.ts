import {
  type AstRule,
  createParser,
  render,
  traverse,
} from 'css-selector-parser';
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

type Selector = {
  childClassNames: string[];
  parentClassName: string;
  selector: string;
};

const parse = createParser({
  // Allow unknown pseudo-classes
  syntax: 'progressive',
});

function parseRule(rule: AstRule): Selector | undefined {
  const childClassNames: string[] = [];

  traverse(rule, (node) => {
    if (node.type === 'ClassName') {
      childClassNames.push(node.name);
    }
  });

  if (childClassNames.length === 0) {
    return undefined;
  }

  const parentClassName = childClassNames.shift()!;

  return {
    childClassNames,
    parentClassName,
    selector: render(rule),
  };
}

function parseSelector(maybeSelector: string): Selector[] {
  const selectors: Selector[] = [];

  try {
    const { rules } = parse(maybeSelector);

    rules.forEach((rule) => {
      traverse(rule, (node) => {
        if (node.type !== 'Rule') {
          return;
        }

        const selector = parseRule(node);

        if (selector === undefined) {
          return;
        }

        selectors.push(selector);
      });
    });
  } catch {
    // Do nothing
  }

  return selectors;
}

export function getClassNameToStyles(file: string): ClassNameToStyles {
  const classNameToStyles: ClassNameToStyles = new Map();

  function processRule(node: Node): void {
    const clone = node.clone();
    const line = node.source.start.line;

    const selectors = parseSelector(node.selector);

    selectors.forEach(({ childClassNames, parentClassName, selector }) => {
      clone.selector = selector;

      const style = {
        classNames: childClassNames,
        code: clone.toString(),
        line,
        selector,
      };

      if (classNameToStyles.has(parentClassName)) {
        classNameToStyles.get(parentClassName)!.push(style);
      } else {
        classNameToStyles.set(parentClassName, [style]);
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
