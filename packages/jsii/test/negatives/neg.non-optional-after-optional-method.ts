export class NonOptionalAfterOptional {
  public foo(_arg1: string, _arg2 = 'hello', _argX: string, _arg4?: boolean) {
    return;
  }
}
