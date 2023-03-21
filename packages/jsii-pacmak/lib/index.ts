import { TypeSystem } from 'jsii-reflect';
import { Rosetta, UnknownSnippetMode } from 'jsii-rosetta';
import { resolve } from 'path';
import { cwd } from 'process';

import * as logging from './logging';
import { findJsiiModules, updateAllNpmIgnores } from './npm-modules';
import { JsiiModule } from './packaging';
import { ALL_BUILDERS, TargetName } from './targets';
import { Timers } from './timer';
import { Toposorted } from './toposort';
import { flatten } from './util';

//#region Exported APIs

export { TargetName };
export { configure as configureLogging } from './logging';

/**
 * Generates code in the desired targets.
 */
export async function pacmak({
  argv = {},
  clean = true,
  codeOnly = false,
  fingerprint = true,
  force = false,
  forceSubdirectory = true,
  forceTarget = false,
  inputDirectories,
  outputDirectory,
  parallel = true,
  recurse = false,
  rosettaTablet,
  rosettaUnknownSnippets = undefined,
  runtimeTypeChecking = true,
  targets = Object.values(TargetName),
  timers = new Timers(),
  updateNpmIgnoreFiles = false,
  validateAssemblies = false,
}: PacmakOptions): Promise<void> {
  const rosetta = new Rosetta({
    unknownSnippets: rosettaUnknownSnippets,
    prefixDisclaimer: true,
  });
  if (rosettaTablet) {
    await rosetta.loadTabletFromFile(rosettaTablet);
  }

  const modulesToPackageSorted = await findJsiiModules(
    inputDirectories,
    recurse,
  );
  const modulesToPackageFlat = flatten(modulesToPackageSorted);

  logging.info(`Found ${modulesToPackageFlat.length} modules to package`);
  if (modulesToPackageFlat.length === 0) {
    logging.warn('Nothing to do');
    return;
  }

  if (outputDirectory) {
    // Ensure this is consistently interpreted as relative to cwd(). This is transparent for absolute
    // paths, as those would be returned unmodified.
    const absoluteOutputDirectory = resolve(cwd(), outputDirectory);
    for (const mod of modulesToPackageFlat) {
      mod.outputDirectory = absoluteOutputDirectory;
    }
  } else if (updateNpmIgnoreFiles) {
    // if outdir is coming from package.json, verify it is excluded by .npmignore. if it is explicitly
    // defined via --out, don't perform this verification.
    await updateAllNpmIgnores(modulesToPackageFlat);
  }

  await timers.recordAsync('npm pack', () => {
    logging.info('Packaging NPM bundles');
    return Promise.all(
      modulesToPackageFlat.map((m) => m.npmPack(argv['pack-command'])),
    );
  });

  await timers.recordAsync('load jsii', () => {
    logging.info('Loading jsii assemblies and translations');
    const system = new TypeSystem();
    return Promise.all(
      modulesToPackageFlat.map(async (m) => {
        await m.load(system, validateAssemblies);
        return rosetta.addAssembly(m.assembly.spec, m.moduleDirectory);
      }),
    );
  });

  try {
    const targetSets = sliceTargets(
      modulesToPackageSorted,
      targets,
      forceTarget,
    );
    if (targetSets.every((s) => s.modulesSorted.length === 0)) {
      throw new Error(
        `None of the requested packages had any targets to build for '${targets.join(
          ', ',
        )}' (use --force-target to force)`,
      );
    }

    const perLanguageDirectory = targetSets.length > 1 || forceSubdirectory;

    // We run all target sets in parallel for minimal wall clock time
    await Promise.all(
      mapParallelOrSerial(
        targetSets,
        async (targetSet) => {
          logging.info(
            `Packaging '${targetSet.targetType}' for ${describePackages(
              targetSet,
            )}`,
          );
          return timers
            .recordAsync(targetSet.targetType, () =>
              buildTargetsForLanguage(
                targetSet.targetType,
                targetSet.modulesSorted,
                {
                  argv,
                  clean,
                  codeOnly,
                  fingerprint,
                  force,
                  perLanguageDirectory,
                  rosetta,
                  runtimeTypeChecking,
                },
              ),
            )
            .then(
              () => logging.info(`${targetSet.targetType} finished`),
              (err) => {
                logging.warn(`${targetSet.targetType} failed`);
                return Promise.reject(err);
              },
            );
        },
        { parallel },
      ),
    );
  } finally {
    if (clean) {
      logging.debug('Cleaning up');
      await timers.recordAsync('cleanup', () =>
        Promise.all(modulesToPackageFlat.map((m) => m.cleanup())),
      );
    } else {
      logging.info('Temporary directories retained (--no-clean)');
    }
  }

  logging.info(`Packaged. ${timers.display()}`);
}

/**
 * Options provided to the `pacmak` function.
 */
export interface PacmakOptions {
  /**
   * All command-line arguments that were provided. This includes target-specific parameters, the
   * handling of which is up to the code generators.
   *
   * @default {}
   */
  readonly argv?: { readonly [name: string]: any };

  /**
   * Whether to clean up temporary directories upon completion.
   *
   * @default true
   */
  readonly clean?: boolean;

  /**
   * Whether to generate source code only (as opposed to built packages).
   *
   * @default false
   */
  readonly codeOnly?: boolean;

  /**
   * Whether to opportunistically include a fingerprint in generated code, to avoid re-generating
   * code if the source assembly has not changed.
   *
   * @default true
   */
  readonly fingerprint?: boolean;

