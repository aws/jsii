import { Goodness } from './child';

export namespace nested_submodule {
  export namespace deeplyNested {
    export interface INamespaced {
      readonly definedAt: string;
    }
  }

  export abstract class Namespaced implements deeplyNested.INamespaced {
    public readonly definedAt = __filename;
    public abstract readonly goodness: Goodness;

    private constructor() { }
  }
}
