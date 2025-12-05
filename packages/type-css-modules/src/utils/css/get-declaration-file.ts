import { EOL } from 'node:os';

export function getDeclarationFile(classNames: string[] = []): string {
  if (classNames.length === 0) {
    return [
      'declare const styles: Record<string, never>;',
      '',
      'export default styles;',
      '',
    ].join(EOL);
  }

  return [
    'declare const styles: {',
    ...classNames.map((className) => {
      return `  readonly '${className}': string;`;
    }),
    '};',
    '',
    'export default styles;',
    '',
  ].join(EOL);
}
