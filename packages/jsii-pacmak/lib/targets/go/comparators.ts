type Named = { readonly name: string };
export function byName(l: Named, r: Named): number {
  return l.name.localeCompare(r.name);
}
