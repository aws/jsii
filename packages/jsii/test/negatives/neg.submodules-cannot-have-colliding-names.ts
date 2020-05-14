///!MATCH_ERROR: Submodule "ns1" conflicts with "Ns1".

export * as ns1 from './namespaced';

export class Ns1 {
  private constructor() { }
}
