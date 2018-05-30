///!MATCH_ERROR: Found unexported types in the API, which are also not exported by any dependency

// Attempt to expose an unexported type defined in another file should fial
// because that type will not be available in the module spec.

import { UnexportedType } from './mylib'

export class ExportedType {
    p?: UnexportedType
}
