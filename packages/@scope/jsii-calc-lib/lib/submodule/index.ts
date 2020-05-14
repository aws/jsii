export interface IReflectable {
  readonly entries: ReflectableEntry[];
}

export interface ReflectableEntry {
  readonly key: string;
  readonly value: unknown;
}

export class Reflector {
  public constructor() { }

  public asMap(reflectable: IReflectable): Record<string, unknown> {
    return reflectable.entries.reduce(
      (mapping, entry) => {
        mapping[entry.key] = entry.value;
        return mapping;
      },
      {} as Record<string, unknown>,
    );
  }
}
