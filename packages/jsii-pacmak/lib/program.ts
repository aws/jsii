import { spawn } from 'child_process';
import * as fs from 'fs-extra';
import { SPEC_FILE_NAME } from 'jsii-spec';
import * as path from 'path';
import { IGenerator } from './generator';

async function lookupGenerator(lang: string) {
    const pth = path.join(__dirname, '../lib/generators', `${lang}.js`);

    if (!(await fs.pathExists(pth))) {
        throw new Error(`Cannot find generator module: ${pth}`);
    }

    return require(pth).default;
}

async function newGeneratorForLanguage(lang: string): Promise<IGenerator> {
    // tslint:disable-next-line:variable-name
    const GeneratorClass: any = await lookupGenerator(lang);
    return new GeneratorClass();
}

export async function generate(lang: string, packageDir: string, outDir: string, fingerprint: boolean = true, force: boolean = false) {
    const jsiiFile = path.join(packageDir, SPEC_FILE_NAME);

    const generator = await newGeneratorForLanguage(lang);
    await generator.load(jsiiFile);

    if (!force && await generator.upToDate(outDir)) {
        // tslint:disable-next-line:no-console
        console.log(`Artifacts in ${outDir} are already up-to-date (use --force to re-generate)`);
        return;
    }

    generator.generate(fingerprint);

    const tarball = await npmPack(packageDir);
    try {
        await generator.save(outDir, tarball);
    } finally {
        await fs.remove(tarball); // clean up
    }
}

async function npmPack(packageDir: string) {
    const child = spawn('npm', [ 'pack', '--ignore-scripts' ], { cwd: packageDir, stdio: [ 'ignore', 'pipe', 'pipe' ] });

    const tarball = await new Promise<string>((ok, fail) => {
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', chunk => stdout += chunk.toString());
        child.stderr.on('data', chunk => stderr += chunk.toString());
        child.once('exit', status => {
            if (status === 0) {
                return ok(stdout.trim());
            } else {
                process.stderr.write(stderr);
                return fail(new Error('Exit with status ' + status));
            }
        });
    });

    return path.join(packageDir, tarball);
}
