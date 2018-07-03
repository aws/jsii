import * as fs from 'fs-extra';
import * as path from 'path';

export interface PackageMetadata {
    /**
     * Package name (package.name)
     */
    name: string

    /**
     * Package version (package.version)
     */
    version: string

    /**
     * The module's entrypoint (package.main)
     */
    main: string

    /**
     * The entry point of the program (package.types, except with the .d.ts extension replaced with .ts)
     */
    entrypoint: string

    /**
     * jsii output directory
     */
    outdir: string

    /**
     * Dependencies bundled within this module
     */
    bundledDependencies: string[]

    /**
     * Mapping of language => module-name
     * For example, { "java": "com.amazonaws.cdk" }
     */
    names: { [language: string]: string }

    /**
     * Package npm dependencies (package.dependencies)
     */
    dependencies: { [name: string]: string }
}

export default async function readPackageMetadata(moduleDir: string): Promise<PackageMetadata> {
    const pkgFile = path.resolve(path.join(moduleDir, 'package.json'));

    let pkg: any = { };
    if (await fs.pathExists(pkgFile)) {
        pkg = await fs.readJson(pkgFile);
    }

    // defaults
    if (!pkg.name)    { pkg.name = path.basename(moduleDir); }
    if (!pkg.version) { pkg.version = '1.0.0'; }
    if (!pkg.types)   { pkg.types = 'index.d.ts'; }
    if (!pkg.jsii)    { pkg.jsii = { outdir: '.' }; }
    if (!pkg.main)    { pkg.main = 'index.js'; }

    if (!pkg.jsii.outdir) { throw new Error(`${pkgFile} must contain a "jsii.outdir" field`); }
    if (!pkg.types.endsWith('.d.ts')) {
        const quickFix = pkg.types.endsWith('.ts') ? `Fix this by setting "types" to "${pkg.types.replace(/\.ts$/, '.d.ts')}"`
                                                   : '';
        throw new Error(`${pkgFile} "types" field value must end with .d.ts, but "${pkg.types}" was provided. ${quickFix}`);
    }

    const main = path.join(moduleDir, pkg.main);
    const types = path.join(moduleDir, pkg.types);
    const outdir = path.resolve(moduleDir, pkg.jsii.outdir);

    if ('bundledDependencies' in pkg.jsii) {
        throw new Error(`"jsii.bundledDependencies" is deprecated. Use the normal "bundledDependencies" instead`);
    }

    return {
        name: pkg.name,
        version: pkg.version,
        outdir,
        main,
        dependencies: pkg.dependencies || {},
        bundledDependencies: pkg.bundledDependencies || [],
        names: pkg.jsii.names || {},
        entrypoint: types.replace(/\.d\.ts$/, '.ts')
    };
}
