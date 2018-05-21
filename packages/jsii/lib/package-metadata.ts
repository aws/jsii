import * as path from 'path'
import * as fs from 'fs-extra'

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
     * The module's types entrypoint (package.types)
     */
    types: string

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
    let pkgFile = path.resolve(path.join(moduleDir, 'package.json'));

    let pkg: any = { };
    if (await fs.pathExists(pkgFile)) {
        pkg = await fs.readJson(pkgFile);
    }

    // defaults
    if (!pkg.name)    pkg.name = path.basename(moduleDir);
    if (!pkg.version) pkg.version = '1.0.0';
    if (!pkg.types)   pkg.types = 'index.ts';
    if (!pkg.jsii)    pkg.jsii = { outdir: '.' };
    if (!pkg.main)    pkg.main = 'index.js';

    if (!pkg.jsii.outdir) throw new Error(pkgFile + ' must contain a "jsii.outdir" field');

    let main = path.join(moduleDir, pkg.main);
    let types = path.join(moduleDir, pkg.types);
    let outdir = path.resolve(moduleDir, pkg.jsii.outdir);

    return {
        name: pkg.name,
        version: pkg.version,
        outdir: outdir,
        main: main,
        types: types,
        dependencies: pkg.dependencies || {},
        bundledDependencies: pkg.jsii.bundledDependencies || [],
        names: pkg.jsii.names || {}
    }
}