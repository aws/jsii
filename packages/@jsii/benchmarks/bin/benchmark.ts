import * as fs from 'fs-extra';
import * as path from 'path';
import * as yargs from 'yargs';

import { benchmarks } from '../lib';
import { Benchmark } from '../lib/benchmark';

/**
 * Format of benchmark output used by continuous benchmarking action.
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
      argv
        .option('output', {
          type: 'string',
          desc: 'location of benchmark results json file, does not output to file if not specified.',
        })
        .option('profile-dir', {
          type: 'string',
          desc: 'directory to write benchmark profiles to',
        }),
    )
    .help().argv;

  // Run list of benchmarks in sequence
  try {
    const resultsJson: ResultsJson[] = await benchmarks.reduce(
      async (
        accum: Promise<ResultsJson[]>,
        benchmark: Benchmark<any>,
      ): Promise<ResultsJson[]> => {
        const bench = argv.profileDir ? benchmark.profile() : benchmark;
        const prev = await accum;
        const result = await bench.run();

        // Output summary to console
        const extra = `${result.name} averaged ${result.average} milliseconds over ${result.iterations.length} runs`;
        console.log(extra);

        // Write profiles if enabled
        if (argv.profileDir) {
          const dirName = result.name.replace(/[/\\:*?"<>]/g, '');
          const profilesTargetDir = path.join(argv.profileDir, dirName);
          await fs.mkdir(profilesTargetDir);

          await Promise.all(
            result.iterations.map(async (iter, idx) => {
              const profileFile = path.join(profilesTargetDir, `${idx}.json`);
              await fs.writeJson(profileFile, iter.profile);
            }),
          );
          console.log(`profiles written to ${profilesTargetDir} directory`);
        }

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

    // If we are running in GitHub Actions, emit a summary document.
    if (process.env.GITHUB_STEP_SUMMARY != null) {
      await fs.writeFile(
        process.env.GITHUB_STEP_SUMMARY,
        [
          '## Benchmark Results',
          '',
          'Suite | Avg | StdDev',
          '------|-----|-------',
          ...resultsJson
            .sort((l, r) => l.name.localeCompare(r.name))
            .map(
              ({ name, value, range }) =>
                `${name} | ${value.toFixed(1)} | ${Math.sqrt(range).toFixed(
                  2,
                )}`,
            ),
        ].join('\n'),
        'utf-8',
      );
    }

    if (argv.output) {
      await fs.writeJson(argv.output, resultsJson, { spaces: 2 });
      console.log(`results written to ${argv.output}`);
    }

    return resultsJson;
  } catch (e) {
    console.error(e);
    throw e;
  }
})()
  .then((results) => {
    console.log(`successfully completed ${results.length} benchmarks`);
  })
  .catch((e) => {
    console.error(`Error: ${e.stack}`);
    process.exitCode = -1;
  });
