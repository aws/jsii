#!/usr/bin/env node

/* eslint-disable no-console */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runCommand = async () => {
  console.info('Hello World!');

  const args = process.argv.slice(2);
  if (args.length > 0) {
    console.info(`  arguments: ${args.join(', ')}`);

    if (args.includes('delay')) {
      for (let i = 1; i <= 5; i++) {
        console.log(`sleeping 1s ${i}`);
        // eslint-disable-next-line no-await-in-loop
        await delay(1000);
      }
    }

    if (args.includes('fail')) {
      console.error('error message to stderr');
      process.exit(3);
    }
  }
};

runCommand().catch((err) => {
  console.error(err);
  process.exit(1);
});
