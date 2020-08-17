#!/usr/bin/env node
import * as path from 'path';
import * as process from 'process';
import * as yargs from 'yargs';
import { Rosetta } from 'jsii-rosetta';
import * as logging from '../lib/logging';
import { Timers } from '../lib/timer';
import { VERSION_DESC } from '../lib/version';
import { findJsiiModules, updateAllNpmIgnores } from '../lib/npm-modules';
import { JsiiModule } from '../lib/packaging';
import { ALL_BUILDERS, TargetName } from '../lib/targets';

(async function main() {
  const argv = yargs
    .usage('Usage: jsii-pacmak [-t target,...] [-o outdir] [package-dir]')
    .env('JSII_PACMAK')
    .option('targets', {
      alias: ['target', 't'],
      type: 'array',
      desc: 'target languages for which to generate bindings',
      defaultDescription:
        'all targets defined in `package.json` will be generated',
      choices: Object.keys(ALL_BUILDERS),
      required: false,
    })
    .option('outdir', {
      alias: 'o',
      type: 'string',
      desc: 'directory where artifacts will be generated',
      defaultDescription: 'based on `jsii.output` in `package.json`',
      required: false,
    })
    .option('code-only', {
      alias: 'c',
      type: 'boolean',
      desc: 'generate code only (instead of building and packaging)',
      default: false,
    })
    .option('fingerprint', {
      type: 'boolean',
      desc:
        'attach a fingerprint to the generated artifacts, and skip generation if outdir contains artifacts that have a matching fingerprint',
      default: true,
    })
    .option('force', {
      alias: 'f',
      type: 'boolean',
      desc: 'force generation of new artifacts, even if the fingerprints match',
      default: false,
    })
    .option('force-subdirectory', {
      type: 'boolean',
      desc:
        'force generation into a target-named subdirectory, even in single-target mode',
      default: true,
    })
    .option('force-target', {
      type: 'boolean',
      desc:
        'force generation of the given targets, even if the source package.json doesnt declare it',
      default: false,
    })
    .option('recurse', {
      alias: 'R',
      type: 'boolean',
      desc: 'recursively generate and build all dependencies into `outdir`',
      default: false,
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desc: 'emit verbose build output',
      count: true,
      default: 0,
    })
    .option('clean', {
      type: 'boolean',
      desc: 'clean up temporary files upon success (use --no-clean to disable)',
      default: true,
    })
    .option('npmignore', {
      type: 'boolean',
      desc:
        'Auto-update .npmignore to exclude the output directory and include the .jsii file',
      default: true,
    })
    .option('rosetta-tablet', {
      type: 'string',
      desc:
        "Location of a jsii-rosetta tablet with sample translations (created using 'jsii-rosetta extract')",
    })
    .option('rosetta-translate-live', {
      type: 'boolean',
      desc:
        "Translate code samples on-the-fly if they can't be found in the samples tablet",
      default: true,
    })
    .option('parallel', {
      type: 'boolean',
      desc:
        'Generate all configured targets in parallel (disabling this might help if you encounter EMFILE errors)',
      default: true,
    })
    .version(VERSION_DESC)
    .strict().argv;

  logging.configure({ level: argv.verbose !== undefined ? argv.verbose : 0 });

  // Default to 4 threads in case of concurrency, good enough for most situations
  logging.debug('command line arguments:', argv);

  const timers = new Timers();

  const rosetta = new Rosetta({
    liveConversion: argv['rosetta-translate-live'],
  });
  if (argv['rosetta-tablet']) {
    await rosetta.loadTabletFromFile(argv['rosetta-tablet']);
  }

  const modulesToPackage = await findJsiiModules(argv._, argv.recurse);
  logging.info(`Found ${modulesToPackage.length} modules to package`);
  if (modulesToPackage.length === 0) {
    logging.warn('Nothing to do');
    return;
  }

  if (argv.outdir) {
    for (const module of modulesToPackage) {
      module.outputDirectory = path.resolve(argv.outdir);
    }
  } else if (argv.npmignore) {
    // if outdir is coming from package.json, verify it is excluded by .npmignore. if it is explicitly
    // defined via --out, don't perform this verification.
    await updateAllNpmIgnores(modulesToPackage);
  }

  await timers.recordAsync('npm pack', () => {
    logging.info('Packaging NPM bundles');
    return Promise.all(modulesToPackage.map((m) => m.npmPack()));
  });

  await timers.recordAsync('load jsii', () => {
    logging.info('Loading jsii assemblies and translations');
    return Promise.all(
      modulesToPackage.map(async (m) => {
        await m.load();
        await rosetta.addAssembly(m.assembly.spec, m.moduleDirectory);
      }),
    );
  });

  try {
    const requestedTargets = argv.targets?.map((t) => `${t}`);
    const targetSets = sliceTargets(
      modulesToPackage,
      requestedTargets,
      argv['force-target'],
    );

    if (targetSets.every((s) => s.modules.length === 0)) {
      throw new Error(
        `None of the requested packages had any targets to build for '${requestedTargets?.join(
          ', ',
        )}' (use --force-target to force)`,
      );
    }

    const perLanguageDirectory =
      targetSets.length > 1 || argv['force-subdirectory'];

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
          await timers.recordAsync(targetSet.targetType, () =>
            buildTargetsForLanguage(
              targetSet.targetType,
              targetSet.modules,
              perLanguageDirectory,
            ),
          );
          logging.info(`${targetSet.targetType} finished`);
        },
        { parallel: argv.parallel },
      ),
    );
  } finally {
    if (argv.clean) {
      logging.debug('Cleaning up');
      await timers.recordAsync('cleanup', () =>
        Promise.all(modulesToPackage.map((m) => m.cleanup())),
      );
    } else {
      logging.debug('Temporary directories retained (--no-clean)');
    }
  }

  logging.info(`Packaged. ${timers.display()}`);

  async function buildTargetsForLanguage(
    targetLanguage: string,
    modules: JsiiModule[],
    perLanguageDirectory: boolean,
  ) {
    // ``argv.target`` is guaranteed valid by ``yargs`` through the ``choices`` directive.
    const factory = ALL_BUILDERS[targetLanguage as TargetName];
    if (!factory) {
      throw new Error(`Unsupported target: '${targetLanguage}'`);
    }

    await factory(modules, {
      clean: argv.clean,
      codeOnly: argv['code-only'],
      rosetta,
      force: argv.force,
      fingerprint: argv.fingerprint,
      arguments: argv,
      languageSubdirectory: perLanguageDirectory,
    }).buildModules();
  }
})().catch((err) => {
  process.stderr.write(`${err.stack}\n`);
  process.exit(1);
});

/**
 * A set of packages (targets) translated into the same language
 */
interface TargetSet {
  targetType: string;
  modules: JsiiModule[];
}

function sliceTargets(
  modules: JsiiModule[],
  requestedTargets: string[] | undefined,
  force: boolean,
) {
  if (requestedTargets === undefined) {
    requestedTargets = allAvailableTargets(modules);
  }

  const ret = new Array<TargetSet>();
  for (const target of requestedTargets) {
    ret.push({
      targetType: target,
      modules: modules.filter(
        (m) => force || m.availableTargets.includes(target),
      ),
    });
  }

  return ret;
}

function allAvailableTargets(modules: JsiiModule[]) {
  const ret = new Set<string>();
  for (const module of modules) {
    for (const target of module.availableTargets) {
      ret.add(target);
    }
  }
  return Array.from(ret);
}

function describePackages(target: TargetSet) {
  if (target.modules.length > 0 && target.modules.length < 5) {
    return target.modules.map((m) => m.name).join(', ');
  }
  return `${target.modules.length} modules`;
}

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
            (error) => {
              throw error;
            },
          ),
    );
  }
  return result;
}
