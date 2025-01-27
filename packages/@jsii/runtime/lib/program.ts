import * as packageInfo from '../package.json';
import { KernelHost } from './host';
import { InputOutput } from './in-out';
import { SyncStdio } from './sync-stdio';

const name = packageInfo.name;
const version = packageInfo.version;

const noStack = !!process.env.JSII_NOSTACK;
const debug = !!process.env.JSII_DEBUG;
const debugTiming = !!process.env.JSII_DEBUG_TIMING;
const validateAssemblies = !!process.env.JSII_VALIDATE_ASSEMBLIES;

// This assumes FD#3 is opened for reading and writing. This is normally
// performed by`bin/jsii-runtime.js`, and we will not be verifying this once
// again...Meaning that failure to have set this up correctly results in
// undefined behavior(likely a crash).
const stdio = new SyncStdio({
  // "process.stderr.fd" is not in @types/node definitions because it can be
  // absent in certain circumstances (for example, in `worker_threads` workers).
  // We'll fall-back to `2` - its expected value - in this case; but this is not
  // supposed to be happening here (we don't use `worker_threads`).
  errorFD: (process.stderr as any).fd ?? 2,
  readFD: 0,
  writeFD: 1,
});

const inout = new InputOutput(stdio);
const host = new KernelHost(inout, {
  debug,
  noStack,
  debugTiming,
  validateAssemblies,
});

host.once('exit', process.exit.bind(process));

// say hello
inout.write({ hello: `${name}@${version}` });
inout.debug = debug; // we don't want "hello" emitted

host.run();
