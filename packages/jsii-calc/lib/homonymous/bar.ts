export interface Homonymous {
  readonly numericProperty: number;
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
