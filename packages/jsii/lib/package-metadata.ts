import * as fs from 'fs-extra';
import * as path from 'path';

// tslint:disable-next-line:no-var-requires
const spdxLicenceList = require('spdx-license-list');

export interface PackageMetadata {
    /**
     * Package name (package.name)
     */
    name: string

    /**
     * Description of the module
     */
    description: string;

    /**
     * The url to the project homepage.
     */
    homepage: string;

    /**
     * The author of the package.
     */
    author: Person;

    /**
     * Additional contributors
     */
    contributors?: Person[];

    /**
     * The module repository
     */
    repository: {
        /**
         * Type of repository.
         */
        type: string;

        /**
         * The URL of the repository.
         */
        url: string;
    };

    /**
     * Package version (package.version)
     */
    version: string

    /**
     * The SPDX license name for the package.
     */
    license: string;

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
     * Mapping of package manager => configuration
     * For example, { "mvn": { basePackage: "com.amazonaws.cdk", groupId: "com.amazonaws.cdk", artifactId: "core" } }
     */
    targets: { [name: string]: { [key: string]: any | undefined } };

    /**
     * Package npm dependencies (package.dependencies)
     */
    dependencies: { [name: string]: string }
}

/**
 * Information about a person involved with the project.
 */
export interface Person {
    /**
     * The name of the person
     */
    name: string;

    /**
     * The roles of the person.
     */
    roles: string[];

    /**
     * The email of the person.
     */
    email?: string;

    /**
     * The URL for the person.
     */
    url?: string;

    /**
     * Whether the person is an organization
     */
    organization?: boolean;
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

    if (!pkg.license) { throw new Error(`${pkgFile} must contain a "license" field (with an SPDX license identifier)`); }
    if (!(pkg.license in spdxLicenceList)) {
        throw new Error(`${pkgFile} has "license" ${pkg.license}, which doesn't appear to be a valid SPDX identifier`);
    }

    if (!pkg.repository || !pkg.repository.url) {
        throw new Error(`${pkgFile} must contain a "repository" field with "url"`);
    }
    if (!pkg.repository.type) {
        if (pkg.repository.url.startsWith('git:') || pkg.repository.url.indexOf('://github.com/') !== -1) {
            pkg.repository.type = 'git';
        } else {
            throw new Error(`${pkgFile} must specify the "repository.type" field (could not guess from ${pkg.repository.url})`);
        }
    }

    // Not validating presence of "roles", because we have smart defaults
    if (!pkg.author || !pkg.author.name) {
        throw new Error(`${pkgFile} must contain an "author" field with "name"`);
    }

    // Not validating presence of "roles", because we have smart defaults
    if (pkg.contributors) {
        if (!Array.isArray(pkg.contributors)) {
            throw new Error(`${pkgFile}'s "contributors" field must be an array`);
        }
        for (const contributor of pkg.contributors) {
            if (!contributor.name) {
                throw new Error(`All elements of the "contributors" field of ${pkgFile} must have a "name"`);
            }
        }
    }

    // default "description" to "name" and "homepage" to repo url
    if (!pkg.description) { pkg.description = pkg.name; }
    if (!pkg.homepage) { pkg.homepage = pkg.repository.url; }

    if (!pkg.jsii.outdir) { throw new Error(`${pkgFile} must contain a "jsii.outdir" field`); }
    if (!pkg.jsii.targets) { throw new Error(`${pkgFile} must contain a "jsii.targets" field`); }
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
        description: pkg.description,
        homepage: pkg.homepage,
        author: cleanPerson(pkg.author, 'author'),
        contributors: pkg.contributors && pkg.contributors.map((p: Person) => cleanPerson(p, 'contributor')),
        repository: pkg.repository,
        version: pkg.version,
        license: pkg.license,
        outdir,
        main,
        dependencies: pkg.dependencies || {},
        bundledDependencies: pkg.bundledDependencies || [],
        targets: pkg.jsii.targets || {},
        entrypoint: types.replace(/\.d\.ts$/, '.ts')
    };
}

/**
 * Ensures a ``Person`` instance does not have any additional fields, and that
 * the ``roles`` field (if set) contains no duplicates.
 *
 * @param person the person to be cleaned.
 *
 * @returns the cleaned up person.
 */
function cleanPerson(person: Person, defaultRole: string): Person {
    return {
        name: person.name,
        email: person.email,
        url: person.url,
        roles: (person.roles && [...new Set(person.roles)]) || [defaultRole],
        organization: person.organization
    };
}
