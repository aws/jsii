export namespace nested_submodule {
  export namespace deeplyNested {
    export interface INamespaced {
      readonly definedAt: string;
    }
  }

  export class Namespaced implements deeplyNested.INamespaced {
    public readonly definedAt = __filename;

    private constructor() { }
  }
}

export * as child from './child';
