import fs = require('fs-extra');
import PackOnlyGenerator from '../generators/pack-only';
import { Target, TargetOptions } from '../target';

export default class PackOnly extends Target {
    protected readonly generator = new PackOnlyGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(srcDir: string, outDir: string) {
        await fs.copy(srcDir, outDir, { overwrite: true, recursive: true });
    }
}
