export function extractSelectors(selectorList: string): string[] {
  return selectorList.split(/\s*,\s*/);
}
