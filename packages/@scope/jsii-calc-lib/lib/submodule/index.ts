export interface IReflectable {
  readonly entries: ReflectableEntry[];
}

export interface ReflectableEntry {
  readonly key: string;
  readonly value: unknown;
}

export class Reflector {
  public asMap(reflectable: IReflectable): Record<string, unknown> {
    return reflectable.entries.reduce((mapping, entry) => {
      mapping[entry.key] = entry.value;
      return mapping;
    }, {} as Record<string, unknown>);
  }
}

/**
 * This class is here to show we can use nested classes across module boundaries.
 */
export class NestingClass {
  private constructor() {}
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NestingClass {
  /**
   * This class is here to show we can use nested classes across module boundaries.
   */
  export class NestedClass {
    public readonly property: string = 'property';
  }

  /**
   * This is a struct, nested within a class. Normal.
   */
  export interface NestedStruct {
    readonly name: string;
  }
}
