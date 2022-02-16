import { Stability } from '@jsii/spec';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import chalk = require('chalk');
import { AsciiTree } from 'oo-ascii-tree';

import { Assembly } from './assembly';
import { ClassType } from './class';
import { Dependency } from './dependency';
import { Documentable } from './docs';
import { EnumType } from './enum';
import { Initializer } from './initializer';
import { InterfaceType } from './interface';
import { Method } from './method';
import { OptionalValue } from './optional-value';
import { Parameter } from './parameter';
import { Property } from './property';
import { Submodule } from './submodule';
import { TypeSystem } from './type-system';

export interface TypeSystemTreeOptions {
  /**
   * Show all entity types (supersedes other options)
   * @default false
   */
  showAll?: boolean;

  /**
   * Show type members (methods, properties)
   * @default false
   */
  members?: boolean;

  /**
   * Show dependencies
   * @default false
   */
  dependencies?: boolean;

  /**
   * Show inheritance information (base classes, interfaces)
   * @default false
   */
  inheritance?: boolean;

  /**
   * Show types
   * @default false
   */
  types?: boolean;

  /**
   * Show method signatures.
   * @default false
   */
  signatures?: boolean;

  /**
   * Output with ANSI colors
   * @default true
   */
  colors?: boolean;

  /**
   * Show stabilities
   *
   * @default false
   */
  stabilities?: boolean;
}

/**
 * Visualizes a `TypeSystem` as an ASCII tree.
 */
export class TypeSystemTree extends AsciiTree {
  public constructor(typesys: TypeSystem, options: TypeSystemTreeOptions = {}) {
    super();

    if (options.showAll) {
      options.dependencies = true;
      options.inheritance = true;
      options.members = true;
      options.signatures = true;
      options.types = true;
    }

    const shouldUseColors =
      options.colors === undefined ? true : options.colors;
    withColors(shouldUseColors, () => {
      if (typesys.assemblies.length > 0) {
        const assemblies = new TitleNode('assemblies');
        assemblies.add(
          ...typesys.assemblies.map((a) => new AssemblyNode(a, options)),
        );
        this.add(assemblies);
      }
    });
  }
}

class AssemblyNode extends AsciiTree {
  public constructor(assembly: Assembly, options: TypeSystemTreeOptions) {
    super(chalk.green(assembly.name));

    if (options.dependencies && assembly.dependencies.length > 0) {
      const deps = new TitleNode('dependencies');
      this.add(deps);
      deps.add(
        ...assembly.dependencies.map((d) => new DependencyNode(d, options)),
      );
    }

    const submodules = assembly.submodules;
    if (submodules.length > 0) {
      const title = new TitleNode('submodules');
      this.add(title);
      title.add(...submodules.map((s) => new SubmoduleNode(s, options)));
    }

    if (options.types) {
      const types = new TitleNode('types');
      this.add(types);
      types.add(...assembly.classes.map((c) => new ClassNode(c, options)));
      types.add(
        ...assembly.interfaces.map((c) => new InterfaceNode(c, options)),
      );
      types.add(...assembly.enums.map((c) => new EnumNode(c, options)));
    }
  }
}

class SubmoduleNode extends AsciiTree {
  public constructor(submodule: Submodule, options: TypeSystemTreeOptions) {
    super(chalk.green(submodule.name));

    const submodules = submodule.submodules;
    if (submodules.length > 0) {
      const title = new TitleNode('submodules');
      this.add(title);
      title.add(...submodules.map((s) => new SubmoduleNode(s, options)));
    }

    if (options.types) {
      const types = new TitleNode('types');
      this.add(types);
      types.add(...submodule.classes.map((c) => new ClassNode(c, options)));
      types.add(
        ...submodule.interfaces.map((i) => new InterfaceNode(i, options)),
      );
      types.add(...submodule.enums.map((e) => new EnumNode(e, options)));
    }
  }
}

class MethodNode extends AsciiTree {
  public constructor(method: Method, options: TypeSystemTreeOptions) {
    const args = method.parameters.map((p) => p.name).join(',');
    super(
      `${maybeStatic(method)}${method.name}(${args}) ${chalk.gray(
        'method',
      )}${describeStability(method, options)}`,
    );

    if (options.signatures) {
      if (method.abstract) {
        this.add(new FlagNode('abstract'));
      }

      if (method.protected) {
        this.add(new FlagNode('protected'));
      }

      if (method.static) {
        this.add(new FlagNode('static'));
      }

      if (method.variadic) {
        this.add(new FlagNode('variadic'));
      }

      if (method.parameters.length > 0) {
        const params = new TitleNode('parameters');
        this.add(params);
        params.add(
          ...method.parameters.map((p) => new ParameterNode(p, options)),
        );
      }

      this.add(
        new OptionalValueNode('returns', method.returns, {
          asPromise: method.async,
        }),
      );
    }
  }
}

class InitializerNode extends AsciiTree {
  public constructor(initializer: Initializer, options: TypeSystemTreeOptions) {
    const args = initializer.parameters.map((p) => p.name).join(',');
    super(
      `${initializer.name}(${args}) ${chalk.gray(
        'initializer',
      )}${describeStability(initializer, options)}`,
    );

    if (options.signatures) {
      if (initializer.protected) {
        this.add(new FlagNode('protected'));
      }

      if (initializer.variadic) {
        this.add(new FlagNode('variadic'));
      }

      if (initializer.parameters.length > 0) {
        const params = new TitleNode('parameters');
        this.add(params);
        params.add(
          ...initializer.parameters.map((p) => new ParameterNode(p, options)),
        );
      }
    }
  }
}

