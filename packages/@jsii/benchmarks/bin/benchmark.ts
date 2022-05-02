import * as yargs from 'yargs';
import * as fs from 'fs-extra';
import { benchmarks } from '../lib';
import { Benchmark } from '../lib/benchmark';

interface ResultsJson {
  name: string;
  unit: string;
  value: number;
}

(async () => {
  const argv = await yargs
      .command(
        '$0',
        'Compiles a jsii/TypeScript project',
        (argv) =>
          argv
            .option('output', {
              type: 'string',
              desc: 'location of benchmark results json file, does not output to file if not specified.',
            })
      )
      .help()
      .argv;

  const resultsJson: ResultsJson[] = benchmarks.reduce((accum: ResultsJson[], benchmark: Benchmark<any>) => {
    const result = benchmark.run();
    console.log(`${result.name} averaged ${result.average} over ${result.iterations.length} runs`);

    return [
      ...accum,
      {
        name: result.name,
        unit: 'seconds',
        value: result.average,
      },
    ];
  }, []);

  if (argv.output) {
    fs.writeFileSync(argv.output, JSON.stringify(resultsJson, undefined, 2));
  }
})().catch((e) => {
  console.error(`Error: ${e.stack}`);
  process.exitCode = -1;
});
