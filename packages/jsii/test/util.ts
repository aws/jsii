import * as fs from 'fs'
import * as path from 'path'

const readDir  = (dir: string) => new Promise<string[]>((ok, fail) => fs.readdir(dir, (err, files) => err ? fail(err) : ok(files)));
const readFile = (filePath: string) => new Promise<Buffer>((ok, fail) => fs.readFile(filePath, (err, data) => err ? fail(err) : ok(data)));

export async function assertDirEquals(actualDir: string, expectedDir: string) {
    let expectedFiles = (await readDir(expectedDir)).sort().filter(filterHiddenFiles);
    let actualFiles   = (await readDir(actualDir)).sort().filter(filterHiddenFiles);

    if (actualFiles.length !== expectedFiles.length) {
        console.error('==========================================');
        console.error('Mismatch in number of files:');
        console.error('    Expected:', expectedDir, '-', expectedFiles.join(','));
        console.error('    Actual:', actualDir, '-', actualFiles.join(','));
        console.error('==========================================');
        throw new Error('Invalid number of files');        
    }

    let errors = false;

    for (let file of expectedFiles) {
        let actualFile = path.join(actualDir, file);
        let expectedFile = path.join(expectedDir, file);

        let actual = (await readFile(actualFile)).toString();
        let expected = (await readFile(expectedFile)).toString();

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