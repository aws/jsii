///!MATCH_ERROR: Public property 'p' of exported class has or is using private name 'UnexportedType'.

// Attempt to expose an unexported type defined in another file should fial
// because that type will not be available in the module spec.

import { UnexportedType } from './mylib'

export class ExportedType {
    p?: UnexportedType
}
