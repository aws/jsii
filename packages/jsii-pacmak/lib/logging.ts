export let level = 0;

export const LEVEL_INFO    = 1;
export const LEVEL_VERBOSE = 2;

export function info(fmt: string, ...args: any[]) {
    if (level >= LEVEL_INFO) {
        console.error.call(console, ...[ '[INFO]', fmt, ...args ]);
    }
}

export function debug(fmt: string, ...args: any[]) {
    if (level >= LEVEL_VERBOSE) {
        console.error.call(console, ...[ '[DEBUG]', fmt, ...args ]);
    }
}
