import { Callable } from './callable';
import { Documentable } from './docs';
import { Overridable } from './overridable';
import { SourceLocatable } from './source';
import { MemberKind, TypeMember } from './type-member';

export class Initializer
  extends Callable
  implements Documentable, Overridable, TypeMember, SourceLocatable
{
  public static isInitializer(x: Callable): x is Initializer {
    return x instanceof Initializer;
  }

  public readonly kind = MemberKind.Initializer;
  public readonly name = '<initializer>';
  public readonly abstract = false;
}
