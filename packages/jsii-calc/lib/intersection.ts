import { IFriendly } from '@scope/jsii-calc-lib';

export interface ISomething {
  something(): any;
}

export interface IntersectionProps {
  readonly param: ISomething & IFriendly;
}

export class ConsumesIntersection {
  public static acceptsIntersection(param: ISomething & IFriendly) {
    void param;
  }

  public static acceptsPropWithIntersection(props: IntersectionProps) {
    void props;
  }

  public constructor(props: IntersectionProps) {
    void props;
  }
}
