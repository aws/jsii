import PackOnlyGenerator from '../generators/pack-only';
import { Target, TargetOptions } from '../target';

export default class Npm extends Target {
    protected readonly generator = new PackOnlyGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public build(sourceDir: string, outDir: string) {
        return this.copyFiles(sourceDir, outDir);
    }
}
