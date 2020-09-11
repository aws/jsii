import { Assembly, Type, Submodule } from 'jsii-reflect';

export class DeclarationNode {
  public static of(assembly: Assembly): DeclarationNode {
    const tree = new DeclarationNode('');

    function registerType(type: Type) {
      tree.register(type, DeclarationNode.getTypeName(type).split('.'));
    }

    assembly.types.forEach(registerType);

    function registerSubmodule(submodule: Submodule) {
      submodule.types.forEach(registerType);
      submodule.submodules.forEach(registerSubmodule);
    }

    assembly.submodules.forEach(registerSubmodule);

    return tree;
  }

  private static getTypeName(type: Type): string {
    if (type.namespace) {
      return `${type.namespace}.${type.name}`;
    }

    return type.name;
  }

  private _type?: Type;
  private _children: { [name: string]: DeclarationNode } = {};

  private constructor(public readonly name: string) {}

  public get type(): Type | undefined {
    return this._type;
  }

  public get children(): DeclarationNode[] {
    const children = [];
    for (const key of Object.keys(this._children).sort()) {
      children.push(this._children[key]);
    }
    return children;
  }

  private register(type: Type, path: string[]): this {
    if (path.length === 0) {
      this._type = type;
    } else {
      const [head, ...rest] = path;
      if (!this._children[head]) {
        this._children[head] = new DeclarationNode(head);
      }
      this._children[head]!.register(type, rest);
    }
    return this;
  }
}
