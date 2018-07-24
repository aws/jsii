import path = require('path');
import process = require('process');
import JavaGenerator from '../generators/java';
import { Target, TargetOptions } from '../target';

export default class JavaPackageMaker extends Target {
    protected readonly generator = new JavaGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(sourceDir: string, outDir: string): Promise<void> {
        const url = `file://${path.resolve(process.cwd(), outDir)}`;
        const mvnArguments = new Array<string>();
        for (const arg of Object.keys(this.arguments)) {
            if (!arg.startsWith('mvn-')) { continue; }
            mvnArguments.push(`--${arg.slice(4)}`);
            mvnArguments.push(this.arguments[arg].toString());
        }
        await this.runCommand('mvn', [...mvnArguments, 'package', '-D', `publish.url=${url}`], { cwd: sourceDir });
    }
}
