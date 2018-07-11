import * as fs from 'fs-extra';
import { SPEC_FILE_NAME } from 'jsii-spec';
import { compilePackage } from './compiler';
import { filterEmpty } from './util';

export async function bundle(moduleRoot: string): Promise<void> {
    const spec = await compilePackage(moduleRoot);
    await fs.writeJson(SPEC_FILE_NAME, spec, { replacer: filterEmpty, spaces: 2 });
}
