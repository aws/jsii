import { Goodness } from './child';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace nested_submodule {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace deeplyNested {
    export interface INamespaced {
      readonly definedAt: string;
    }
  }

  export abstract class Namespaced implements deeplyNested.INamespaced {
    public readonly definedAt = __filename;
    public abstract readonly goodness: Goodness;

    private constructor() {}
  }
}
