import * as util from 'util';

export enum Level {
  ERROR = -2,
  WARN = -1,
  QUIET = 0,
  INFO = 1,
  VERBOSE = 2,
}

export const LEVEL_INFO: number = Level.INFO;
export const LEVEL_VERBOSE: number = Level.VERBOSE;

/** The minimal logging level for messages to be emitted. */
export let level = Level.QUIET;

export function configure({ level: newLevel }: { level: Level }) {
  level = newLevel;
}

export function warn(fmt: string, ...args: any[]) {
  log(Level.WARN, fmt, ...args);
}

export function error(fmt: string, ...args: any[]) {
  log(Level.ERROR, fmt, ...args);
}

export function info(fmt: string, ...args: any[]) {
  log(Level.INFO, fmt, ...args);
}

export function debug(fmt: string, ...args: any[]) {
  log(Level.VERBOSE, fmt, ...args);
}

function log(messageLevel: Level, fmt: string, ...args: any[]) {
  if (level >= messageLevel) {
    const levelName = Level[messageLevel];
    process.stderr.write(`[jsii-rosetta] [${levelName}] ${util.format(fmt, ...args)}\n`);
  }
}
