import * as fs from 'fs-extra';
import * as yargs from 'yargs';

import { benchmarks } from '../lib';
import { Benchmark } from '../lib/benchmark';

/**
 * Format of benchmark output used by continous benchmarking action.
 * See [documentation](https://github.com/benchmark-action/github-action-benchmark/blob/master/README.md) for details
 */
interface ResultsJson {
  /**
   * The name of the benchmark
   */
  name: string;

  /**
   * The unit of measure, usually seconds
   */
  unit: string;

  /**
   * The result of the measurement, usually an average over x iterations
   */
  value: number;

  /**
   * The variance of all runs
   */
  range: number;

  /**
   * Extra information about the benchmark, displayed in a tooltip
   */
  extra: string;
}

(async () => {
  /* eslint-disable-next-line @typescript-eslint/await-thenable */
  const argv = await yargs
    .command('$0', 'Runs jsii benchmark tests and displays results', (argv) =>
      argv.option('output', {
        type: 'string',
        desc: 'location of benchmark results json file, does not output to file if not specified.',
      }),
    )
    .help().argv;

  // Run list of benchmarks in sequence
  const resultsJson: ResultsJson[] = await benchmarks.reduce(
    async (
      accum: Promise<ResultsJson[]>,
      benchmark: Benchmark<any>,
    ): Promise<ResultsJson[]> => {
      const prev = await accum;
      const result = await benchmark.run();
      const extra = `${result.name} averaged ${result.average} milliseconds over ${result.iterations.length} runs`;
      console.log(extra);
      return [
        ...prev,
        {
          name: result.name,
          unit: 'milliseconds',
          value: result.average,
          range: result.variance,
          extra,
        },
      ];
    },
    Promise.resolve([]),
  );

  if (argv.output) {
    await fs.writeJson(argv.output, resultsJson, { spaces: 2 });
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
