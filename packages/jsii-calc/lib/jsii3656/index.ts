export abstract class OverrideMe {
  public static callAbstract(receiver: OverrideMe): boolean {
    return receiver.implementMe({
      name: 'John Doe',
      // Decided not to pass count here...
    });
  }

  public abstract implementMe(opts: ImplementMeOpts): boolean;
}

export interface ImplementMeOpts {
  readonly name: string;
  readonly count?: number;
}
