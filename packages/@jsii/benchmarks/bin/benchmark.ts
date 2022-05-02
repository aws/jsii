import * as fs from 'fs-extra';
import * as yargs from 'yargs';

import { benchmarks } from '../lib';
import { Benchmark } from '../lib/benchmark';

interface ResultsJson {
  name: string;
  unit: string;
  value: number;
  range: number;
}

(async () => {
  const argv = yargs
    .command('$0', 'Runs jsii benchmark tests and displays results', (argv) =>
      argv.option('output', {
        type: 'string',
        desc: 'location of benchmark results json file, does not output to file if not specified.',
      }),
    )
    .help().argv;

  const resultsJson: ResultsJson[] = await benchmarks.reduce(
    async (
      accum: Promise<ResultsJson[]>,
      benchmark: Benchmark<any>,
    ): Promise<ResultsJson[]> => {
      const prev = await accum;
      const result = await benchmark.run();
      const iterations = result.iterations.map((i) => i.duration);
      console.log(
        `${result.name} averaged ${result.average} milliseconds over ${result.iterations.length} runs`,
      );
      return [
        ...prev,
        {
          name: result.name,
          unit: 'milliseconds',
          value: result.average,
          range: Math.max(...iterations) - Math.min(...iterations),
        },
      ];
    },
    Promise.resolve([]),
  );

  if (argv.output) {
    fs.writeFileSync(argv.output, JSON.stringify(resultsJson, undefined, 2));
    console.log(`results written to ${argv.output}`);
  }

  return resultsJson;
})()
  .then((results) => {
    console.log(`successfully completed ${results.length} benchmarks`);
  })
  .catch((e) => {
    console.error(`Error: ${e.stack}`);
    process.exitCode = -1;
  });
