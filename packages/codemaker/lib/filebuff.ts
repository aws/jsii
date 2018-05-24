import * as fs from 'fs-extra'
import * as path from 'path'

/**
 * Buffers the text of a file for later saving.
 */
export default class FileBuffer {
    readonly filePath: string
    private buffer = '';

    constructor(filePath: string) {
        this.filePath = filePath
    }

    write(s: string) {
        this.buffer += s;
    }

    async save(rootDir: string) {
        let fullPath = path.join(rootDir, this.filePath);
        await fs.mkdirs(path.dirname(fullPath));
        await fs.writeFile(fullPath, this.buffer);
        return fullPath;
    }
}