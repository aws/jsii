import { readFile } from 'fs';

/* 
 * Look for existing nested values in config, return undefined if not found
 */
export function getNestedValue(keys: string[], current: object): any {
  try {
    return keys.reduce((val: any, key: string) => val[key], current);
  } catch (_err) {
    return undefined;
  }
}

/*
 * recursively flatten nested object
 */
export function flattenKeys(parent: string, fields: any) {
  return Object.entries(fields).reduce((accum: any, [key, vals]: [string, any]) => ({
    ...accum,
    [`${parent}.${key}`]: vals
  }), {});
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
