export interface Homonymous {
  readonly stringProperty: string;
}

export interface ConsumerProps {
  readonly homonymous: Homonymous;
}

export class Consumer {
  public static consume(props: ConsumerProps) {
    return props.homonymous;
  }

  private constructor() {}
}
