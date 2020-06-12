export function goNameFromJs(name: string): string {
  return name.replace(/[^a-z0-9_.]/gi, '').toLowerCase();
}
