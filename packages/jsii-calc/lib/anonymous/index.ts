export interface IOptionA {
  doSomething(): string;
}

export interface IOptionB {
  doSomethingElse(): string;
}

export class UseOptions {
  public static provide(which: 'A' | 'B'): IOptionA | IOptionB {
    switch (which) {
      case 'A':
        return new OptionA();
      case 'B':
        return new OptionB();
      default:
        throw new Error(`Unexpected option: ${which as any}`);
    }
  }

  public static privideAsAny(which: 'A' | 'B'): any {
    return this.provide(which);
  }

  public static consume(option: IOptionA | IOptionB): string {
    if (option instanceof OptionA) {
      return option.doSomething();
    } else if (option instanceof OptionB) {
      return option.doSomethingElse();
    }
    throw new Error(`Unexpected option: ${option as any}`);
  }

  private constructor() {}
}

class OptionA implements IOptionA {
  public doSomething(): string {
    return 'A';
  }
}

class OptionB implements IOptionB {
  public doSomethingElse(): string {
    return 'B';
  }
}
