export function getDeclarationFile(classNames) {
  if (classNames.length === 0) {
    return [
      'declare const styles: Record<string, never>;',
      '',
      'export default styles;',
      '',
    ].join('\n');
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
  ].join('\n');
}
