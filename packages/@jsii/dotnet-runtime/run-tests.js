const cp = require('child_process');
const os = require('os');
const path = require('path');
const process = require('process');

const FLAG = '--experimental-worker';

let nodeOptions = process.allowedNodeEnvironmentFlags.has(FLAG)
  ? `${process.env.NODE_OPTIONS || ''} ${FLAG}`.trim()
  : process.env.NODE_OPTIONS;

const result = cp.spawnSync(
  'dotnet',
  [
    'test',
    '--no-build',
    '--configuration=Release',
    path.join(__dirname, 'src', 'Amazon.JSII.Runtime.sln'),
  ],
  {
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOptions,
    },
    shell: true,
    stdio: ['ignore', 'inherit', 'inherit'],
  },
);

console.error(`dotnet CLI returned: ${JSON.stringify(result, null, 2)}`);

if (result.error) {
  throw result.error;
}

if (result.signal) {
  const exitCode = -os.constants.signals[result.signal];
  console.error(`Exiting with code ${exitCode} due to signal ${result.signal}`);
  process.exit(exitCode);
}

process.exit(result.status);
