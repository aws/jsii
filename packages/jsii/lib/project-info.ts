import * as spec from '@jsii/spec';
import { pathExistsSync, readJsonSync } from 'fs-extra';
import { join, resolve, dirname } from 'path';
import { Range } from 'semver';
import { intersect } from 'semver-intersect';
import * as ts from 'typescript';
import {
  JsonArray,
  JsonBoolean,
  JsonFile,
  JsonNode,
  JsonObject,
  JsonObjectProperty,
  JsonString,
} from './private/json';
import { validateLicense, validateStability } from './private/validators';
import { parsePerson, parseRepository } from './utils';
import { VERSION } from './version';

export interface ProjectInfoLoadOptions {
  readonly fixPeerDependencies?: boolean;
}

export class ProjectInfo {
  public static async load(
    projectRoot: string,
    _options: ProjectInfoLoadOptions = {},
  ): Promise<ProjectInfo> {
    const packageJson = await JsonFile.load(join(projectRoot, 'package.json'));
    if (packageJson.documents.length !== 1) {
      throw new Error(
        `Found ${packageJson.documents.length} documents in ${packageJson.filePath}, expected exactly 1.`,
      );
    }
    const metadata = packageJson.documents[0];
    if (!(metadata instanceof JsonObject)) {
      throw new Error(
        `Expected ${packageJson.filePath} to contain a JSON object, but found ${metadata.constructor.name}`,
      );
    }

    return new ProjectInfo(projectRoot, metadata);
  }

  private readonly _diagnostics: ts.Diagnostic[];

  public readonly deprecated?: string;
  public readonly description?: string;
  public readonly homepage?: string;
  public readonly license: string;
  public readonly main: string;
  public readonly name: string;
  public readonly stability?: spec.Stability;
  public readonly types: string;
  public readonly version: string;

  public readonly keywords?: readonly string[];

  public readonly repository: {
    readonly type: string;
    readonly url: string;
    readonly directory?: string;
  };

  public readonly author: spec.Person;
  public readonly contributors?: readonly spec.Person[];

  public readonly dependencies: { readonly [name: string]: string };
  public readonly devDependencies: { readonly [name: string]: string };
  public readonly peerDependencies: { readonly [name: string]: string };
  public readonly dependencyClosure: readonly spec.Assembly[];
  public readonly bundleDependencies: { readonly [name: string]: string };

  public readonly targets: spec.AssemblyTargets;
  public readonly metadata?: { readonly [name: string]: string };

  public readonly jsiiVersionFormat: 'short' | 'full';

  public readonly tsc?: ts.CompilerOptions;
  public readonly excludeTypescript?: readonly string[];

