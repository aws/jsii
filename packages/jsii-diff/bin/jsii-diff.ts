import fs = require('fs-extra');
import reflect = require('jsii-reflect');
import spec = require('jsii-spec');
import log4js = require('log4js');
import yargs = require('yargs');
import { compareAssemblies } from '../lib';
import { Mismatches } from '../lib/types';
import { downloadNpmPackage } from '../lib/util';
import { VERSION } from '../lib/version';

const LOG = log4js.getLogger('jsii-diff');

async function main(): Promise<number> {
  const argv = yargs
      .env('JSII_DIFF')
      .option('verbose', { alias: 'v', type: 'count', desc: 'Increase the verbosity of output', global: true })
      .option('default-experimental', { alias: 'e', type: 'boolean', desc: 'Treat unmarked APIs as experimental', default: false })
      .usage('$0 <original> [updated]', 'Compare two JSII assemblies.', args => args
        .positional('original', {
          description: 'Original assembly (file, package or "npm:package@version")',
          type: 'string'
        })
        .positional('updated', {
          description: 'New assembly (file, package or "npm:package@version")',
          type: 'string',
          default: '.'
        })
      )
      .help()
      .version(VERSION)
      .argv;

  configureLog4js(argv.verbose);

  LOG.debug(`Loading original assembly from ${(argv as any).original}`);
  const original = await loadAssembly((argv as any).original);

  LOG.debug(`Loading updated assembly from ${(argv as any).updated}`);
  const updated = await loadAssembly((argv as any).updated);

  if (original.name !== updated.name) {
    process.stderr.write(`Look like different assemblies: '${original.name}' vs '${updated.name}'. Comparing is probably pointless...`);
  }

  const mismatches = new Mismatches();

  LOG.info(`Starting analysis`);
  compareAssemblies(original, updated, {
    mismatches,
    defaultExperimental: argv["default-experimental"],
  });

  LOG.info(`Found ${mismatches.count} issues`);

  if (mismatches.count > 0) {
    process.stderr.write(`Original assembly: ${original.name}@${original.version}\n`);
    process.stderr.write(`Updated assembly:  ${updated.name}@${updated.version}\n`);
    process.stderr.write(`API elements with incompatible changes:\n`);
    for (const msg of mismatches.messages()) {
      process.stderr.write(`- ${msg}\n`);
    }

    return 1;
  }

  return 0;
}

async function loadAssembly(name: string) {
  if (name.startsWith('npm:')) {
    let pkg = name.substring(4);
    if (!pkg) { pkg = await loadPackageNameFromAssembly(); }
    return await downloadNpmPackage(pkg, loadFromFilesystem);
  } else {
    return await loadFromFilesystem(name);
  }
}

async function loadPackageNameFromAssembly(): Promise<string> {
  const JSII_ASSEMBLY_FILE = '.jsii';
  if (!await fs.pathExists(JSII_ASSEMBLY_FILE)) {
    throw new Error(`No NPM package name given and no ${JSII_ASSEMBLY_FILE} file in the current directory. Please specify a package name.`);
  }
  const module = await fs.readJSON(JSII_ASSEMBLY_FILE, { encoding: 'utf-8' }) as spec.Assembly;
  if (!module.name) { throw new Error(`Could not find package in ${JSII_ASSEMBLY_FILE}`); }

  return module.name;
}

async function loadFromFilesystem(name: string) {
  const stat = await fs.stat(name);

  const ts = new reflect.TypeSystem();
  if (stat.isDirectory()) {
    return await ts.loadModule(name);
  } else {
    return await ts.loadFile(name, true);
  }
}

main().then(n => {
  process.exit(n);
}).catch(e => {
  // tslint:disable-next-line:no-console
  console.error(e);
  process.exit(100);
});

function configureLog4js(verbosity: number) {
    log4js.configure({
        appenders: {
            console: {
                type: 'stderr',
                layout: { type: 'colored' }
            },
        },
        categories: {
            default: { appenders: ['console'], level: _logLevel() },
        }
    });

    function _logLevel(): keyof log4js.Levels {
        switch (verbosity) {
        case 0: return 'WARN';
        case 1: return 'INFO';
        case 2: return 'DEBUG';
        case 3: return 'TRACE';
        default: return 'ALL';
        }
    }
}