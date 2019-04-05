import colors = require('colors/safe');
import { AsciiTree } from 'oo-ascii-tree';
import { Assembly } from './assembly';
import { ClassType } from './class';
import { Dependency } from './dependency';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Parameter } from './parameter';
import { Property } from './property';
import { TypeInstance } from './type-instance';
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
}

/**
 * Visualizes a `TypeSystem` as an ASCII tree.
 */
export class TypeSystemTree extends AsciiTree {
  constructor(typesys: TypeSystem, options: TypeSystemTreeOptions = { }) {
    super();

    if (options.showAll) {
      options.dependencies = true;
      options.inheritance = true;
      options.members = true;
      options.signatures = true;
      options.types = true;
    }

    const shouldUseColors = options.colors === undefined ? true : options.colors;
    withColors(shouldUseColors, () => {
      if (typesys.assemblies.length > 0) {
        const assemblies = new TitleNode('assemblies');
        assemblies.add(...typesys.assemblies.map(a => new AssemblyNode(a, options)));
        this.add(assemblies);
      }
    });
  }
}

class AssemblyNode extends AsciiTree {
  constructor(assembly: Assembly, options: TypeSystemTreeOptions) {
    super(colors.green(assembly.name));

    if (options.dependencies && assembly.dependencies.length > 0) {
      const deps = new TitleNode('dependencies');
      this.add(deps);
      deps.add(...assembly.dependencies.map(d => new DependencyNode(d, options)));
    }

    if (options.types) {
      const types = new TitleNode('types');
      this.add(types);
      types.add(...assembly.classes.map(c => new ClassNode(c, options)));
      types.add(...assembly.interfaces.map(c => new InterfaceNode(c, options)));
      types.add(...assembly.enums.map(c => new EnumNode(c, options)));
    }
  }
}

class MethodNode extends AsciiTree {
  constructor(method: Method, options: TypeSystemTreeOptions) {
    const args = method.parameters.map(p => p.name).join(',');
    super(`${method.name}(${args}) ${colors.gray('method')}`);

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
        params.add(...method.parameters.map(p => new ParameterNode(p, options)));
      }

      this.add(new TypeInstanceNode('returns', method.returns));
    }
  }
}

class ParameterNode extends AsciiTree {
  constructor(param: Parameter, _options: TypeSystemTreeOptions) {
    super(param.name);

    this.add(new TypeInstanceNode('type', param.value));
    if (param.variadic) {
      this.add(new FlagNode('variadic'));
    }
  }
}

class PropertyNode extends AsciiTree {
  constructor(property: Property, options: TypeSystemTreeOptions) {
    super(`${property.name} ${colors.gray('property')}`);

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

      this.add(new TypeInstanceNode('type', property.value));
    }
  }
}

class TypeInstanceNode extends AsciiTree {
  constructor(name: string, typeinstance: TypeInstance) {
    super(`${colors.underline(name)}: ${typeinstance}`);
  }
}

class ClassNode extends AsciiTree {
  constructor(type: ClassType, options: TypeSystemTreeOptions) {
    super(`${colors.gray('class')} ${colors.cyan(type.name)}`);

    if (options.inheritance && type.base) {
      this.add(new KeyValueNode('base', type.base.name));
    }

    if (options.inheritance && type.interfaces.length > 0) {
      this.add(new KeyValueNode('interfaces', type.interfaces.map(i => i.name).join(',')));
    }

    if (options.members) {
      const members = new TitleNode('members');
      this.add(members);
      if (type.initializer) {
        members.add(new MethodNode(type.initializer, options));
      }
      members.add(...type.ownMethods.map(m => new MethodNode(m, options)));
      members.add(...type.ownProperties.map(p => new PropertyNode(p, options)));
    }
  }
}

class InterfaceNode extends AsciiTree {
  constructor(type: InterfaceType, options: TypeSystemTreeOptions) {
    super(`${colors.gray('interface')} ${colors.cyan(type.name)}`);

    if (options.inheritance && type.interfaces.length > 0) {
      const interfaces = new TitleNode('interfaces');
      this.add(interfaces);
      interfaces.add(...type.interfaces.map(i => new TextNode(i.name)));
    }

    if (options.members) {
      const members = new TitleNode('members');
      members.add(...type.ownMethods.map(m => new MethodNode(m, options)));
      members.add(...type.ownProperties.map(p => new PropertyNode(p, options)));
      this.add(members);
    }
  }
}

class EnumNode extends AsciiTree {
  constructor(enumType: EnumType, options: TypeSystemTreeOptions) {
    super(`${colors.gray('enum')} ${colors.cyan(enumType.name)}`);

    if (options.members) {
      enumType.members.forEach(mem => {
        this.add(new AsciiTree(mem.name));
      });
    }
  }
}

class DependencyNode extends AsciiTree {
  constructor(dep: Dependency, _options: TypeSystemTreeOptions) {
    super(dep.assembly.name);
  }
}

class TitleNode extends AsciiTree {
  constructor(name: string, children: AsciiTree[] = []) {
    super(colors.underline(name), ...children);
  }
}

class KeyValueNode extends AsciiTree {
  constructor(key: string, value: any) {
    super(`${colors.underline(key)}: ${value}`);
  }
}

class TextNode extends AsciiTree {

}

class FlagNode extends AsciiTree {
  constructor(flag: string) {
    super(colors.italic(flag));
  }
}

/**
 * Invokes `block` with colors enabled/disabled and reverts to old value afterwards.
 */
function withColors(enabled: boolean, block: () => void) {
  const oldEnabled = colors.enabled;
  try {
    if (enabled) {
      colors.enable();
    } else {
      colors.disable();
    }

    block();
  } finally {
    if (oldEnabled) {
      colors.enable();
    } else {
      colors.disable();
    }
  }
}
