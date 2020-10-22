import { AllTypes } from '..';
import { Awesomeness, Goodness, SomeStruct } from './child';
import { nested_submodule } from './nested_submodule';
import { SpecialParameter } from './param';

export class MyClass implements nested_submodule.deeplyNested.INamespaced {
  public readonly definedAt = __filename;
  public readonly goodness = Goodness.AMAZINGLY_GOOD;
  public readonly awesomeness = Awesomeness.AWESOME;
  public allTypes?: AllTypes;

  public constructor(public readonly props: SomeStruct) {}

  public methodWithSpecialParam(param: SpecialParameter) {
    return param.value;
  }
}
