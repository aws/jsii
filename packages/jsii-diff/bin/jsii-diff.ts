import '@jsii/check-node/run';

import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as reflect from 'jsii-reflect';
import * as log4js from 'log4js';
import * as yargs from 'yargs';

import { compareAssemblies } from '../lib';
import {
  classifyDiagnostics,
  treatAsError,
  formatDiagnostic,
  hasErrors,
  ErrorClass,
  ERROR_CLASSES,
} from '../lib/diagnostics';
import {
  DownloadFailure,
  downloadNpmPackage,
  showDownloadFailure,
} from '../lib/util';
import { VERSION } from '../lib/version';

const LOG = log4js.getLogger('jsii-diff');

const ASSEMBLY_SUPPORTED_FEATURES: spec.JsiiFeature[] = [
  'intersection-types',
  'class-covariant-overrides',
];

async function main(): Promise<number> {
  const argv = await yargs
    .env('JSII_DIFF')
    .option('verbose', {
      alias: 'v',
      type: 'count',
      desc: 'Increase the verbosity of output',
      global: true,
    })
    .option('default-stability', {
      alias: 's',
      type: 'string',
      choices: ['experimental', 'stable'],
      desc: 'Treat unmarked APIs as',
      default: 'stable',
    })
    .option('experimental-errors', {
      alias: 'e',
      type: 'boolean',
      default: false,
      desc: 'Error on experimental API changes',
      deprecate: 'Use `--error-on` instead',
    })
    .option('error-on', {
      type: 'string',
      default: 'prod',
      choices: ERROR_CLASSES,
      desc: 'Which type of API changes should be treated as an error',
    })
    .option('ignore-file', {
      alias: 'i',
      type: 'string',
      desc: 'Ignore API changes with keys from file (file may be missing)',
    })
    .option('keys', {
      alias: 'k',
      type: 'boolean',
      default: false,
      desc: 'Show diagnostic suppression keys',
    })
    .option('validate', {
      alias: 'd',
      type: 'boolean',
      default: false,
      desc: 'Validate the assemblies that are being loaded',
    })
    .usage('$0 <original> [updated]', 'Compare two JSII assemblies.', (args) =>
      args
        .positional('original', {
          description:
            'Original assembly (file, package or "npm:package@version")',
          type: 'string',
        })
        .positional('updated', {
          description: 'New assembly (file, package or "npm:package@version")',
          type: 'string',
          default: '.',
        }),
    )
    .help()
    .version(VERSION).argv;

  configureLog4js(argv.verbose);

  LOG.debug(`Loading original assembly from ${(argv as any).original}`);
  const loadOriginal = await loadAssembly((argv as any).original, argv);
  if (!loadOriginal.success) {
    process.stderr.write(
      `Could not load '${loadOriginal.resolved}': ${showDownloadFailure(
        loadOriginal.reason,
      )}. Skipping analysis\n`,
    );
    return 0;
  }

  LOG.debug(`Loading updated assembly from ${(argv as any).updated}`);
  const loadUpdated = await loadAssembly((argv as any).updated, argv);
  if (!loadUpdated.success) {
    process.stderr.write(
      `Could not load '${loadUpdated.resolved}': ${showDownloadFailure(
        loadUpdated.reason,
      )}. Skipping analysis\n`,
    );
    return 0;
  }

  const original = loadOriginal.assembly;
  const updated = loadUpdated.assembly;

  if (original.name !== updated.name) {
    process.stderr.write(
      `Look like different assemblies: '${original.name}' vs '${updated.name}'. Comparing is probably pointless...\n`,
    );
  }

  LOG.info('Starting analysis');
  const mismatches = compareAssemblies(original, updated, {
    defaultExperimental: argv['default-stability'] === 'experimental',
  });

  LOG.info(`Found ${mismatches.count} issues`);

  if (mismatches.count > 0) {
    const diags = classifyDiagnostics(
      mismatches,
      treatAsError(argv['error-on'] as ErrorClass, argv['experimental-errors']),
      await loadFilter(argv['ignore-file']),
    );

    process.stderr.write(
      `Original assembly: ${original.name}@${original.version}\n`,
    );
    process.stderr.write(
      `Updated assembly: ${updated.name}@${updated.version}\n`,
    );
    process.stderr.write('API elements with incompatible changes:\n');
    for (const diag of diags) {
      process.stderr.write(`${formatDiagnostic(diag, argv.keys)}\n`);
    }

    return hasErrors(diags) ? 1 : 0;
  }

  return 0;
}

