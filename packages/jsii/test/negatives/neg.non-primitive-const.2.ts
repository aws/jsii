///!MATCH_ERROR: Non-primitive public const value is skipped

export class ExportedType {
    static readonly MY_CONST = { obj: 123 };
}