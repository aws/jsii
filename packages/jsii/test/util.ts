import * as fs from 'fs';
import * as path from 'path';

const readDir  = (dir: string) => new Promise<string[]>((ok, fail) => fs.readdir(dir, (err, files) => err ? fail(err) : ok(files)));
const readFile = (filePath: string) => new Promise<Buffer>((ok, fail) => fs.readFile(filePath, (err, data) => err ? fail(err) : ok(data)));

// tslint:disable:no-console
export async function assertDirEquals(actualDir: string, expectedDir: string) {
    const expectedFiles = (await readDir(expectedDir)).sort().filter(filterHiddenFiles);
    const actualFiles   = (await readDir(actualDir)).sort().filter(filterHiddenFiles);

    if (actualFiles.length !== expectedFiles.length || expectedFiles.find(f => actualFiles.indexOf(f) === -1)) {
        console.error('==========================================');
        console.error('Mismatch in file names or count:');
        console.error('    Expected:', expectedDir, '-', expectedFiles.join(','));
        console.error('    Actual:', actualDir, '-', actualFiles.join(','));
        console.error('==========================================');
        throw new Error('Invalid file names or number of files');
    }

    let errors = false;

    for (const file of expectedFiles) {
        const actualFile = path.join(actualDir, file);
        const expectedFile = path.join(expectedDir, file);

        const actual = (await readFile(actualFile)).toString();
        const expected = (await readFile(expectedFile)).toString();

        if (actual !== expected) {
            console.error('==========================================');
            console.error(`diff ${expectedFile} ${actualFile}`);
            console.error(`cp ${actualFile} ${expectedFile}`);
            console.error('===========================================')
            errors = true;
        }
    }

    if (errors) {
        throw new Error('Diff failed');
    }
}
function filterHiddenFiles(fileName: string) {
    return !fileName.startsWith('.');
}
