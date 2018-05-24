///!MATCH_ERROR: Found unexported types in the API
///!MATCH_ERROR: jsii$jsii$.UnexportedType is referenced from context

// Attempt to expose an unexported type defined in another file should fial
// because that type will not be available in the module spec.

import { UnexportedType } from './mylib'

export class ExportedType {
    p?: UnexportedType
}