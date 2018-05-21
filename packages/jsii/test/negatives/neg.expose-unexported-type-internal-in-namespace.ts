///!MATCH_ERROR: Cannot use unexported type 'MyNamespace.UnexportedType' in a public API

// Attempt to expose an unexported type defined in this file should fail
// because that type will not be available in the module spec.

namespace MyNamespace {
    export class UnexportedType {
    }
}


export class ExportedType {
    p?: MyNamespace.UnexportedType
}