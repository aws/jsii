///!MATCH_ERROR: Cannot use private type MyNamespace.UnexportedType in exported declarations

// Attempt to expose an unexported type defined in this file should fail
// because that type will not be available in the module spec.

namespace MyNamespace {
    export class UnexportedType {
    }
}

export class ExportedType {
    public p?: MyNamespace.UnexportedType;
}
