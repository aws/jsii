import * as spec from '@jsii/spec';
import * as crypto from 'crypto';

/**
 * Return a fingerprint for a type.
 *
 * The fingerprint will change if the API of the given type changes.
 *
 * The fingerprint is an approximation, it's not exhaustive. It will not trace
 * into types from other assemblies, for example. For the purposes of Rosetta,
 * we'll assume this is Good Enough™.
 */
export class TypeFingerprinter {
  private readonly cache = new Map<string, string>();

  public constructor(private readonly assembly: spec.Assembly) {}

  /**
   * Return the fingerprint for the given FQN in the assembly of this fingerprinter
   *
   * The fingerprint is always going to contain the FQN, even if the type doesn't exist
   * in this assembly.
   */
  public fingerprintType(fqn: string) {
    return this.doFingerprint(fqn, new Set([fqn]));
  }

  private doFingerprint(fqn: string, recursionBreaker: Set<string>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const existing = this.cache.get(fqn);
    if (existing) {
      return existing;
    }

    const hash = crypto.createHash('sha256');
    hash.update(fqn);

    const type = this.assembly.types?.[fqn];
    if (type) {
      hash.update(type.kind);
      switch (type.kind) {
        case spec.TypeKind.Enum:
          for (const member of sortedByName(type.members)) {
            hash.update(member.name);
          }
          break;
        case spec.TypeKind.Class:
        case spec.TypeKind.Interface:
          if (type.kind === spec.TypeKind.Class) {
            visitType(type.base);
            visitCallable(type.initializer);
          }

          for (const prop of sortedByName(type.properties ?? [])) {
            hash.update(prop.name);
            visitBools(prop.immutable, prop.static, prop.optional, prop.protected);
            visitTypeReference(prop.type);
          }
          for (const method of sortedByName(type.methods ?? [])) {
            hash.update(method.name);
            visitCallable(method);
            visitBools(method.returns?.optional);
            visitTypeReference(method.returns?.type);
          }
          for (const implint of type.interfaces ?? []) {
            visitType(implint);
          }

          break;
      }
    }

    const ret = hash.digest('hex');
    this.cache.set(fqn, ret);
    return ret;

    function visitType(fqn?: string) {
      if (!fqn) {
        return;
      }

      if (recursionBreaker.has(fqn)) {
        hash.update('$RECURSION$');
        return;
      }

      recursionBreaker.add(fqn);
      hash.update(self.doFingerprint(fqn, recursionBreaker));
      recursionBreaker.delete(fqn);
    }

    function visitCallable(callable?: spec.Callable) {
      if (!callable) {
        return;
      }

      visitBools(callable.protected);
      for (const param of callable.parameters ?? []) {
        visitBools(param.optional, param.variadic);
        visitTypeReference(param.type);
      }
    }

    function visitTypeReference(typeRef?: spec.TypeReference) {
      if (!typeRef) {
        return;
      }

      if (spec.isPrimitiveTypeReference(typeRef)) {
        hash.update(typeRef.primitive);
      }
      if (spec.isNamedTypeReference(typeRef)) {
        visitType(typeRef.fqn);
      }
      if (spec.isCollectionTypeReference(typeRef)) {
        hash.update(typeRef.collection.kind);
        visitTypeReference(typeRef.collection.elementtype);
      }
      if (spec.isUnionTypeReference(typeRef)) {
        for (const type of typeRef.union.types) {
          visitTypeReference(type);
        }
      }
    }

    function visitBools(...vs: Array<boolean | undefined>) {
      hash.update(vs.map((v) => (v ? '1' : '0')).join(''));
    }
  }
}

function sortedByName<A extends { name: string }>(xs: A[]): A[] {
  xs.sort((a, b) => a.name.localeCompare(b.name));
  return xs;
}
