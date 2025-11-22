export function getModuleFilePath(filePath: string): string {
  return filePath.replace(/(.+)\.(gjs|gts|hbs)$/, '$1.module.css');
}