class ParameterNode extends AsciiTree {
  public constructor(param: Parameter, _options: TypeSystemTreeOptions) {
    super(param.name);

    this.add(new OptionalValueNode('type', param));
    if (param.variadic) {
      this.add(new FlagNode('variadic'));
    }
  }
}

class PropertyNode extends AsciiTree {
  public constructor(property: Property, options: TypeSystemTreeOptions) {
    super(
      `${maybeStatic(property)}${property.name} ${chalk.gray(
        'property',
      )}${describeStability(property, options)}`,
    );

    if (options.signatures) {
      if (property.abstract) {
        this.add(new FlagNode('abstract'));
      }

      if (property.const) {
        this.add(new FlagNode('const'));
      }

      if (property.immutable) {
        this.add(new FlagNode('immutable'));
      }

      if (property.protected) {
        this.add(new FlagNode('protected'));
      }

      if (property.static) {
        this.add(new FlagNode('static'));
      }

      this.add(new OptionalValueNode('type', property));
    }
  }
}

class OptionalValueNode extends AsciiTree {
  public constructor(
    name: string,
    optionalValue: OptionalValue,
    { asPromise } = { asPromise: false },
  ) {
    let type = OptionalValue.describe(optionalValue);
    if (asPromise) {
      type = `Promise<${type}>`;
    }
    super(`${chalk.underline(name)}: ${type}`);
  }
}

class ClassNode extends AsciiTree {
  public constructor(type: ClassType, options: TypeSystemTreeOptions) {
    super(
      `${chalk.gray('class')} ${chalk.cyan(type.name)}${describeStability(
        type,
        options,
      )}`,
    );

    if (options.inheritance && type.base) {
      this.add(new KeyValueNode('base', type.base.name));
    }

    if (options.inheritance && type.interfaces.length > 0) {
      this.add(
        new KeyValueNode(
          'interfaces',
          type.interfaces.map((i) => i.name).join(','),
        ),
      );
    }

    if (options.members) {
      const members = new TitleNode('members');
      this.add(members);
      if (type.initializer) {
        members.add(new InitializerNode(type.initializer, options));
      }
      members.add(...type.ownMethods.map((m) => new MethodNode(m, options)));
      members.add(
        ...type.ownProperties.map((p) => new PropertyNode(p, options)),
      );
    }
  }
}

class InterfaceNode extends AsciiTree {
  public constructor(type: InterfaceType, options: TypeSystemTreeOptions) {
    super(
      `${chalk.gray('interface')} ${chalk.cyan(type.name)}${describeStability(
        type,
        options,
      )}`,
    );

    if (options.inheritance && type.interfaces.length > 0) {
      const interfaces = new TitleNode('interfaces');
      this.add(interfaces);
      interfaces.add(...type.interfaces.map((i) => new TextNode(i.name)));
    }

    if (options.members) {
      const members = new TitleNode('members');
      members.add(...type.ownMethods.map((m) => new MethodNode(m, options)));
      members.add(
        ...type.ownProperties.map((p) => new PropertyNode(p, options)),
      );
      this.add(members);
    }
  }
}

class EnumNode extends AsciiTree {
  public constructor(enumType: EnumType, options: TypeSystemTreeOptions) {
    super(
      `${chalk.gray('enum')} ${chalk.cyan(enumType.name)}${describeStability(
        enumType,
        options,
      )}`,
    );

    if (options.members) {
      enumType.members.forEach((mem) => {
        this.add(new AsciiTree(mem.name + describeStability(mem, options)));
      });
    }
  }
}

class DependencyNode extends AsciiTree {
  public constructor(dep: Dependency, _options: TypeSystemTreeOptions) {
    super(dep.assembly.name);
  }
}

class TitleNode extends AsciiTree {
  public constructor(name: string, children: AsciiTree[] = []) {
    super(chalk.underline(name), ...children);
  }
}

class KeyValueNode extends AsciiTree {
  public constructor(key: string, value: any) {
    super(`${chalk.underline(key)}: ${value}`);
  }
}

class TextNode extends AsciiTree {}

class FlagNode extends AsciiTree {
  public constructor(flag: string) {
    super(chalk.italic(flag));
  }
}

/**
 * Invokes `block` with colors enabled/disabled and reverts to old value afterwards.
 */
function withColors(enabled: boolean, block: () => void) {
  const oldLevel = chalk.level;
  try {
    if (!enabled) {
      chalk.level = 0; // No colors at all
    }

    block();
  } finally {
    chalk.level = oldLevel;
  }
}

function describeStability(
  thing: Documentable,
  options: TypeSystemTreeOptions,
) {
  if (!options.stabilities || thing.docs.stability == null) {
    return '';
  }

  switch (thing.docs.stability) {
    case Stability.Stable:
      return ` (${chalk.green('stable')})`;
    case Stability.External:
      return ` (${chalk.green('external')})`;
    case Stability.Experimental:
      return ` (${chalk.yellow('experimental')})`;
    case Stability.Deprecated:
      return ` (${chalk.red('deprecated')})`;
    default:
      return '';
  }
}

function maybeStatic(mem: Property | Method) {
  let isStatic;
  if (mem instanceof Property) {
    isStatic = !!mem.static;
  }
  if (mem instanceof Method) {
    isStatic = !!mem.static;
  }

  return isStatic ? `${chalk.grey('static')} ` : '';
}
