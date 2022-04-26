import { Chalk, bgYellow, bgYellowBright, bgRed } from 'chalk';
import { error } from 'console';
import { version } from 'process';

import { NodeRelease } from './constants';

/**
 * Checks the current process' node runtime version against the release support
 * matrix, and issues a warning to STDERR if the current version is not fully
 * supported (i.e: it is deprecated, end-of-life, or untested).
 */
export function checkNode(): void {
  const { nodeRelease, knownBroken } = NodeRelease.forThisRuntime();

  if (nodeRelease?.endOfLife) {
    const qualifier = nodeRelease.endOfLifeDate
      ? ` on ${nodeRelease.endOfLifeDate.toISOString().slice(0, 10)}`
      : '';
    veryVisibleMessage(
      bgRed.white.bold,
      `Node ${nodeRelease.majorVersion} has reached end-of-life${qualifier} and is not supported.`,
      `Please upgrade to a supported node version as soon as possible.`,
    );
  } else if (knownBroken) {
    veryVisibleMessage(
      bgRed.white.bold,
      `Node ${version} is unsupported and has known compatibility issues with this software.`,
    );
  } else if (!nodeRelease || nodeRelease.pending) {
    veryVisibleMessage(
      bgYellow.black,
      `This software has not been tested with node ${version}.`,
    );
  } else if (nodeRelease?.deprecated) {
    const deadline = nodeRelease.endOfLifeDate!.toISOString().slice(0, 10);
    veryVisibleMessage(
      bgYellowBright.black,
      `Node ${nodeRelease.majorVersion} is approaching end-of-life and will no longer be supported in new releases after ${deadline}.`,
      `Please upgrade to a supported node version as soon as possible.`,
    );
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
      `This software is currently running on node ${version}.`,
      'As of the current release of this software, supported node releases are:',
      ...NodeRelease.ALL_RELEASES.filter((release) => release.supported)
        // We display those from longest remaining support to shortest (to incitate people to be ahead of future derepcations).
        .sort(
          (l, r) =>
            (r.endOfLifeDate?.getTime() ?? 0) -
            (l.endOfLifeDate?.getTime() ?? 0),
        )
        .map((release) => `- ${release.toString()}`),
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
