import DotNetGenerator from '../generators/dotnet';
import { Target, TargetOptions } from '../target';

export default class Dotnet extends Target {
    protected readonly generator = new DotNetGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public build(sourceDir: string, outDir: string) {
        // TODO: Actually build!
        return this.copyFiles(sourceDir, outDir);
    }
}
