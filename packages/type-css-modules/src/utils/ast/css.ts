import { generate, parse, walk } from 'css-tree';

function _traverse() {
  return function (file, visitMethods = {}) {
    const ast = parse(file);

    for (const [nodeType, visitMethod] of Object.entries(visitMethods)) {
      walk(ast, {
        enter: visitMethod,
        visit: nodeType,
      });
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
