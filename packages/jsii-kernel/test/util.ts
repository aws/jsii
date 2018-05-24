import * as fs from 'fs-extra';
import * as path from 'path';

import { Assembly } from 'jsii-spec';

export function findSpecForModule(module: string) {
    return path.resolve(path.join(require.resolve(module), '../../dist/jsii.json'));
}

export async function readAssembly(module: string): Promise<Assembly> {
    return JSON.parse((await fs.readFile(findSpecForModule(module))).toString());
}