// Allow both npm:<package> (legacy) and npm://<package> (looks better)
const NPM_REGEX = /^npm:(\/\/)?/;

interface LoadOptions {
  validate: boolean;
}

/**
 * Load the indicated assembly from the given name
 *
 * Supports downloading from NPM as well as from file or directory.
 */
async function loadAssembly(
  requested: string,
  options: LoadOptions,
): Promise<LoadAssemblyResult> {
  let resolved = requested;
  try {
    if (NPM_REGEX.exec(requested)) {
      let pkg = requested.replace(NPM_REGEX, '');
      if (!pkg) {
        pkg = await loadPackageNameFromAssembly(options);
      }

      resolved = `npm://${pkg}`;
      if (!pkg.includes('@', 1)) {
        resolved += '@latest';
      }

      const download = await downloadNpmPackage(pkg, (f) =>
        loadFromFilesystem(f, options),
      );
      if (download.success) {
        return {
          requested,
          resolved,
          success: true,
          assembly: download.result,
        };
      }
      return { requested, resolved, success: false, reason: download.reason };
    }
    // We don't accept failure loading from the filesystem
    return {
      requested,
      resolved,
      success: true,
      assembly: await loadFromFilesystem(requested, options),
    };
  } catch (e: any) {
    // Prepend information about which assembly we've failed to load
    //
    // Look at the type of error. If it has a lot of lines (like validation errors
    // tend to do) log everything to the debug log and only show a couple
    const maxLines = 3;
    const messageWithContext = `Error loading assembly '${resolved}': ${e.message}`;
    const errorLines = messageWithContext.split('\n');
    if (errorLines.length < maxLines) {
      throw new Error(messageWithContext);
    }
    for (const line of errorLines) {
      LOG.info(line);
    }
    throw new Error([...errorLines.slice(0, maxLines), '...'].join('\n'));
  }
}

type LoadAssemblyResult = { requested: string; resolved: string } & (
  | { success: true; assembly: reflect.Assembly }
  | { success: false; reason: DownloadFailure }
);

async function loadPackageNameFromAssembly(
  options: LoadOptions,
): Promise<string> {
  const JSII_ASSEMBLY_FILE = spec.SPEC_FILE_NAME;
  if (!(await fs.pathExists(JSII_ASSEMBLY_FILE))) {
    throw new Error(
      `No NPM package name given and no ${JSII_ASSEMBLY_FILE} file in the current directory. Please specify a package name.`,
    );
  }
  const contents = await fs.readJSON(JSII_ASSEMBLY_FILE, { encoding: 'utf-8' });
  const module = options.validate
    ? spec.validateAssembly(contents)
    : (contents as spec.Assembly);
  if (!module.name) {
    throw new Error(`Could not find package in ${JSII_ASSEMBLY_FILE}`);
  }

  return module.name;
}

async function loadFromFilesystem(name: string, options: LoadOptions) {
  const stat = await fs.stat(name);

  const ts = new reflect.TypeSystem();
  if (stat.isDirectory()) {
    return ts.loadModule(name, {
      ...options,
      supportedFeatures: ASSEMBLY_SUPPORTED_FEATURES,
    });
  }
  return ts.loadFile(name, {
    ...options,
    supportedFeatures: ASSEMBLY_SUPPORTED_FEATURES,
  });
}

main()
  .then((n) => {
    process.exit(n);
  })
  .catch((e) => {
    console.error(e);
    process.exit(100);
  });

function configureLog4js(verbosity: number) {
  log4js.configure({
    appenders: {
      console: {
        type: 'stderr',
        layout: { type: 'colored' },
      },
    },
    categories: {
      default: { appenders: ['console'], level: _logLevel() },
    },
  });

  function _logLevel(): keyof log4js.Levels {
    switch (verbosity) {
      case 0:
        return 'WARN';
      case 1:
        return 'INFO';
      case 2:
        return 'DEBUG';
      case 3:
        return 'TRACE';
      default:
        return 'ALL';
    }
  }
}

async function loadFilter(filterFilename?: string): Promise<Set<string>> {
  if (!filterFilename) {
    return new Set();
  }

  try {
    return new Set(
      (await fs.readFile(filterFilename, { encoding: 'utf-8' }))
        .split('\n')
        .map((x) => x.trim())
        .filter((x) => !x.startsWith('#')),
    );
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    LOG.debug(`No such file: ${filterFilename}`);
    return new Set();
  }
}
