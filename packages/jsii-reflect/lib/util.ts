
export function indexBy<T>(xs: T[], f: (x: T) => string): {[key: string]: T} {
  const ret: {[key: string]: T} = {};
  for (const x of xs) {
    ret[f(x)] = x;
  }
  return ret;
}