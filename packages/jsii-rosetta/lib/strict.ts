import { Assembly } from '@jsii/spec';

export function enforcesStrictMode(assembly: Assembly): boolean {
  return !!assembly.metadata?.jsii?.rosetta?.strict;
}
