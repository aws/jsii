import * as fs from 'fs-extra'
import * as path from 'path'

/**
 * Buffers the text of a file for later saving.
 */
export default class FileBuffer {
  public readonly filePath: string;
  private buffer = '';

  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public write(s: string) {
    this.buffer += s;
  }

  public async save(rootDir: string) {
    const fullPath = path.join(rootDir, this.filePath);
    await fs.mkdirs(path.dirname(fullPath));
    await fs.writeFile(fullPath, this.buffer);
    return fullPath;
  }
}
