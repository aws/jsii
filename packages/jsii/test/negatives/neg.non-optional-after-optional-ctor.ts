///!MATCH_ERROR: Parameter _arg2 cannot be optional, as it precedes non-optional parameter _arg3

export class NonOptionalAfterOptional {
    constructor(_arg1: string, _arg2 = 'hello', _arg3: string) {
        return;
    }
}
