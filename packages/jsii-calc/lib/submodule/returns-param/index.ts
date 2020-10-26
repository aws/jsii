import { SpecialParameter } from '../param';

export class ReturnsSpecialParameter {
  public returnsSpecialParam(): SpecialParameter {
    const ret = { value: 'foo' };
    return ret;
  }
}
