import { readFile, writeFile } from 'fs';

/*
 * recursively flatten nested object
 */
export function flattenKeys(parent: string, fields: any) {
  return Object.entries(fields).reduce((accum: any, [key, vals]: [string, any]) => ({
    ...accum,
    [`${parent}.${key}`]: vals
  }), {});
}

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

export async function writeFilePromise(path: string, config: string): Promise<void> {
  const result: void = await new Promise((resolve, reject) => {
    writeFile(path, config, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
  return result;
}
