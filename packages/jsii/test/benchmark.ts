import * as Benchmark from 'benchmark';
import * as path from 'path';

import { Compiler } from '../lib/compiler';
import { loadProjectInfo } from '../lib/project-info';

const suite = new Benchmark.Suite();

const jsiiCalcDir = path.resolve(__dirname, '..', '..', 'jsii-calc');
suite.add('compile jsii-calc', () => {
  const { projectInfo } = loadProjectInfo(jsiiCalcDir);
  const compiler = new Compiler({ projectInfo });

  compiler.emit();
});

suite.on('cycle', (event: any) => {
  console.log(String(event.target));
});

suite.run();
