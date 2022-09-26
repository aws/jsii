#!/usr/bin/env node

/* eslint-disable no-console */

console.info('Hello World!');

const args = process.argv.slice(2);
if (args.length > 0) {
  console.info(`  arguments: ${args.join(', ')}`);
}
