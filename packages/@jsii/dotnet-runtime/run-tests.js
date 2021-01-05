const cp = require('child_process');
const os = require('os');
const path = require('path');
const process = require('process');

const FLAG = '--experimental-worker';

let nodeOptions = process.allowedNodeEnvironmentFlags.has(FLAG)
  ? `${process.env.NODE_OPTIONS ?? ''} ${FLAG}`.trim()
  : process.env.NODE_OPTIONS;

if (process.platform === 'win32') {
  cp.spawnSync('tasklist', ['/v'], { stdio: 'inherit' });
}

const result = cp.spawnSync(
  'dotnet',
  [
    'test',
    '--no-restore',
    '-c',
    'Release',
    path.join(__dirname, 'src', 'Amazon.JSII.Runtime.sln'),
  ],
  {
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOptions,
    },
    shell: false,
    stdio: 'inherit',
    windowsHide: true,
  },
);

console.error(`dotnet CLI returned: ${JSON.stringify(result, null, 2)}`);

if (process.platform === 'win32') {
  cp.spawnSync('tasklist', ['/v'], { stdio: 'inherit' });
}

if (result.error) {
  throw result.error;
}

if (result.signal) {
  process.exit(-os.constants.signals[result.signal]);
}

process.exit(result.status);
