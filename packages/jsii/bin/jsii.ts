import * as log4js from 'log4js';
import * as path from 'path';
import * as process from 'process';
import * as yargs from 'yargs';
import { Compiler } from '../lib/compiler';
import { loadProjectInfo } from '../lib/project-info';
import * as utils from '../lib/utils';
import { VERSION } from '../lib/version';
import { enabledWarnings } from '../lib/warnings';

const warningTypes = Object.keys(enabledWarnings);

(async () => {
  const argv = yargs
    .env('JSII')
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      desc: 'Watch for file changes and recompile automatically',
    })
    .option('verbose', {
      alias: 'v',
      type: 'count',
      desc: 'Increase the verbosity of output',
      global: true,
    })
    .option('project-references', {
      alias: 'r',
      type: 'boolean',
      desc:
        'Generate TypeScript project references (also [package.json].jsii.projectReferences)',
    })
    .option('fix-peer-dependencies', {
      type: 'boolean',
      default: true,
      desc:
        'Automatically add missing entries in the peerDependencies section of package.json',
    })
    .options('fail-on-warnings', {
      alias: 'Werr',
      type: 'boolean',
      desc: 'Treat warnings as errors',
    })
    .option('silence-warnings', {
      type: 'array',
      default: [],
      desc: `List of warnings to silence (warnings: ${warningTypes.join(',')})`,
    })
    .help()
    .version(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      `${VERSION}, typescript ${require('typescript/package.json').version}`,
    ).argv;

  _configureLog4js(argv.verbose);

  const projectRoot = path.normalize(
    path.resolve(process.cwd(), argv._[0] ?? '.'),
  );

  const projectInfo = await loadProjectInfo(projectRoot, {
    fixPeerDependencies: argv['fix-peer-dependencies'],
  });

  // disable all silenced warnings
  for (const key of argv['silence-warnings']) {
    if (!(key in enabledWarnings)) {
      throw new Error(
        `Unknown warning type ${key}. Must be one of: ${warningTypes}`,
      );
    }

    enabledWarnings[key] = false;
  }

  const compiler = new Compiler({
    projectInfo,
    projectReferences: argv['project-references'],
    failOnWarnings: argv['fail-on-warnings'],
  });

  const result = argv.watch ? compiler.watch() : compiler.emit();
  return { projectRoot, emitResult: await result };
})()
  .then(({ projectRoot, emitResult }) => {
    for (const diagnostic of emitResult.diagnostics) {
      utils.logDiagnostic(diagnostic, projectRoot);
    }
    if (emitResult.emitSkipped) {
      process.exit(1);
    }
  })
  .catch((e) => {
    console.error(`Error: ${e.stack}`);
    process.exit(-1);
  });

function _configureLog4js(verbosity: number) {
  log4js.configure({
    appenders: {
      console: {
        type: 'stderr',
        layout: { type: 'colored' },
      },
      [utils.DIAGNOSTICS]: {
        type: 'stdout',
        layout: { type: 'messagePassThrough' },
      },
    },
    categories: {
      default: { appenders: ['console'], level: _logLevel() },
      // The diagnostics logger must be set to INFO or more verbose, or watch won't show important messages
      [utils.DIAGNOSTICS]: {
        appenders: ['diagnostics'],
        level: _logLevel(Math.max(verbosity, 1)),
      },
    },
  });

  function _logLevel(verbosityLevel = verbosity): keyof log4js.Levels {
    switch (verbosityLevel) {
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
