///!MATCH_ERROR: Type "UnexportedType" cannot be used as the property type because it is private or @internal

// Attempt to expose an unexported type defined in this file should fail
// because that type will not be available in the module spec.

class UnexportedType {}

export class ExportedType {
  public p?: UnexportedType;
}
