import { Chalk, bgYellow, bgYellowBright, bgRed } from 'chalk';
import { error } from 'console';
import { version } from 'process';

import { NodeRelease } from './constants';

export { NodeRelease } from './constants';

/**
 * Checks the current process' node runtime version against the release support
 * matrix, and issues a warning to STDERR if the current version is not fully
 * supported (i.e: it is deprecated, end-of-life, or untested).
 *
 * @param envPrefix will be prepended to environment variable names that can be
 *                  used to silence version check warnings.
 */
export function checkNode(envPrefix = 'JSII'): void {
  const { nodeRelease, knownBroken } = NodeRelease.forThisRuntime();

  const defaultCallToAction =
    'Should you encounter odd runtime issues, please try using one of the supported release before filing a bug report.';

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
    const silenceVariable = `${envPrefix}_SILENCE_WARNING_KNOWN_BROKEN_NODE_VERSION`;
    if (!process.env[silenceVariable])
      veryVisibleMessage(
        bgRed.white.bold,
        `Node ${version} is unsupported and has known compatibility issues with this software.`,
        defaultCallToAction,
        silenceVariable,
      );
  } else if (!nodeRelease || nodeRelease.untested) {
    const silenceVariable = `${envPrefix}_SILENCE_WARNING_UNTESTED_NODE_VERSION`;
    if (!process.env[silenceVariable]) {
      veryVisibleMessage(
        bgYellow.black,
        `This software has not been tested with node ${version}.`,
        defaultCallToAction,
        silenceVariable,
      );
    }
  } else if (nodeRelease?.deprecated) {
    const silenceVariable = `${envPrefix}_SILENCE_WARNING_DEPRECATED_NODE_VERSION`;
    if (!process.env[silenceVariable]) {
      const deadline = nodeRelease.endOfLifeDate!.toISOString().slice(0, 10);
      veryVisibleMessage(
        bgYellowBright.black,
        `Node ${nodeRelease.majorVersion} is approaching end-of-life and will no longer be supported in new releases after ${deadline}.`,
        `Please upgrade to a supported node version as soon as possible.`,
        silenceVariable,
      );
    }
  }

  function veryVisibleMessage(
    chalk: Chalk,
    message: string,
    callToAction: string,
    silenceVariable?: string,
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
        .map(
          (release) =>
            `- ${release.toString()}${
              release.deprecated ? ' [DEPRECATED]' : ''
            }`,
        ),
      // Add blurb on how this message can be silenced (if it can be silenced).
      ...(silenceVariable
        ? [
            '',
            `This warning can be silenced by setting the ${silenceVariable} environment variable.`,
          ]
        : []),
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
