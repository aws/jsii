import * as fs from 'fs-extra';

import { Assembly, SPEC_FILE_NAME } from 'jsii-spec';

export function findSpecForModule(module: string) {
    const moduleInfo = require(`${module}/package.json`);
    return require.resolve(`${module}/${moduleInfo.jsii.outdir}/${SPEC_FILE_NAME}`);
}

export async function readAssembly(module: string): Promise<Assembly> {
    return JSON.parse((await fs.readFile(findSpecForModule(module))).toString());
}
