// Attempt to expose an unexported type defined in another file should fail
// because that type will not be available in the module spec.

import { UnexportedType } from './mylib';

export class ExportedType {
  public p?: UnexportedType;
}
