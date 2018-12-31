///!MATCH_ERROR: Parameter _arg3 must be optional since it comes after an optional parameter

export class NonOptionalAfterOptional {
    constructor(_arg1: string, _arg2 = 'hello', _arg3: string) {
        return;
    }
}
