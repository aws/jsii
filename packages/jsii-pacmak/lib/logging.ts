export let level = 0;

export const LEVEL_INFO    = 1;
export const LEVEL_VERBOSE = 2;

export enum Level {
    QUIET = 0,
    INFO = 1,
    VERBOSE = 2,
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
        // tslint:disable-next-line:no-console
        console.error.call(console, ...[ `[jsii-pacmak] [${levelName}]`, fmt, ...args ]);
    }
}