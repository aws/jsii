// TODO: Generic utils for naming public/private data types & properties
export function goNameFromJs(name: string): string {
  return name.replace(/[^a-z0-9_.]/gi, '').toLowerCase();
}
