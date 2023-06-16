import { ASTCSS as AST } from '../../../src/utils/ast.js';

export function traverseCSS(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file);

  return AST.print(ast);
}
