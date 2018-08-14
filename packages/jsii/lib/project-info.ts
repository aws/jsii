import fs = require('fs-extra');
import spec = require('jsii-spec');
import log4js = require('log4js');
import path = require('path');
import semver = require('semver');

// tslint:disable:no-var-requires Modules without TypeScript definitions
const spdx: Set<string> = require('spdx-license-list/simple');
// tslint:enable:no-var-requires

const LOG = log4js.getLogger('jsii/package-info');

export interface ProjectInfo {
    readonly projectRoot: string;

    readonly name: string;
    readonly version: string;
    readonly author: spec.Person;
    readonly license: string;
    readonly repository: {
        readonly type: string;
        readonly url: string;
    };

    readonly main: string;
    readonly types: string;

    readonly dependencies: ReadonlyArray<spec.Assembly>;
    readonly transitiveDependencies: ReadonlyArray<spec.Assembly>;
    readonly bundleDependencies: { readonly [name: string]: string };
    readonly targets: spec.AssemblyTargets;
    readonly description?: string;
    readonly homepage?: string;
    readonly contributors?: ReadonlyArray<spec.Person>;
}

export async function loadProjectInfo(projectRoot: string): Promise<ProjectInfo> {
    const pkg = require(path.join(projectRoot, 'package.json'));

    const bundleDependencies: { [name: string]: string } = {};
    (pkg.bundleDependencies || pkg.bundledDependencies || []).forEach((name: string) => {
        const version = pkg.dependencies[name];
        if (!version) {
            throw new Error(`The "package.json" has "${name}" in "bundleDependencies", but it is not declared in "dependencies"`);
        }
        bundleDependencies[name] = version;
    });

    const [dependencies, transitiveDependencies] =
            await _loadDependencies(pkg.dependencies, projectRoot, new Set<string>(Object.keys(bundleDependencies)));

    return {
        projectRoot,

        name: _required(pkg.name, 'The "package.json" file must specify the "name" attribute'),
        version: _required(pkg.version, 'The "package.json" file must specify the "version" attribute'),
        author: _toPerson(_required(pkg.author, 'The "package.json" file must specify the "author" attribute'), 'author'),
        repository: {
            url: _required(pkg.repository.url, 'The "package.json" file must specify the "repository.url" attribute'),
            type: pkg.repository.type || _guessRepositoryType(pkg.repository.url)
        },
        license: _validateLicense(pkg.license),

        main: _required(pkg.main, 'The "package.json" file must specify the "main" attribute'),
        types: _required(pkg.types, 'The "package.json" file must specify the "types" attribute'),

        dependencies,
        transitiveDependencies,
        bundleDependencies,
        targets: {
            ..._required(pkg.jsii, 'The "package.json" file must specify the "jsii" attribute').targets,
            js: { npm: pkg.name }
        },

        description: pkg.description,
        homepage: pkg.homepage,
        contributors: pkg.contributors
            && (pkg.contributors as any[]).map((contrib, index) => _toPerson(contrib, `contributors[${index}]`, 'contributor'))
    };
}

function _guessRepositoryType(url: string): string {
    if (url.endsWith('.git')) { return 'git'; }
    const parts = url.match(/^([^:]+):\/\//);
    if (parts && parts[1] !== 'http' && parts[1] !== 'https') {
        return parts[1];
    }
    throw new Error(`The "package.json" file must specify the "repository.type" attribute (could not guess from ${url})`);
}

async function _loadDependencies(dependencies: { [name: string]: string | spec.PackageVersion } | undefined,
                                 searchPath: string,
                                 bundled: Set<string> = new Set()): Promise<[spec.Assembly[], spec.Assembly[]]> {
    if (!dependencies) { return [[], []]; }
    const assemblies = new Array<spec.Assembly>();
    const transitiveAssemblies = new Array<spec.Assembly>();
    for (const name of Object.keys(dependencies)) {
        if (bundled.has(name)) { continue; }
        const dep = dependencies[name];
        const versionString = typeof dep === 'string' ? dep : dep.version;
        const version = new semver.Range(versionString);
        if (!version) {
            throw new Error(`Invalid semver expression for ${name}: ${versionString}`);
        }
        const pkg = _tryResolve(path.join(name, '.jsii'), searchPath);
        LOG.debug(`Resolved dependency ${name} to ${pkg}`);
        const assm = spec.validateAssembly(await fs.readJson(pkg));
        if (!version.intersects(new semver.Range(assm.version))) {
            throw new Error(`Declared dependency on version ${versionString} of ${name}, but version ${assm.version} was found`);
        }
        assemblies.push(assm);
        transitiveAssemblies.push(assm);
        const pkgDir = path.dirname(pkg);
        if (assm.dependencies) {
            const [depAssemblies, depTransitiveAssemblies, ] = await _loadDependencies(assm.dependencies, pkgDir);
            for (const depAssembly of depAssemblies.concat(depTransitiveAssemblies)) {
                if (transitiveAssemblies.find(a => a.name === depAssembly.name) != null) { continue; }
                transitiveAssemblies.push(depAssembly);
            }
        }
    }
    return [assemblies, transitiveAssemblies];
}

function _required<T>(value: T, message: string): T {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}

function _toPerson(value: any, field: string, defaultRole: string = field): spec.Person {
    return {
        name: _required(value.name, `The "package.json" file must specify the "${field}.name" attribute`),
        roles: value.roles ? [...new Set(value.roles as string[])] : [defaultRole],
        email: value.email,
        url: value.url,
        organization: value.organization ? value.organization : undefined
    };
}

function _tryResolve(mod: string, searchPath: string): string {
    try {
        return require.resolve(mod, { paths: [searchPath] });
    } catch (e) {
        throw new Error(`Unable to locate module: ${mod}`);
    }
}

function _validateLicense(id: string): string {
    if (id === 'UNLICENSED') { return id; }
    if (!spdx.has(id)) {
        throw new Error(`Invalid license identifier "${id}", see valid license identifiers at https://spdx.org/licenses/`);
    }
    return id;
}