  /**
   * Whether to always re-generate code, even if the fingerprint has not changed.
   *
   * @default false
   */
  readonly force?: boolean;

  /**
   * Always emit code in a per-language subdirectory, even if there is only one target language.
   *
   * @default true
   */
  readonly forceSubdirectory?: boolean;

  /**
   * Always try to generate code for the selected targets, even if those are not configured. Use this option at your own
   * risk, as there are significant chances code generators cannot operate without any configuration.
   *
   * @default false
   */
  readonly forceTarget?: boolean;

  /**
   * The list of directories to be considered for input assemblies.
   */
  readonly inputDirectories: readonly string[];

  /**
   * The directory in which to output generated packages or code (if  `codeOnly` is `true`).
   *
   * @default - Configured in `package.json`
   */
  readonly outputDirectory?: string;

  /**
   * Whether to parallelize code generation. Turning this to `false` can be beneficial in certain resource-constrained
   * environments, such as free CI/CD offerings, as it reduces the pressure on IO.
   *
   * @default true
   */
  readonly parallel?: boolean;

  /**
   * Whether to recursively generate for the selected packages' dependencies.
   *
   * @default false
   */
  readonly recurse?: boolean;

  /**
   * How rosetta should treat snippets that cannot be loaded from a translation tablet.
   *
   * @default UnknownSnippetMode.VERBATIM
   */
  readonly rosettaUnknownSnippets?: UnknownSnippetMode;

  /**
   * A Rosetta tablet file where translations for code examples can be found.
   *
   * @default undefined
   */
  readonly rosettaTablet?: string;

  /**
   * Whether to inject runtime type checks in places where compile-time type checking is not performed.
   *
   * @default true
   */
  readonly runtimeTypeChecking?: boolean;

  /**
   * The list of targets for which code should be generated. Unless `forceTarget` is `true`, a given target will only
   * be generated for assemblies that have configured it.
   *
   * @default Object.values(TargetName)
   */
  readonly targets?: readonly TargetName[];

  /**
   * A `Timers` object, if you are interested in including the rosetta run in a larger set of timed operations.
   */
  readonly timers?: Timers;

  /**
   * Whether to update .npmignore files if `outputDirectory` comes from the `package.json` files.
   *
   * @default false
   */
  readonly updateNpmIgnoreFiles?: boolean;

  /**
   * Whether assemblies should be validated or not. Validation can be expensive and can be skipped if the assemblies
   * can be assumed to be valid.
   *
   * @default false
   */
  readonly validateAssemblies?: boolean;
}

//#endregion

//#region Building

async function buildTargetsForLanguage(
  targetLanguage: string,
  modules: Toposorted<JsiiModule>,
  {
    argv,
    clean,
    codeOnly,
    fingerprint,
    force,
    perLanguageDirectory,
    rosetta,
    runtimeTypeChecking,
  }: {
    argv: { readonly [name: string]: any };
    clean: boolean;
    codeOnly: boolean;
    fingerprint: boolean;
    force: boolean;
    perLanguageDirectory: boolean;
    rosetta: Rosetta;
    runtimeTypeChecking: boolean;
  },
): Promise<void> {
  // ``argv.target`` is guaranteed valid by ``yargs`` through the ``choices`` directive.
  const factory = ALL_BUILDERS[targetLanguage as TargetName];
  if (!factory) {
    throw new Error(`Unsupported target: '${targetLanguage}'`);
  }

  return factory(modules, {
    arguments: argv,
    clean: clean,
    codeOnly: codeOnly,
    fingerprint: fingerprint,
    force: force,
    languageSubdirectory: perLanguageDirectory,
    rosetta,
    runtimeTypeChecking,
  }).buildModules();
}

//#endregion

//#region Target Slicing

/**
 * A set of packages (targets) translated into the same language
 */
interface TargetSet {
  targetType: string;

  // Sorted into toposorted tranches
  modulesSorted: Toposorted<JsiiModule>;
}

function sliceTargets(
  modulesSorted: Toposorted<JsiiModule>,
  requestedTargets: readonly TargetName[],
  force: boolean,
): readonly TargetSet[] {
  const ret = new Array<TargetSet>();
  for (const target of requestedTargets) {
    ret.push({
      targetType: target,
      modulesSorted: modulesSorted
        .map((modules) =>
          modules.filter((m) => force || m.availableTargets.includes(target)),
        )
        .filter((ms) => ms.length > 0),
    });
  }
  return ret;
}

//#endregion

//#region Parallelization

function mapParallelOrSerial<T, R>(
  collection: readonly T[],
  mapper: (item: T) => Promise<R>,
  { parallel }: { parallel: boolean },
): Array<Promise<R>> {
  const result = new Array<Promise<R>>();
  for (const item of collection) {
    result.push(
      result.length === 0 || parallel
        ? // Running parallel, or first element
          mapper(item)
        : // Wait for the previous promise, then make the next one
          result[result.length - 1].then(
            () => mapper(item),
            (error) => Promise.reject(error),
          ),
    );
  }
  return result;
}

//#endregion

//#region Misc. Utilities

function describePackages(target: TargetSet) {
  const modules = flatten(target.modulesSorted);
  if (modules.length > 0 && modules.length < 5) {
    return modules.map((m) => m.name).join(', ');
  }
  return `${modules.length} modules`;
}

//#endregion
