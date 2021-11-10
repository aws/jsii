// Directly importing NamespacedStruct, NEVER having imported @barrelimports/provider
import { NamespacedStruct } from '@barrelimports/provider/lib/namespaced';

export class UsingBarrelImport {
  public constructor(public readonly props: NamespacedStruct) { }
}
