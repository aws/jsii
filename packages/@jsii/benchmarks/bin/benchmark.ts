import * as fs from 'fs-extra';
import * as yargs from 'yargs';

import { benchmarks } from '../lib';
import { Benchmark } from '../lib/benchmark';

interface ResultsJson {
  name: string;
  unit: string;
  value: number;
}

(() => {
  const argv = yargs
    .command('$0', 'Compiles a jsii/TypeScript project', (argv) =>
      argv.option('output', {
        type: 'string',
        desc: 'location of benchmark results json file, does not output to file if not specified.',
      }),
    )
    .help().argv;

  const resultsJson: ResultsJson[] = benchmarks.reduce(
    (accum: ResultsJson[], benchmark: Benchmark<any>) => {
      const result = benchmark.run();
      console.log(
        `${result.name} averaged ${result.average} over ${result.iterations.length} runs`,
      );

      return [
        ...accum,
        {
          name: result.name,
          unit: 'seconds',
          value: result.average,
        },
      ];
    },
    [],
  );

  if (argv.output) {
    fs.writeFileSync(argv.output, JSON.stringify(resultsJson, undefined, 2));
    console.log(`results written to ${argv.output}`);
  }
})();
