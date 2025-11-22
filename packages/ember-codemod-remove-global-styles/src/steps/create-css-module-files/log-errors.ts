type Data = {
  cssModuleFilePath: string;
};

export function logErrors(errors: string[], data: Data): void {
  if (errors.length === 0) {
    return;
  }

  console.warn(`WARNING: ${data.cssModuleFilePath} may be incorrect.`);
  console.warn(errors.map((error) => `- ${error}`).join('\n'));
  console.log();
}
