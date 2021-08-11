import { Chalk, bgYellow, bgYellowBright, bgRed } from 'chalk';
import { error } from 'console';
import { version } from 'process';
import { Range, SemVer } from 'semver';

import {
  DEADLINE,
  DEADLINE_EPOCH_MS,
  SupportLevel,
  VERSION_SUPPORT,
} from './constants';

/**
 * Checks the current process' node runtime version against the release support
 * matrix, and issues a warning to STDERR if the current version is not fully
 * supported (i.e: it is deprecated, end-of-life, or untested).
 */
export function checkNode(): void {
  const runtimeVersion = new SemVer(version);
  let versionSupportLevel = SupportLevel.UNTESTED;
  for (const [rangeExpr, supportLevel] of Object.entries(VERSION_SUPPORT)) {
    const range = new Range(rangeExpr);
    if (range.test(runtimeVersion)) {
      versionSupportLevel = supportLevel;
      break;
    }
  }

  switch (versionSupportLevel) {
    case SupportLevel.DEPRECATED:
      const deadlinePast = Date.now() > DEADLINE_EPOCH_MS;
      veryVisibleMessage(
        deadlinePast ? bgRed.white.bold : bgYellowBright.black,
        `Node ${version} has reached end-of-life and will no longer be supported in new releases after ${DEADLINE}.`,
        `Please upgrade to a supported node version as soon as possible.`,
      );
      break;
    case SupportLevel.END_OF_LIFE:
      veryVisibleMessage(
        bgRed.white.bold,
        `Node ${version} has reached end-of-life and is not supported.`,
      );
      break;
    case SupportLevel.UNSUPPORTED:
      veryVisibleMessage(
        bgRed.white.bold,
        `Node ${version} is not supported. Early releases a node major often lack essential features of that line.`,
      );
      break;
    case SupportLevel.SUPPORTED:
      // Nothing to do
      break;
    case SupportLevel.UNTESTED:
      veryVisibleMessage(
        bgYellow.black,
        `This software has not been tested with node ${version}.`,
      );
      break;
  }

  function veryVisibleMessage(
    chalk: Chalk,
    message: string,
    callToAction = 'You may to encounter runtime issues, and should switch to a supported release.',
  ): void {
    const lines = [
      message,
      callToAction,
      '',
      'As of the current release, supported versions of node are:',
      ...Object.entries(VERSION_SUPPORT)
        .filter(([, supportLevel]) => supportLevel === SupportLevel.SUPPORTED)
        .map(([rangeExpr]) => `- ${rangeExpr}`),
    ];
    const len = Math.max(...lines.map((l) => l.length));
    const border = chalk('!'.repeat(len + 8));
    const spacer = chalk(`!!  ${' '.repeat(len)}  !!`);

    error(border);
    error(spacer);
    for (const line of lines) {
      error(chalk(`!!  ${line.padEnd(len, ' ')}  !!`));
    }
    error(spacer);
    error(border);
  }
}
