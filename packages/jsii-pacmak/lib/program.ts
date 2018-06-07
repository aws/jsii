import * as fs from 'fs-extra'
import * as path from 'path'
import * as spec from 'jsii-spec'

async function lookupGenerator(lang: string) {
    const pth = path.join(__dirname, '../lib/generators', `${lang}.js`);

    if (!(await fs.pathExists(pth))) {
        throw new Error(`Cannot find generator module: ${pth}`);
    }

    return require(pth).default;
}

async function createGenerator(lang: string, jsiiFile: string) {
    let jsiiData = (await fs.readFile(jsiiFile)).toString();
    let mod = JSON.parse(jsiiData) as spec.Assembly;

    let snapshot = `/tmp/jsii-module.${spec.SPEC_FILE_NAME}`;
    await fs.writeFile(snapshot, JSON.stringify(mod, null, 2));

    const GeneratorClass: any = await lookupGenerator(lang);
    return new GeneratorClass(mod);
}

export async function generate(target: string, jsiiDir: string, outDir: string) {
    const generator = await createGenerator(target, path.join(jsiiDir, spec.SPEC_FILE_NAME));
    generator.generate();
    await generator.save(outDir);
}
