///!MATCH_ERROR: Exported APIs cannot use un-exported type jsii.UnexportedType

// Attempt to expose an unexported type defined in another file should fial
// because that type will not be available in the module spec.

import { UnexportedType } from './mylib';

export class ExportedType {
    public p?: UnexportedType;
}