  /** @internal */
  public constructor(
    public readonly projectRoot: string,
    public readonly packageJson: JsonObject,
  ) {
    this._diagnostics = Array.from(packageJson.diagnostics);

    this.deprecated = packageJson.get('deprecated')?.map((prop) => {
      if (prop.value instanceof JsonString) {
        return prop.value.raw;
      } else if (prop.value instanceof JsonBoolean) {
        if (!prop.value.raw) return undefined;
        this._diagnostics.push(
          prop.value.diagnostic(
            `We recommend to set a deprecation message instead of 'true'`,
            ts.DiagnosticCategory.Warning,
          ),
        );
        return 'Deprecated';
      }
      this._diagnostics.push(
        prop.diagnostic(
          `Unsupported value (only boolean and string is allowed)`,
        ),
      );
      return undefined;
    });

    this.description = packageJson
      .get('description')
      ?.map(this.#stringValueOrDefault(undefined));

    this.homepage = packageJson
      .get('homepage')
      ?.map(this.#stringValueOrDefault(undefined));

    this.license = this.#requireStringProperty(
      packageJson,
      'license',
      'UNLICENSED',
      validateLicense,
    );

    this.main = this.#requireStringProperty(packageJson, 'main', 'index.js');

    this.name = this.#requireStringProperty(packageJson, 'name', 'No name');

    this.stability = packageJson.get('stability')?.map((prop) => {
      if (prop.value instanceof JsonString) {
        try {
          return validateStability(prop.value.raw);
        } catch (e) {
          this._diagnostics.push(prop.value.diagnostic(e.message ?? e.stack));
          return (prop.value.raw as any) as spec.Stability;
        }
      }
      this._diagnostics.push(
        prop.value.diagnostic(
          `Unsupported value (valid values are: ${Object.values(spec.Stability)
            .map((s) => `"${s}"`)
            .join(', ')})`,
        ),
      );
      return spec.Stability.Experimental;
    });

    this.types = this.#requireStringProperty(
      packageJson,
      'types',
      'index.d.ts',
    );

    this.version = this.#requireStringProperty(packageJson, 'version', '0.0.0');

    this.keywords = packageJson.get('keywords')?.map((prop) => {
      if (prop.value instanceof JsonArray) {
        return prop.value.elements
          .map((elt) => {
            if (elt instanceof JsonString) {
              return elt.raw;
            }
            this._diagnostics.push(
              elt.diagnostic(`Unsupported value (only string is allowed)`),
            );
            // Cheating invalid values out
            return (undefined as any) as string;
          })
          .filter((val) => val != null);
      }
      this._diagnostics.push(
        prop.value.diagnostic(`Unsupported value (only string[] is allowed)`),
      );
      return undefined;
    });

    this.author =
      packageJson.get('author')?.map((prop) => {
        return this.#extractPerson(prop.value, 'author');
      }) ?? this.#missingValueFor(packageJson, 'author', PHONY_PERSON);

    this.contributors = packageJson.get('contributors')?.map((prop) => {
      if (prop.value instanceof JsonArray) {
        return prop.value.elements.map((elt) =>
          this.#extractPerson(elt, 'contributor'),
        );
      }
      this._diagnostics.push(
        prop.value.diagnostic(`Unsupported value (only array is allowed)`),
      );
      return undefined;
    });

    this.repository =
      packageJson.get('repository')?.map((prop) => {
        if (prop.value instanceof JsonString) {
          try {
            return parseRepository(prop.value.raw);
          } catch (error) {
            this._diagnostics.push(
              prop.value.diagnostic(error.message ?? error.stack),
            );
            return PHONY_REPOSITORY;
          }
        }
        if (prop.value instanceof JsonObject) {
          return this.#extractRepository(prop.value);
        }
        this._diagnostics.push(
          prop.value.diagnostic(
            `Unsupported value (only string or object is allowed)`,
          ),
        );
        return PHONY_REPOSITORY;
      }) ?? this.#missingValueFor(packageJson, 'repository', PHONY_REPOSITORY);

    const jsiiConfigurationBlock = packageJson
      .get('jsii')
      ?.map(this.#extractObject);

    this.targets = {
      ...jsiiConfigurationBlock
        ?.get('targets')
        ?.map(this.#extractObject)
        ?.map((json) => json.raw),
      js: { npm: this.name },
    };

    this.metadata = jsiiConfigurationBlock
      ?.get('metadata')
      ?.map((prop) => prop.value.raw);

    this.jsiiVersionFormat =
      jsiiConfigurationBlock?.get('versionFormat')?.map((prop) => {
        if (prop.value instanceof JsonString) {
          if (prop.value.raw === 'full' || prop.value.raw === 'short') {
            return prop.value.raw;
          }
        }
        this._diagnostics.push(
          prop.value.diagnostic(
            `Unsupported value (only "full" and "short" are allowed)`,
          ),
        );
        return 'full';
      }) ?? 'full';

    this.excludeTypescript = jsiiConfigurationBlock
      ?.get('excludeTypescript')
      ?.map((prop) => {
        if (prop instanceof JsonArray) {
          return prop.elements
            ?.map((elt) => {
              if (elt instanceof JsonString) {
                return elt.raw;
              }
              this._diagnostics.push(
                elt.diagnostic(`Unsupported value (only string is allowed)`),
              );
              // Cheating bad values out
              return (undefined as any) as string;
            })
            .filter((val) => val != null);
        }
        this._diagnostics.push(
          prop.value.diagnostic(`Unsupported value (only string[] is allowed)`),
        );
        return undefined;
      });

    this.tsc = jsiiConfigurationBlock
      ?.get('tsc')
      ?.map((prop) => prop.value.raw);

    const dependencies = this.#validateDependencies(
      packageJson.get('devDependencies')?.map(this.#extractDependencies) ?? {},
      packageJson.get('dependencies')?.map(this.#extractDependencies) ?? {},
      packageJson.get('peerDependencies')?.map(this.#extractDependencies) ?? {},
      (
        packageJson.get('bundledDependencies') ??
        packageJson.get('bundleDependencies')
      )?.map((prop) => {
        if (!(prop.value instanceof JsonArray)) {
          this._diagnostics.push(
            prop.value.diagnostic(
              `Unsupported value (only string[] is allowed)`,
            ),
          );
          return undefined;
        }
        const result = new Array<JsonString>();
        for (const elt of prop.value.elements) {
          if (!(elt instanceof JsonString)) {
            this._diagnostics.push(
              elt.diagnostic(`Unsupported value (only string is allowed)`),
            );
            continue;
          }
          result.push(elt);
        }
        return result;
      }) ?? [],
    );

    this.dependencies = dependencies
      .filter((info) => info.isRuntime && !info.isBundled)
      .reduce((res, { name, version }) => {
        res[name] = version;
        return res;
      }, {} as Record<string, string>);
    this.devDependencies = dependencies
      .filter((info) => info.isDev && !info.isBundled)
      .reduce((res, { name, version }) => {
        res[name] = version;
        return res;
      }, {} as Record<string, string>);
    this.peerDependencies = dependencies
      .filter((info) => info.isPeer && !info.isBundled)
      .reduce((res, { name, version }) => {
        res[name] = version;
        return res;
      }, {} as Record<string, string>);
    this.bundleDependencies = dependencies
      .filter((info) => info.isBundled)
      .reduce((res, { name, version }) => {
        res[name] = version;
        return res;
      }, {} as Record<string, string>);

    this.dependencyClosure = new Array<spec.Assembly>().concat(
      ...dependencies
        .filter((dep) => !dep.isBundled && (dep.isRuntime || dep.isPeer))
        .map(this.#resolveAssembly),
    );
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return this._diagnostics;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #missingValueFor = <T>(
    obj: JsonObject,
    key: string,
    defaultValue: T,
  ): T => {
    this._diagnostics.push(
      obj.diagnostic(`Missing required entry for key "${key}"`),
    );
    return defaultValue;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #extractDependencies = (
    prop: JsonObjectProperty,
  ): ModeledDependencies => {
    if (prop.value instanceof JsonObject) {
      const result: ModeledDependencies = {};
      for (const entry of prop.value.properties) {
        const name = entry.name.text;
        const version = entry.map(this.#stringValueOrDefault('*'));
        result[name] = { prop: entry, version };
      }
      return result;
    }
    this._diagnostics.push(
      prop.value.diagnostic(`Unsupported value (only object is allowed)`),
    );
    return {};
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #extractObject = (
    prop: JsonObjectProperty,
  ): JsonObject | undefined => {
    if (prop.value instanceof JsonObject) {
      return prop.value;
    }
    this._diagnostics.push(
      prop.value.diagnostic(`Unsupported value (only object is allowed)`),
    );
    return undefined;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #stringValueOrDefault = <T extends string | undefined>(
    fallBackValue: T,
    validator?: (val: string) => T | never,
  ) => {
    return (prop: JsonObjectProperty) => {
      if (prop.value instanceof JsonString) {
        const text = prop.value.raw;
        try {
          return validator ? validator(text) : text;
        } catch (err) {
          this._diagnostics.push(
            prop.value.diagnostic(err.message ?? err.stack ?? 'Invalid value'),
          );
          return text;
        }
      }
      this._diagnostics.push(
        prop.value.diagnostic(`Unsupported value (only string is allowed)`),
      );
      return fallBackValue;
    };
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #extractPerson = (
    json: JsonNode,
    defaultRole: string,
  ): spec.Person => {
    if (json instanceof JsonString) {
      try {
        return {
          ...parsePerson(json.raw),
          roles: [defaultRole],
        };
      } catch (error) {
        this._diagnostics.push(json.diagnostic(error.message ?? error.stack));
        return {
          name: 'Invalid Name',
          roles: [defaultRole],
        };
      }
    }
    if (json instanceof JsonObject) {
      return this.#parsePerson(json, defaultRole);
    }
    this._diagnostics.push(
      json.diagnostic(`Unsupported value (only string and object are allowed)`),
    );
    return PHONY_PERSON;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #extractRepository = (json: JsonObject) => {
    for (const prop of json.properties) {
      if (!['type', 'url', 'directory'].includes(prop.name.text)) {
        this._diagnostics.push(
          prop.name.diagnostic(
            `This property is unexpected and will be ignored`,
            ts.DiagnosticCategory.Warning,
          ),
        );
      }
    }

    const url = this.#requireStringProperty(json, 'url', 'https://localhost/');
    const type =
      json.get('type')?.map(this.#stringValueOrDefault(undefined)) ??
      guessRepositoryType.call(this, url);
    const directory = json
      .get('directory')
      ?.map(this.#stringValueOrDefault(undefined));

    return { type, url, directory };

    function guessRepositoryType(this: ProjectInfo, url: string): string {
      if (url.endsWith('.git')) {
        return 'git';
      }
      const parts = /^([^:]+):\/\//.exec(url);
      if (parts?.[1] && parts[1] !== 'http' && parts[1] !== 'https') {
        this._diagnostics.push(
          json.diagnostic(
            `Guessed the repository.type value from repository.url: "${parts[1]}"`,
            ts.DiagnosticCategory.Message,
          ),
        );
        return parts[1];
      }
      this._diagnostics.push(
        json.diagnostic(
          `Could not guess the repository.type value from repository.url ("${url}"). Please specify it manually.`,
        ),
      );
      return 'unknown';
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #requireStringProperty = (
    obj: JsonObject,
    key: string,
    fallbackValue: string,
    validator?: (val: string) => string | never,
  ) =>
    obj.get(key)?.map(this.#stringValueOrDefault(fallbackValue, validator)) ??
    this.#missingValueFor(obj, key, fallbackValue);

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #parsePerson = (
    json: JsonObject,
    defaultRole: string,
  ): spec.Person => {
    for (const prop of json.properties) {
      if (
        !['name', 'email', 'roles', 'url', 'organization'].includes(
          prop.name.text,
        )
      ) {
        this._diagnostics.push(
          prop.name.diagnostic(
            `This property is unexpected and will be ignored`,
            ts.DiagnosticCategory.Warning,
          ),
        );
      }
    }

    const name = this.#requireStringProperty(json, 'name', 'No Name');
    const email = json.get('email')?.map(this.#stringValueOrDefault(undefined));
    const roles = json.get('roles')?.map((roleProp) => {
      if (roleProp.value instanceof JsonArray) {
        return roleProp.value.elements.map((elt) => {
          if (elt instanceof JsonString) {
            return elt.raw;
          }
          this._diagnostics.push(
            elt.diagnostic(`Unsupported value (only string is allowed)`),
          );
          return 'invalid';
        });
      }
      this._diagnostics.push(
        roleProp.value.diagnostic(
          `Unsupported value (only string[] is allowed)`,
        ),
      );
      return [defaultRole];
    }) ?? [defaultRole];
    const organization = json.get('organization')?.map((orgProp) => {
      if (orgProp.value instanceof JsonBoolean) {
        return orgProp.value.raw;
      }
      this._diagnostics.push(
        orgProp.value.diagnostic(
          `A boolean value was expected. This will be interpreted as "true".`,
          ts.DiagnosticCategory.Warning,
        ),
      );
      return true;
    });
    const url = json.get('url')?.map(this.#stringValueOrDefault(undefined));
    return { name, roles, email, organization, url };
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #validateDependencies = (
    devDeps: ModeledDependencies,
    runtimeDeps: ModeledDependencies,
    peerDeps: ModeledDependencies,
    bundledDependencies: readonly JsonString[],
  ) => {
    const result = new Array<AssemblyDependency>();
    for (const [name, { bundled, dev, runtime, peer }] of Object.entries(
      allDependencies(this.projectRoot),
    )) {
      if (bundled != null) {
        if (peer) {
          this._diagnostics.push(
            bundled.diagnostic(
              `This is also declared as a peer dependency`,
              ts.DiagnosticCategory.Warning,
              peer.prop.name.diagnostic(
                `This is where the peer dependency is declared`,
                ts.DiagnosticCategory.Message,
              ),
            ),
          );
        }
        if (runtime) {
          this._diagnostics.push(
            bundled.diagnostic(
              `This is also declared as a runtime dependency. Declare a devDependency instead.`,
              ts.DiagnosticCategory.Warning,
              runtime.prop.name.diagnostic(
                `This is where the runtime dependency is declared`,
                ts.DiagnosticCategory.Message,
              ),
            ),
          );
        } else if (!dev) {
          this._diagnostics.push(
            bundled.diagnostic(
              `Bundled dependencies must also be declared as devDependencies.`,
              ts.DiagnosticCategory.Error,
            ),
          );
        }
      } else if (runtime != null && peer == null) {
        this._diagnostics.push(
          runtime.prop.name.diagnostic(
            `Runtime dependencies should also be peer dependencies.`,
            ts.DiagnosticCategory.Warning,
          ),
        );
      } else if (
        runtime != null &&
        peer != null &&
        runtime.version !== peer.version
      ) {
        this._diagnostics.push(
          runtime.prop.value.diagnostic(
            `The peer dependency declares a different version range: ${peer.version}`,
            ts.DiagnosticCategory.Warning,
            peer.prop.diagnostic(
              `The other range is declared here`,
              ts.DiagnosticCategory.Message,
            ),
          ),
        );
      }
      if (dev != null && (runtime != null || peer != null)) {
        this._diagnostics.push(
          dev.prop.name.diagnostic(
            `This development dependency is redundant (it is also declared as a runtime and/or peer dependency)`,
            ts.DiagnosticCategory.Warning,
            ...[
              ...(runtime
                ? [
                    runtime.prop.name.diagnostic(
                      `It's declared as a runtime dependency here`,
                      ts.DiagnosticCategory.Message,
                    ),
                  ]
                : []),
              ...(peer
                ? [
                    peer.prop.name.diagnostic(
                      `It's declared as a peer dependency here`,
                      ts.DiagnosticCategory.Message,
                    ),
                  ]
                : []),
            ],
          ),
        );
      }

      const { version, pathOverride } = this.#determineVersion(
        dev,
        runtime,
        peer,
      );
      result.push({
        name,
        anchor: peer?.prop ?? runtime?.prop ?? dev?.prop ?? bundled!,
        isBundled: bundled != null,
        isDev: dev != null,
        isPeer: peer != null,
        isRuntime: runtime != null,
        version,
        pathOverride,
        semver: new Range(version),
      });
    }

    return result;

    function allDependencies(projectRoot: string) {
      const result: Record<
        string,
        {
          bundled?: JsonString;
          dev?: ResolvedDependency;
          runtime?: ResolvedDependency;
          peer?: ResolvedDependency;
        }
      > = {};
      for (const bundled of bundledDependencies) {
        result[bundled.raw] = { bundled };
      }
      for (const [name, value] of Object.entries(devDeps)) {
        result[name] = result[name] ?? {};
        const { version: resolved, pathOverride } = resolveVersion(
          value.version,
          projectRoot,
        );
        result[name].dev = {
          ...value,
          resolved,
          pathOverride,
        };
      }
      for (const [name, value] of Object.entries(runtimeDeps)) {
        result[name] = result[name] ?? {};
        const { version: resolved, pathOverride } = resolveVersion(
          value.version,
          projectRoot,
        );
        result[name].runtime = {
          ...value,
          resolved,
          pathOverride,
        };
      }
      for (const [name, value] of Object.entries(peerDeps)) {
        result[name] = result[name] ?? {};
        const { version: resolved, pathOverride } = resolveVersion(
          value.version,
          projectRoot,
        );
        result[name].peer = {
          ...value,
          resolved,
          pathOverride,
        };
      }
      return result;
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #determineVersion = (
    ...candidates: Array<ResolvedDependency | undefined>
  ): { version: string; pathOverride?: string } => {
    const store: Record<string, ResolvedDependency[]> = {};
    let pathOverride: string | undefined;
    for (const candidate of candidates) {
      if (candidate == null) {
        continue;
      }
      store[candidate.resolved] = store[candidate.resolved] ?? [];
      store[candidate.resolved].push(candidate);
      pathOverride = pathOverride ?? candidate.pathOverride;
    }

    const versions = Object.keys(store);
    if (versions.length === 1) {
      // All candidates resolve to the exact same version!
      return { version: versions[0], pathOverride };
    } else if (versions.length > 1) {
      // Uh-ho, we have multiple candidates...
      try {
        // Happy case, there is an intersection to these requirements and we can use it.
        return { version: intersect(...versions), pathOverride };
      } catch {
        // Sad case, there is no intersection, so we'll report an error and return '*'.
        const [first, ...rest] = versions;
        store[first][0].prop.value.diagnostic(
          `This requirement is incomatible with other declarations (${rest.join(
            ', ',
          )})`,
          ts.DiagnosticCategory.Error,
          ...rest.map((ver) =>
            store[ver][0].prop.value.diagnostic(
              `Another requirement is declared here`,
              ts.DiagnosticCategory.Message,
            ),
          ),
        );
      }
    }

    return { version: '*', pathOverride };
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #resolveAssembly = (dep: AssemblyDependency): spec.Assembly[] => {
    return Array.from(
      loadAssemblyClosure.call(this, dep.name, dep.semver, this.projectRoot),
    );

    function* loadAssemblyClosure(
      this: ProjectInfo,
      name: string,
      semver: Range,
      searchPath: string,
      ...chain: string[]
    ): Generator<spec.Assembly, void, unknown> {
      const thisThing =
        chain.length === 0
          ? 'this dependency'
          : `the transitive dependency ${chain.join('->')}->${name}`;

      const modPath = resolveModule();
      if (modPath == null) {
        this._diagnostics.push(
          dep.anchor.diagnostic(
            `Unable to resolve the node package for ${thisThing} from ${searchPath}`,
          ),
        );
        yield { ...PHONY_ASSEMBLY, name, version: semver.raw };
        return;
      }
      const assmPath = join(modPath, spec.SPEC_FILE_NAME);
      if (!pathExistsSync(assmPath)) {
        this._diagnostics.push(
          dep.anchor.diagnostic(
            `Unable to find the .jsii assembly for ${thisThing}. Expected to find it at ${assmPath}`,
          ),
        );
        yield { ...PHONY_ASSEMBLY, name, version: semver.raw };
        return;
      }
      const rawAssm = readJsonSync(assmPath);
      try {
        const assm = spec.validateAssembly(rawAssm);
        if (!semver.intersects(new Range(assm.version))) {
          this._diagnostics.push(
            dep.anchor.diagnostic(
              `The .jsii assembly for ${thisThing} has version ${assm.version}, which is incompatible with the requirement of ${semver.raw}`,
            ),
          );
        }
        yield assm;
        for (const [transDep, transVer] of Object.entries(
          assm.dependencies ?? {},
        )) {
          for (const transAssm of loadAssemblyClosure.call(
            this,
            transDep,
            new Range(transVer),
            modPath,
            ...chain,
            name,
          )) {
            yield transAssm;
          }
        }
      } catch (err) {
        this._diagnostics.push(
          dep.anchor.diagnostic(
            `Invalid .jsii assembly found for ${thisThing}: ${
              err.message ?? err.stack
            }`,
          ),
        );
        yield rawAssm as spec.Assembly;
      }
      return;

      function resolveModule() {
        if (dep.pathOverride) {
          return resolve(searchPath, dep.pathOverride);
        }
        const paths = [searchPath, join(searchPath, 'node_modules')];
        try {
          return dirname(
            require.resolve(join(name, 'package.json'), { paths }),
          );
        } catch {
          return undefined;
        }
      }
    }
  };
}

type ModeledDependencies = Record<string, ModeledDependency>;
type ModeledDependency = { prop: JsonObjectProperty; version: string };
type ResolvedDependency = ModeledDependency & {
  resolved: string;
  pathOverride?: string;
};
type AssemblyDependency = {
  anchor: JsonNode;
  name: string;
  version: string;
  semver: Range;
  isPeer: boolean;
  isRuntime: boolean;
  isDev: boolean;
  isBundled: boolean;
  pathOverride: string | undefined;
};

const PHONY_PERSON = {
  name: 'Invalid or missing configuration',
  roles: ['invalid'],
};
const PHONY_REPOSITORY = {
  type: 'invalid',
  url: 'http://localhost/',
  directory: undefined,
};
const PHONY_ASSEMBLY: spec.Assembly = {
  schema: spec.SchemaVersion.LATEST,
  name: 'not-found',
  version: '*',
  jsiiVersion: VERSION,
  description: 'This assembly could not be found',
  license: 'UNLICENSED',
  homepage: 'https://localhost/',
  repository: PHONY_REPOSITORY,
  author: PHONY_PERSON,
  fingerprint: '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
};

function resolveVersion(
  str: string,
  searchPath: string,
): { version: string; pathOverride?: string } {
  const matches = /^file:(.+)$/.exec(str);
  if (matches == null) {
    return { version: str };
  }
  const localPackage = resolve(searchPath, matches[1]);

  // Rendering as a caret version to maintain uniformity against the "standard".
  return {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    version: `^${require(join(localPackage, 'package.json')).version}`,
    pathOverride: localPackage,
  };
}
