import {
  type CssNode,
  type EnterOrLeaveFn,
  generate,
  parse,
  walk,
  type WalkOptions,
} from 'css-tree';

type VisitMethodName = CssNode['type'];

type EnterFn<T extends VisitMethodName> = EnterOrLeaveFn<
  Extract<CssNode, { type: T }>
>;

type VisitMethods = Partial<{
  [key in VisitMethodName]: EnterFn<key>;
}>;

function _traverse() {
  return function (file: string, visitMethods: VisitMethods = {}) {
    const ast = parse(file);

    for (const [nodeType, visitMethod] of Object.entries(visitMethods)) {
      walk(ast, {
        enter: visitMethod,
        visit: nodeType,
      } as WalkOptions);
    }

    return ast;
  };
}

const tools = {
  builders: undefined,
  print: generate,
  traverse: _traverse,
};

export default tools;
