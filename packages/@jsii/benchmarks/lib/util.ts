import * as fs from 'fs-extra';
import * as tar from 'tar';

export async function streamUntar(file: string, config: tar.ExtractOptions) {
  const stream = fs.createReadStream(file).pipe(tar.x(config));

  return new Promise((ok, ko) => {
    stream.on('end', ok);
    stream.on('error', (error: Error) => ko(error));
  });
}

export async function inDirectory<T>(
  newWorkDir: string,
  cb: () => T | Promise<T>,
) {
  const cwd = process.cwd();
  try {
    process.chdir(newWorkDir);
    return await cb();
  } finally {
    process.chdir(cwd);
  }
}
