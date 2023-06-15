import { generate, parse, walk } from 'css-tree';

function _traverse() {
  return function (file: string, visitMethods = {}) {
    const ast = parse(file);

    for (const [nodeType, visitMethod] of Object.entries(visitMethods)) {
      walk(ast, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Assume that types from external packages are correct
        enter: visitMethod,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Assume that types from external packages are correct
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
