import * as process from 'process';

import * as packageInfo from '../package.json';
import { KernelHost } from './host';
import { InputOutput } from './in-out';

const name = packageInfo.name;
const version = packageInfo.version;

const noStack = !!process.env.JSII_NOSTACK;
const debug = !!process.env.JSII_DEBUG;

const inout = new InputOutput();
const host = new KernelHost(inout, { debug, noStack });

// say hello
inout.write({ hello: `${name}@${version}` });
inout.debug = debug; // we don't want "hello" emitted

host.run();
