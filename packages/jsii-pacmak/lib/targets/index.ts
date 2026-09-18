import {
  IndependentPackageBuilder,
  TargetBuilder,
  BuildOptions,
} from '../builder';
import { JsiiModule } from '../packaging';
import { Toposorted } from '../toposort';
import { flatten } from '../util';
import { DotnetBuilder } from './dotnet';
import { Golang } from './go';
import { JavaBuilder } from './java';
import JavaScript from './js';
import Python from './python';
import Ruby from './ruby';

export enum TargetName {
  DOTNET = 'dotnet',
  GO = 'go',
  JAVA = 'java',
  JAVASCRIPT = 'js',
  PYTHON = 'python',
  RUBY = 'ruby',
}

export type BuilderFactory = (
  modules: Toposorted<JsiiModule>,
  options: BuildOptions,
) => TargetBuilder;

export const ALL_BUILDERS: { [key in TargetName]: BuilderFactory } = {
  dotnet: (ms, o) => new DotnetBuilder(flatten(ms), o),
  go: (ms, o) => new IndependentPackageBuilder(TargetName.GO, Golang, ms, o),
  java: (ms, o) => new JavaBuilder(flatten(ms), o),
  js: (ms, o) =>
    new IndependentPackageBuilder(TargetName.JAVASCRIPT, JavaScript, ms, o),
  python: (ms, o) =>
    new IndependentPackageBuilder(TargetName.PYTHON, Python, ms, o),
  ruby: (ms, o) => new IndependentPackageBuilder(TargetName.RUBY, Ruby, ms, o),
};

export const INCOMPLETE_DISCLAIMER_NONCOMPILING =
  'Example automatically generated from non-compiling source. May contain errors.';
