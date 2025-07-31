import { readFile } from 'fs';

/*
 * Look for existing nested values in config, return undefined if not found
 */
export function getNestedValue(
  keys: string[],
  current: Record<string, unknown>,
): any {
  try {
    return keys.reduce((val: any, key: string) => val[key], current);
  } catch {
    return undefined;
  }
}

/*
 * recursively remove keys from object whose value empty.
 */
export function removeEmptyValues<T extends object>(fields: T): T {
  return Object.entries(fields).reduce(
    (accum: any, [key, val]: [string, any]) => {
      if (typeof val === 'object') {
        return {
          ...accum,
          [key]: removeEmptyValues(val),
        };
      }

      return {
        ...accum,
        ...(!val
          ? {}
          : {
              [key]: val,
            }),
      };
    },
    {},
  );
}

/*
 * recursively flatten nested object
 */
export function flattenKeys(parent: string, fields: any) {
  return Object.entries(fields).reduce(
    (accum: any, [key, vals]: [string, any]) => ({
      ...accum,
      [`${parent}.${key}`]: vals,
    }),
    {},
  );
}

/**
 * utility for for fs.readFile as a promise
 *
 * TODO: use util.promisify without breaking test stub
 */
export async function readFilePromise(path: string): Promise<Buffer> {
  const result: Buffer = await new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  return result;
}
