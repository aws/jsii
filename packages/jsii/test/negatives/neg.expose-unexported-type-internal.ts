///!MATCH_ERROR: Public property 'p' of exported class has or is using private name 'UnexportedType'.

// Attempt to expose an unexported type defined in this file should fail
// because that type will not be available in the module spec.

class UnexportedType {

}

export class ExportedType {
    p?: UnexportedType
}
