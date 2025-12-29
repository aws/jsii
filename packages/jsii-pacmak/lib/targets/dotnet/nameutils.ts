import * as spec from '@jsii/spec';
import { toCamelCase } from 'codemaker';

import { jsiiToPascalCase } from '../../naming-util';

export class DotNetNameUtils {
  public convertPropertyName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid property name: ${original}`);
    }
    return this.capitalizeWord(original);
  }

  public convertTypeName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid type name: ${original}`);
    }
    return this.capitalizeWord(original);
  }

  public convertMethodName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid method name: ${original}`);
    }
    return this.capitalizeWord(original);
  }

  public convertEnumMemberName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid enum member name: ${original}`);
    }
    return this.capitalizeWord(original);
  }

  public convertInterfaceName(original: spec.InterfaceType) {
    if (this.isInvalidName(original.name)) {
      throw new Error(`Invalid interface name: ${original.name}`);
    }
    if (original.datatype) {
      // Datatype interfaces need to be prefixed by I so that they don't clash with the prop object implementation
      return `I${this.capitalizeWord(original.name)}`;
    }
    // Non datatype interfaces are guaranteed by JSII to be prefixed by I already
    return this.capitalizeWord(original.name);
  }

  public convertClassName(original: spec.ClassType | spec.InterfaceType) {
    if (this.isInvalidName(original.name)) {
      throw new Error(`Invalid class name: ${original.name}`);
    }
    // Tentatively get the class name
    let name = this.capitalizeWord(original.name);
    if (original.methods) {
      original.methods.forEach((method) => {
        if (method.name.toLowerCase() === original.name.toLowerCase()) {
          // This class has a member with the same name, need to slugify the class name
          name = this.capitalizeWord(this.slugify(original.name));
        }
      });
    }
    if (original.properties) {
      original.properties.forEach((property) => {
        if (property.name.toLowerCase() === original.name.toLowerCase()) {
          // This class has a member with the same name, need to slugify the class name
          name = this.capitalizeWord(this.slugify(original.name));
        }
      });
    }

    return name;
  }

  public convertPackageName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid package name: ${original}`);
    }
    return original
      .split('-')
      .map((s: string) => this.capitalizeWord(s))
      .join('.');
  }

  public convertParameterName(original: string) {
    if (this.isInvalidName(original)) {
      throw new Error(`Invalid parameter name: ${original}`);
    }
    const name = toCamelCase(original);
    if (!name) {
      // toCamelCase will return an empty string from a string like `_(_+)`. Confirm that
      // that is what is happening, then return the original string.
      if (original.match(/^__+$/)) {
        return original;
      }
      throw new Error(
        `toCamelCase returns an empty string from: ${JSON.stringify(original)}`,
      );
    }
    return this.escapeParameterName(name);
  }

  public capitalizeWord(original: string) {
    return jsiiToPascalCase(original);
  }

  /* We only want valid names for members */
  private isInvalidName(str: string) {
    // Can not be empty, or contains $
    // Can only start with a letter or an underscore
    return (
      str === null ||
      /^\s*$/.exec(str) !== null ||
      str.includes('$') ||
      !/^[A-Za-z_]/.exec(str)
    );
  }

  private escapeParameterName(name: string): string {
    if (!name) {
      return name;
    }
    if (RESERVED_KEYWORDS.includes(name)) {
      return `@${name}`;
    }
    return name;
  }

  private slugify(name: string): string {
    if (!name) {
      return name;
    }
    return `${name}_`;
  }
}

// Pulled from https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
const RESERVED_KEYWORDS = [
  // For some reason the old generator does not slugify the keyword base?
  'abstract',
  'as',
  'base',
  'bool',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'checked',
  'class',
  'const',
  'continue',
  'decimal',
  'default',
  'delegate',
  'double',
  'do',
  'else',
  'enum',
  'event',
  'explicit',
  'extern',
  'false',
  'finally',
  'fixed',
  'float',
  'for',
  'foreach',
  'goto',
  'if',
  'implicit',
  'in',
  'int',
  'interface',
  'internal',
  'is',
  'lock',
  'long',
  'namespace',
  'new',
  'null',
  'object',
  'operator',
  'out',
  'override',
  'params',
  'private',
  'protected',
  'public',
  'readonly',
  'ref',
  'return',
  'sbyte',
  'sealed',
  'short',
  'sizeof',
  'stackalloc',
  'static',
  'string',
  'struct',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'uint',
  'ulong',
  'unchecked',
  'unsafe',
  'ushort',
  'using',
  'value',
  'virtual',
  'void',
  'volatile',
  'while',
];
