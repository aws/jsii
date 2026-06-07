import * as spec from '@jsii/spec';
import { toSnakeCase, toPascalCase } from 'codemaker';
import * as fs from 'fs-extra';
import * as reflect from 'jsii-reflect';
import * as path from 'path';

import { Generator, Legalese } from '../generator';
import { Target, TargetOptions } from '../target';
import { subprocess } from '../util';
import { VERSION } from '../version';
import { toReleaseVersion, toRubyVersionRange } from './version-utils';

import { TargetName } from './index';

export class RubyTarget extends Target {
  protected readonly generator: RubyGenerator;

  public constructor(options: TargetOptions) {
    super(options);
    this.generator = new RubyGenerator(options);
  }

  public async build(sourceDir: string, outDir: string): Promise<void> {
    const gemName = rubyGemName(this.assembly);

    // Package the generated files into a distributable .gem file
    await subprocess('gem', ['build', `${gemName}.gemspec`], {
      cwd: sourceDir,
    });

    // Copy compiled artifacts safely to the distribution directory
    await this.copyFiles(sourceDir, outDir);
  }
}

function rubyGemName(assembly: {
  name: string;
  targets?: spec.AssemblyTargets;
}): string {
  return (
    (assembly.targets?.ruby?.gem as string | undefined) ??
    assembly.name.replace(/@/g, '').replace(/\//g, '-')
  );
}

/**
 * Escape a string for use inside a Ruby double-quoted ("...") literal.
 * Handles backslash, double-quote, and `#` (otherwise `#{...}` would trigger
 * string interpolation).  Apply at every interpolation site that embeds a
 * jsii-supplied name into generated Ruby source.
 */
function rubyDq(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/#/g, '\\#');
}

/**
 * Escape a string for use inside a Ruby single-quoted ('...') literal.
 * Single-quoted strings only treat `\\` and `\'` specially.
 */
function rubySq(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Escape a string for literal use inside a RegExp pattern.
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Render a JS value as a Ruby expression that evaluates to JSON.parse of the
 * value's canonical JSON encoding.  Base64 keeps the embedded literal safe
 * from any input — no backslashes, quotes, `#{...}`, or newlines to escape.
 * Replaces the previous `%q{${JSON.stringify(...)}}` pattern, which silently
 * mangled any backslash in the JSON (Ruby's `%q{}` does not preserve `\\`).
 */
function rubyJsonLiteral(value: any): string {
  const json = JSON.stringify(value ?? { primitive: 'any' });
  const b64 = Buffer.from(json, 'utf-8').toString('base64');
  return `JSON.parse(Base64.strict_decode64("${b64}"))`;
}

/**
 * Whether a jsii member (method, property, or enum value) is marked
 * `@deprecated` in the source assembly.  Used by the collision-resolution
 * pass to pick a winning member when multiple snake_case to the same name.
 *
 * The reflect API exposes two shapes:
 *   - Plain spec objects (used by enum members `typeSpec.members`):
 *     `docs?.deprecated` is `string | undefined`.
 *   - `Documentable.docs` instances (used by `allProperties` / `allMethods`):
 *     `.docs.deprecated` is a boolean that also reflects the parent type's
 *     deprecation status.
 * We treat any truthy value on either shape as deprecated.
 */
function isDeprecated(member: { docs?: { deprecated?: unknown } }): boolean {
  return !!member.docs?.deprecated;
}

/**
 * A type reference in either of the two shapes this generator handles:
 * jsii-reflect wrappers (members coming off `allProperties`/`allMethods`)
 * or raw spec objects (initializer parameters).  Normalize with
 * {@link RubyGenerator.typeRefSpec} before introspecting.
 */
type RubyTypeRef = reflect.TypeReference | spec.TypeReference;

/**
 * Minimal structural shape of a documentable, typed parameter — satisfied
 * by `reflect.Parameter`, raw `spec.Parameter`, and `reflect.Property`
 * (struct members doubling as constructor keyword arguments).
 */
interface ParamLike {
  readonly name: string;
  readonly type?: RubyTypeRef;
  readonly optional?: boolean;
  readonly variadic?: boolean;
}

/**
 * Minimal structural shape required by the member-collision passes —
 * satisfied by reflect members (whose `docs.deprecated` is a boolean) and
 * raw spec members (where it is a string reason).
 */
interface MemberLike {
  readonly name: string;
  readonly static?: boolean;
  readonly docs?: { readonly deprecated?: unknown };
}

/**
 * Names that must be renamed (with a leading underscore) when used as Ruby
 * method/parameter identifiers.  Includes:
 *   - Ruby keywords (`end`, `class`, `def`, ...).  Using one as a method
 *     name produces a parse error.
 *   - The handful of Object methods the runtime hard-depends on
 *     (`send`, `__send__`) — without these the kernel can't dispatch back
 *     into a Ruby override.
 *   - Names the Ruby object model or the jsii runtime itself depends on:
 *     `initialize` (a member by that name would silently replace the
 *     generated constructor), `new` / `allocate` (class methods used to
 *     instantiate proxies — the registry hydrates refs via
 *     `klass.allocate`), `to_jsii` (struct serialization) and `ruby_class`
 *     (internal dispatch helper).
 *   - Additionally (not in this set — see `rubyName`): any name beginning
 *     with `jsii_` is prefixed, so generated members can never shadow the
 *     runtime's own API surface (`jsii_ref`, `jsii_serialize`,
 *     `jsii_call_method`, `jsii_properties`, ...), present or future.
 *
 * Other Object/Kernel methods (`method`, `methods`, `inspect`, `to_s`,
 * `hash`, ...) are deliberately NOT renamed: jsii-calc and real-world
 * assemblies use these names for legitimate JSII methods, and the
 * shadowing cost is mild (those methods are still reachable via
 * `Object.instance_method(:foo).bind(self).call(...)` or `__send__`).
 *
 * Must stay in sync with `Jsii::Utils::RUBY_RESERVED_NAMES` in
 * packages/@jsii/ruby-runtime/lib/jsii/utils.rb (enforced by a spec in
 * packages/@jsii/ruby-runtime-test/spec/unit/utils_spec.rb), so kernel
 * callbacks dispatch to the renamed member.
 */
const RUBY_RESERVED_NAMES = new Set([
  // Keywords
  'alias',
  'and',
  'begin',
  'break',
  'case',
  'class',
  'def',
  // NB: unreachable — toSnakeCase strips the question mark before lookup —
  // kept so the list reads as the complete Ruby keyword set.
  'defined?',
  'do',
  'else',
  'elsif',
  'end',
  'ensure',
  'false',
  'for',
  'if',
  'in',
  'module',
  'next',
  'nil',
  'not',
  'or',
  'redo',
  'rescue',
  'retry',
  'return',
  'self',
  'super',
  'then',
  'true',
  'undef',
  'unless',
  'until',
  'when',
  'while',
  'yield',
  // Hard runtime dependencies (callbacks use `__send__` for dispatch).
  'send',
  '__send__',
  // Ruby object-model / jsii-runtime hooks (see doc comment above).
  'initialize',
  'new',
  'allocate',
  'to_jsii',
  'ruby_class',
]);

export class RubyGenerator extends Generator {
  public constructor(options: TargetOptions) {
    super({ runtimeTypeChecking: options.runtimeTypeChecking });
    // Ruby convention is 2-space indentation (CodeMaker defaults to 4).
    this.code.indentation = 2;
  }

  /**
   * Normalize a type reference to its raw `spec.TypeReference` shape.
   * Call sites hold two shapes: jsii-reflect `TypeReference` instances
   * (which wrap the raw spec under `.spec`) for members coming off
   * `allProperties` / `allMethods`, and raw spec objects for
   * `typeSpec.spec.initializer.parameters`.  Collection/union introspection
   * only works on the raw shape.
   */
  private typeRefSpec(
    type: RubyTypeRef | undefined,
  ): spec.TypeReference | undefined {
    if (type instanceof reflect.TypeReference) {
      return type.spec;
    }
    return type;
  }

  private isStructFqn(fqn: string): boolean {
    const type = this.reflectAssembly.system.tryFindFqn(fqn);
    return !!(type?.isInterfaceType() && type?.isDataType());
  }

  /**
   * Extract the raw `spec.Docs` from either shape we hold: jsii-reflect
   * objects wrap it under `.spec.docs`; plain spec objects (enum members,
   * initializer parameters) carry `.docs` directly.  Genuinely dual-shape,
   * hence the `any` — reflect `Docs` instances also satisfy the returned
   * type structurally (their getters mirror spec.Docs, except `deprecated`
   * which is a boolean; emitDocs handles both).
   */
  private rawDocs(obj: any): spec.Docs | undefined {
    return obj?.spec?.docs ?? obj?.docs;
  }

  /**
   * Render a jsii type reference as a YARD type string for `@param` /
   * `@return` tags.
   */
  private rubyDocType(ref: spec.TypeReference | undefined): string {
    if (!ref) {
      return 'Object';
    }
    if (spec.isPrimitiveTypeReference(ref)) {
      switch (ref.primitive) {
        case spec.PrimitiveType.String:
          return 'String';
        case spec.PrimitiveType.Number:
          return 'Numeric';
        case spec.PrimitiveType.Boolean:
          return 'Boolean';
        case spec.PrimitiveType.Date:
          return 'DateTime';
        case spec.PrimitiveType.Json:
          return 'Hash';
        case spec.PrimitiveType.Any:
          return 'Object';
      }
    }
    if (spec.isNamedTypeReference(ref)) {
      return this.rubyFullTypeName(ref.fqn);
    }
    if (spec.isCollectionTypeReference(ref)) {
      const elem = this.rubyDocType(ref.collection.elementtype);
      return ref.collection.kind === spec.CollectionKind.Array
        ? `Array<${elem}>`
        : `Hash{String => ${elem}}`;
    }
    if (spec.isUnionTypeReference(ref)) {
      return ref.union.types.map((t) => this.rubyDocType(t)).join(', ');
    }
    return 'Object';
  }

  /**
   * Render a jsii type reference as an RBS type expression (for `sig/`
   * declarations).  Same recursion as {@link rubyDocType}, but RBS surface
   * syntax and honest escape hatches: `any`/`json` become `untyped` (not a
   * concrete class), booleans are the `bool` built-in, collections use
   * `[...]`, unions use `|`.  When `optional` is set, the result is wrapped
   * nilable (`T?`).
   */
  private rbsType(
    ref: spec.TypeReference | undefined,
    optional = false,
  ): string {
    const bare = this.rbsTypeBare(ref);
    // `untyped` already admits nil; don't double-decorate.
    return optional && bare !== 'untyped' ? `${bare}?` : bare;
  }

  private rbsTypeBare(ref: spec.TypeReference | undefined): string {
    if (!ref) {
      return 'untyped';
    }
    if (spec.isPrimitiveTypeReference(ref)) {
      switch (ref.primitive) {
        case spec.PrimitiveType.String:
          return 'String';
        case spec.PrimitiveType.Number:
          return 'Numeric';
        case spec.PrimitiveType.Boolean:
          return 'bool';
        case spec.PrimitiveType.Date:
          return 'DateTime';
        // `json` is recursively any-shaped and `any` is the escape hatch;
        // both are honestly `untyped` rather than a flattened Hash/Object.
        case spec.PrimitiveType.Json:
        case spec.PrimitiveType.Any:
          return 'untyped';
      }
    }
    if (spec.isNamedTypeReference(ref)) {
      return `::${this.rubyFullTypeName(ref.fqn)}`;
    }
    if (spec.isCollectionTypeReference(ref)) {
      const elem = this.rbsTypeBare(ref.collection.elementtype);
      return ref.collection.kind === spec.CollectionKind.Array
        ? `Array[${elem}]`
        : `Hash[String, ${elem}]`;
    }
    if (spec.isUnionTypeReference(ref)) {
      const arms = [
        ...new Set(ref.union.types.map((t) => this.rbsTypeBare(t))),
      ];
      // A bare `A | B` collides with RBS's method-overload separator, so
      // unions must be parenthesized to be valid in return/param position.
      return arms.length === 1 ? arms[0] : `(${arms.join(' | ')})`;
    }
    return 'untyped';
  }

  /**
   * Emit a block of text as `#`-prefixed comment lines.
   */
  private emitDocLines(text: string): void {
    for (const line of text.split('\n')) {
      const trimmed = line.trimEnd();
      this.code.line(trimmed === '' ? '#' : `# ${trimmed}`);
    }
  }

  /**
   * Collapse text for interpolation into a single-line YARD tag.  Doc text
   * (e.g. `docs.returns`) may contain newlines, which would leak subsequent
   * lines out of the comment and into generated code.
   */
  private inlineDoc(text: string): string {
    return text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '')
      .join(' ');
  }

  /**
   * Emit a YARD documentation comment from jsii docs: summary and remarks
   * as free text, followed by `@param` / `@return` / `@deprecated` /
   * `@see` / `@example` tags as applicable.  Silently emits nothing when
   * there are no docs and no tags to write.
   */
  private emitDocs(
    docsSource: unknown,
    opts: {
      /** Parameters (raw spec or reflect) to render as @param tags. */
      params?: readonly ParamLike[];
      /** The method's raw `returns` OptionalValue; pass with isMethod. */
      returns?: spec.OptionalValue;
      /** Emit `@return [void]` when a method declares no return type. */
      isMethod?: boolean;
      /** Property getter: emit an @return of the property's type. */
      propertyType?: RubyTypeRef;
      propertyOptional?: boolean;
    } = {},
  ): void {
    const docs: spec.Docs = this.rawDocs(docsSource) ?? {};
    const tags: string[] = [];

    for (const p of opts.params ?? []) {
      const pDocs: spec.Docs = this.rawDocs(p) ?? {};
      const baseType = this.rubyDocType(this.typeRefSpec(p.type));
      const rendered = p.variadic
        ? `Array<${baseType}>`
        : `${baseType}${p.optional ? ', nil' : ''}`;
      const summary = pDocs.summary ? ` ${this.inlineDoc(pDocs.summary)}` : '';
      tags.push(`# @param ${this.rubyName(p.name)} [${rendered}]${summary}`);
    }

    if (opts.returns?.type) {
      const t = this.rubyDocType(this.typeRefSpec(opts.returns.type));
      const optional = opts.returns.optional ? ', nil' : '';
      const text = docs.returns ? ` ${this.inlineDoc(docs.returns)}` : '';
      tags.push(`# @return [${t}${optional}]${text}`);
    } else if (opts.isMethod) {
      tags.push('# @return [void]');
    } else if (opts.propertyType) {
      const t = this.rubyDocType(this.typeRefSpec(opts.propertyType));
      tags.push(`# @return [${t}${opts.propertyOptional ? ', nil' : ''}]`);
    }

    if (docs.default !== undefined) {
      tags.push(`# @note Default: ${this.inlineDoc(docs.default)}`);
    }
    if (docs.deprecated !== undefined) {
      const reason =
        typeof docs.deprecated === 'string'
          ? ` ${this.inlineDoc(docs.deprecated)}`
          : '';
      tags.push(`# @deprecated${reason}`);
    }
    if (docs.see) {
      tags.push(`# @see ${this.inlineDoc(docs.see)}`);
    }

    const exampleLines = docs.example
      ? [
          '# @example',
          ...docs.example
            .split('\n')
            .map((l) => `#   ${l.trimEnd()}`.trimEnd()),
        ]
      : [];

    const hasText = !!docs.summary || !!docs.remarks;
    if (!hasText && tags.length === 0 && exampleLines.length === 0) {
      return;
    }

    if (docs.summary) {
      this.emitDocLines(docs.summary);
    }
    if (docs.remarks) {
      this.code.line('#');
      this.emitDocLines(docs.remarks);
    }
    if (tags.length > 0 || exampleLines.length > 0) {
      if (hasText) {
        this.code.line('#');
      }
      for (const tag of tags) {
        this.code.line(tag);
      }
      for (const line of exampleLines) {
        this.code.line(line);
      }
    }
  }

  public async save(outdir: string, tarball: string, legalese: Legalese) {
    const assembly = this.reflectAssembly;

    // Define the output path for the main Ruby library file
    const srcFile = path.join('lib', `${assembly.name}.rb`);
    this.code.openFile(srcFile);

    // Emit the core runtime dependency requirement
    this.emitHeader();

    // Pre-declare external dependencies to avoid NameErrors before opening our main module
    const dependencies = Object.keys(assembly.spec.dependencies ?? {});
    this.emitDependencies(dependencies);

    const assemblyModule = this.rubyModuleForAssembly(assembly.name);
    const moduleParts = assemblyModule.split('::');
    let currentModule = '';
    for (const part of moduleParts) {
      currentModule = currentModule ? `${currentModule}::${part}` : part;
      this.code.line(`module ${currentModule}; end`);
    }

    this.code.open(`module ${assemblyModule}`);

    // Load assembly dynamically
    const tarballName = this.getAssemblyFileName();
    this.code.line(
      `Jsii::Assembly.load('${rubySq(assembly.name)}', '${rubySq(assembly.version)}', File.expand_path('${rubySq(tarballName)}', __dir__))`,
    );
    this.code.line('');

    // Pre-declare local JSII namespaces
    const classRubyPaths = this.collectClassRubyPaths();
    this.emitLocalNamespacePredeclarations(classRubyPaths);

    // Topologically sort the assembly's types so that everything a type's
    // *declaration line* references (superclass, included interface
    // modules, lexically enclosing type) is emitted before the type itself.
    const typesByFqn = new Map(assembly.allTypes.map((t) => [t.fqn, t]));
    const sortedTypes: reflect.Type[] = [];
    const visited = new Set<string>();

    const visit = (type: reflect.Type) => {
      if (visited.has(type.fqn)) return;
      visited.add(type.fqn);

      // Visit base class
      if (type.isClassType() && type.spec.base) {
        const base = typesByFqn.get(type.spec.base);
        if (base) visit(base);
      }

      // Visit implemented interfaces
      const interfaces =
        type.isClassType() || type.isInterfaceType()
          ? (type.spec.interfaces ?? [])
          : [];
      for (const ifaceFqn of interfaces) {
        const iface = typesByFqn.get(ifaceFqn);
        if (iface) visit(iface);
      }

      // Visit declaring parent for nested types
      const fqnParts = type.fqn.split('.');
      if (fqnParts.length > 2) {
        const parentType = typesByFqn.get(fqnParts.slice(0, -1).join('.'));
        if (parentType) visit(parentType);
      }

      sortedTypes.push(type);
    };

    for (const type of assembly.allTypes) {
      visit(type);
    }

    // Group types for lazy (autoload) emission: each *namespace-direct* type
    // gets its own file; types nested under a class are bundled into that
    // class's file (they can't be independently autoloaded — declaring the
    // autoload would reference, and thus force-load, the enclosing class).
    const ownerOf = (t: reflect.Type): reflect.Type => {
      let cur = t;
      for (;;) {
        const parentFqn = cur.fqn.split('.').slice(0, -1).join('.');
        const parent = typesByFqn.get(parentFqn);
        if (parent && parent.isClassType()) {
          cur = parent; // nested under a class → bundle into it
          continue;
        }
        return cur;
      }
    };
    const groups = new Map<string, reflect.Type[]>(); // owner fqn → members
    for (const type of sortedTypes) {
      const owner = ownerOf(type);
      const bucket = groups.get(owner.fqn) ?? [];
      bucket.push(type);
      groups.set(owner.fqn, bucket);
    }

    // The loader (lib/<assembly>.rb) is required eagerly; it declares the
    // module skeleton, loads the assembly into the kernel, and registers an
    // `autoload` + runtime path for each owner type — but defines no bodies.
    for (const [ownerFqn, members] of groups) {
      const owner = typesByFqn.get(ownerFqn)!;
      const requirePath = this.rubyRequirePath(owner.fqn);
      const enclosing = this.rubyEnclosingModule(owner.fqn);
      const constName = this.rubyModuleName(owner.name);
      // A `Module#autoload` covers constant references in user code — but only
      // for the namespace-direct owner: you can't autoload a constant nested
      // under a class without referencing (and thus force-loading) that class.
      this.code.line(
        `${enclosing}.autoload(:${constName}, '${rubySq(requirePath)}')`,
      );
      // `register_autoload` covers the kernel handing back an fqn the user
      // never named. Register *every* member against the owner's file —
      // including the nested-under-class types bundled into it — so a
      // kernel-returned nested type still hydrates to its real proxy even when
      // its owner was never referenced.
      for (const member of members) {
        this.code.line(
          `Jsii::Object.register_autoload("${rubyDq(member.fqn)}", '${rubySq(requirePath)}')`,
        );
      }
    }

    this.code.close('end');
    this.code.closeFile(srcFile);

    // One file per owner, defining the owner type and any types nested under
    // it, using fully-qualified (compact) headers — the loader has already
    // declared the namespace modules, and is always required first.
    for (const [ownerFqn, members] of groups) {
      const owner = typesByFqn.get(ownerFqn)!;
      const typeFile = path.join(
        'lib',
        `${this.rubyRequirePath(owner.fqn)}.rb`,
      );
      this.code.openFile(typeFile);
      this.code.line("require 'jsii'");
      this.code.line('');
      for (const type of members) {
        const prefix = `${this.rubyEnclosingModule(type.fqn)}::`;
        if (type.isEnumType()) {
          this.emitEnumType(type, prefix);
        } else if (type.isInterfaceType()) {
          this.emitInterfaceType(type, prefix);
        } else if (type.isClassType()) {
          this.emitClassType(type, prefix);
        }
      }
      this.code.closeFile(typeFile);
    }

    // Generate the gemspec manifest file for package management
    await this.generateGemspec(outdir);

    // Emit RBS type signatures alongside the generated code (sig/), giving
    // Steep/TypeProf users static type checking and editor completion.
    await this.generateRbs(outdir, sortedTypes);

    return super.save(outdir, tarball, legalese);
  }

  private emitHeader(): void {
    this.code.line("require 'jsii'");
    this.code.line("require 'json'");
    this.code.line("require 'base64'");
    this.code.line('');
  }

  private emitDependencies(dependencies: string[]): void {
    for (const dep of dependencies) {
      this.code.line(`require '${rubySq(dep)}'`);
    }
    if (dependencies.length > 0) {
      this.code.line('');
    }

    const preDeclaredRubyModules = new Set<string>();
    for (const dep of dependencies) {
      const moduleName = this.rubyModuleForAssembly(dep);
      let current = '';
      for (const part of moduleName.split('::')) {
        current = current ? `${current}::${part}` : part;
        preDeclaredRubyModules.add(current);
      }
    }
    for (const mod of Array.from(preDeclaredRubyModules).sort(
      (a, b) => a.split('::').length - b.split('::').length,
    )) {
      this.code.line(`module ${mod}; end`);
    }
  }

  private emitLocalNamespacePredeclarations(classRubyPaths: Set<string>): void {
    const pureRubyNamespaces = new Set<string>();

    for (const type of this.reflectAssembly.allTypes) {
      if (!type.namespace) continue;

      const relNamespace = this.relativeRubyNamespace(type.fqn);
      if (!relNamespace) continue;

      let current = '';
      for (const part of relNamespace.split('::')) {
        current = current ? `${current}::${part}` : part;
        if (classRubyPaths.has(current)) continue;
        pureRubyNamespaces.add(current);
      }
    }

    const sortedNamespaces = Array.from(pureRubyNamespaces).sort(
      (a, b) => a.split('::').length - b.split('::').length,
    );

    for (const ns of sortedNamespaces) {
      this.code.line(`module ${ns}; end`);
    }
    this.code.line('');
  }

  private emitEnumType(typeSpec: reflect.EnumType, prefix: string): void {
    const resolvedMembers = this.dedupByRubyName(
      typeSpec.members,
      (m) => this.rubyConstName(m.name),
      typeSpec.fqn,
    );
    this.emitDocs(typeSpec);
    this.code.open(`module ${prefix}${this.rubyModuleName(typeSpec.name)}`);
    for (const member of resolvedMembers) {
      this.emitDocs(member);
      this.code.line(
        `${this.rubyConstName(member.name)} = Jsii::Enum.new("${rubyDq(typeSpec.fqn)}", "${rubyDq(member.name)}")`,
      );
    }
    this.code.close('end');
    this.code.line('');
  }

  private emitInterfaceType(
    typeSpec: reflect.InterfaceType,
    prefix: string,
  ): void {
    // For datatype interfaces (structs) the methods list is empty by
    // construction — the jsii compiler forbids methods on them — so the
    // method side of the dedup below is a no-op in that branch.
    const { props: resolvedAllProperties, methods: resolvedAllMethods } =
      this.dedupCrossCategory(
        this.dedupByRubyName(
          typeSpec.allProperties,
          (p) => this.rubyName(p.name),
          typeSpec.fqn,
        ),
        this.dedupByRubyName(
          typeSpec.allMethods,
          (m) => this.rubyName(m.name),
          typeSpec.fqn,
        ),
        (p) => this.rubyName(p.name),
        (m) => this.rubyName(m.name),
        typeSpec.fqn,
      );
    const kind = typeSpec.datatype ? 'class' : 'module';
    const rubyName = this.rubyModuleName(typeSpec.name);

    const bases = typeSpec.spec.interfaces ?? [];
    const baseMixins = bases.map((b) => `::${this.rubyFullTypeName(b)}`);
    // JSII structs may extend several parents (diamond hierarchies), but a
    // Ruby class has a single superclass: subclass the first parent and
    // record the rest via `jsii_extra_struct_bases` so is_a?/kind_of?/case
    // dispatch honor every declared parent (see Jsii::Struct).  Members are
    // unaffected either way — allProperties flattens the full hierarchy.
    const baseString =
      typeSpec.datatype && bases.length > 0
        ? ` < ${baseMixins[0]}`
        : typeSpec.datatype
          ? ' < Jsii::Struct'
          : '';

    this.emitDocs(typeSpec);
    this.code.open(`${kind} ${prefix}${rubyName}${baseString}`);

    if (!typeSpec.datatype) {
      for (const mixin of baseMixins) {
        this.code.line(`include ${mixin}`);
      }
    }

    this.code.line(
      `Jsii::Object.register_jsii_fqn("${rubyDq(typeSpec.fqn)}", self)`,
    );
    if (typeSpec.datatype && baseMixins.length > 1) {
      this.code.line(
        `jsii_extra_struct_bases.push(${baseMixins.slice(1).join(', ')})`,
      );
    }
    this.code.line('');

    if (typeSpec.datatype) {
      const props = resolvedAllProperties;

      const initArgs = props
        .map((p) => {
          const name = this.rubyName(p.name);
          return p.optional ? `${name}: nil` : `${name}:`;
        })
        .join(', ');

      // Struct members double as constructor keyword arguments — document
      // them as @params (each carries its own summary/type/optionality).
      this.emitDocs(undefined, { params: props });
      this.code.open(`def initialize(${initArgs})`);
      for (const prop of props) {
        const rubyName = this.rubyName(prop.name);
        this.emitStructCoercion(rubyName, prop.type, {
          assignment: `@${rubyName}`,
        });
        // Validate the (coerced) member value — structs are the main
        // vehicle for user-supplied data, so they get the same runtime
        // type checking as method/constructor parameters.
        this.emitTypeChecking(`@${rubyName}`, prop.type, prop.name, {
          isOptional: prop.optional,
        });
      }
      this.code.close('end');
      this.code.line('');

      for (const prop of props) {
        this.emitDocs(prop, {
          propertyType: prop.type,
          propertyOptional: prop.optional,
        });
        this.code.line(`attr_reader :${this.rubyName(prop.name)}`);
      }
      this.code.line('');

      this.code.open('def self.jsii_properties');
      this.code.open('{');
      for (const prop of props) {
        this.code.line(
          `:${this.rubyName(prop.name)} => "${rubyDq(prop.name)}",`,
        );
      }
      this.code.close('}');
      this.code.close('end');
      this.code.line('');

      this.code.open('def to_jsii');
      this.code.line('result = {}');
      if (bases.length > 0) {
        this.code.line('result.merge!(super)');
      }
      this.code.open('result.merge!({');
      for (const prop of props) {
        this.code.line(
          `"${rubyDq(prop.name)}" => @${this.rubyName(prop.name)},`,
        );
      }
      this.code.close('})');
      this.code.line('result.compact');
      this.code.close('end');
    } else {
      for (const prop of resolvedAllProperties) {
        const propRubyName = this.rubyName(prop.name);
        this.emitDocs(prop, {
          propertyType: prop.type,
          propertyOptional: prop.optional,
        });
        this.code.open(`def ${propRubyName}()`);
        this.code.line(`jsii_get_property("${rubyDq(prop.name)}")`);
        this.code.close(`end`);
        this.code.line('');
        if (!prop.immutable) {
          this.code.open(`def ${propRubyName}=(value)`);
          this.emitStructCoercion('value', prop.type);
          this.emitTypeChecking('value', prop.type, prop.name, {
            isOptional: prop.optional,
          });
          this.code.line(`jsii_set_property("${rubyDq(prop.name)}", value)`);
          this.code.close('end');
          this.code.line('');
        }
      }

      for (const method of resolvedAllMethods) {
        const sigParams = method.parameters
          .map((p) => {
            const rubyParam = this.rubyName(p.name);
            if (p.variadic) return `*${rubyParam}`;
            return p.optional ? `${rubyParam} = nil` : rubyParam;
          })
          .join(', ');
        const callParams = method.parameters
          .map((p) => {
            const rubyParam = this.rubyName(p.name);
            if (p.variadic) return `*${rubyParam}`;
            return rubyParam;
          })
          .join(', ');
        this.emitDocs(method, {
          params: method.parameters,
          returns: method.spec?.returns,
          isMethod: true,
        });
        this.code.open(`def ${this.rubyName(method.name)}(${sigParams})`);
        for (const p of method.parameters) {
          const rubyParam = this.rubyName(p.name);
          this.emitStructCoercion(rubyParam, p.type, {
            variadic: p.variadic,
          });
          this.emitTypeChecking(rubyParam, p.type, p.name, {
            isOptional: p.optional,
            isVariadic: p.variadic,
          });
        }
        if (method.async) {
          this.code.line(
            `jsii_async_call_method("${rubyDq(method.name)}", [${callParams}])`,
          );
        } else {
          this.code.line(
            `jsii_call_method("${rubyDq(method.name)}", [${callParams}])`,
          );
        }
        this.code.close('end');
        this.code.line('');
      }

      this.code.open('def self.jsii_overridable_methods');
      this.code.open('{');
      for (const prop of resolvedAllProperties) {
        const isOptional = prop.optional ? 'true' : 'false';
        this.code.line(
          `:${this.rubyName(prop.name)} => { kind: :property, name: "${rubyDq(prop.name)}", is_optional: ${isOptional} },`,
        );
      }
      for (const method of resolvedAllMethods) {
        this.code.line(
          `:${this.rubyName(method.name)} => { kind: :method, name: "${rubyDq(method.name)}", is_optional: false },`,
        );
      }
      this.code.close('}');
      this.code.close('end');
    }

    this.code.close('end');
    this.code.line('');
  }

  private emitClassType(typeSpec: reflect.ClassType, prefix: string): void {
    // Deliberately iterate the *flattened* member lists (allProperties /
    // allMethods): every class re-emits inherited instance members, so each
    // generated class carries its own forwarding stub for every member it
    // exposes — which is what makes `super` work in guest overrides of
    // inherited members.  The output bloat (O(depth × members)) is the
    // accepted cost; statics are the exception (emitted on their defining
    // class only, see isOwnStatic below).
    const { props: resolvedAllProperties, methods: resolvedAllMethods } =
      this.dedupCrossCategory(
        this.dedupByRubyName(
          typeSpec.allProperties,
          (p) => this.rubyPropertyName(p),
          typeSpec.fqn,
        ),
        this.dedupByRubyName(
          typeSpec.allMethods,
          (m) => this.rubyMethodName(m),
          typeSpec.fqn,
        ),
        (p) => this.rubyPropertyName(p),
        (m) => this.rubyMethodName(m),
        typeSpec.fqn,
      );
    const rubyName = this.rubyModuleName(typeSpec.name);

    const baseFqn = typeSpec.spec.base;
    let baseClass = 'Jsii::Object';
    if (baseFqn) {
      baseClass = `::${this.rubyFullTypeName(baseFqn)}`;
    }

    const interfaces = typeSpec.spec.interfaces ?? [];
    const interfaceMixins = interfaces.map(
      (i) => `::${this.rubyFullTypeName(i)}`,
    );

    this.emitDocs(typeSpec);
    this.code.open(`class ${prefix}${rubyName} < ${baseClass}`);

    for (const mixin of interfaceMixins) {
      this.code.line(`include ${mixin}`);
    }
    this.code.line(`self.jsii_fqn = "${rubyDq(typeSpec.fqn)}"`);
    this.code.line(
      `Jsii::Object.register_jsii_fqn("${rubyDq(typeSpec.fqn)}", self)`,
    );
    this.code.line('');

    const initializer = typeSpec.spec.initializer;
    if (
      initializer &&
      initializer.parameters &&
      initializer.parameters.length > 0
    ) {
      const initParams = initializer.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return p.optional ? `${rubyParam} = nil` : rubyParam;
        })
        .join(', ');

      this.emitDocs(initializer, { params: initializer.parameters });
      this.code.open(`def initialize(${initParams})`);
      for (const p of initializer.parameters) {
        const rubyParam = this.rubyName(p.name);
        this.emitStructCoercion(rubyParam, p.type);
      }
      const superArgs = initializer.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return rubyParam;
        })
        .join(', ');

      for (const p of initializer.parameters) {
        const rubyParam = this.rubyName(p.name);
        this.emitTypeChecking(rubyParam, p.type, p.name, {
          isOptional: p.optional,
          isVariadic: p.variadic,
        });
      }

      this.code.line(
        `Jsii::Object.instance_method(:initialize).bind(self).call(${superArgs})`,
      );
      this.code.close('end');
    } else if (initializer) {
      // Parameterless constructor (the jsii compiler propagates initializer
      // entries onto instantiable subclasses, so a missing parameter list
      // here really means "takes no arguments" — enforce that arity rather
      // than silently forwarding stray args to the kernel).
      this.code.open('def initialize');
      this.code.line(
        'Jsii::Object.instance_method(:initialize).bind(self).call',
      );
      this.code.close('end');
    } else {
      // No initializer entry at all: jsii emits this for classes whose
      // constructor is not visible (private).  Instances only ever come
      // from factory methods and are hydrated via `allocate`, which never
      // calls #initialize — so constructing one from Ruby is always a bug.
      // Raise eagerly with a pointer to the factories instead of letting
      // the kernel reject the create call with a less helpful error.
      this.code.open('def initialize(*args)');
      this.code.line(
        `raise NoMethodError, "${rubyDq(typeSpec.fqn)} does not have a visible constructor; use the provided factory methods"`,
      );
      this.code.close('end');
    }
    this.code.line('');

    // Static members are emitted only on their *defining* class.  Ruby
    // inherits singleton methods, which matches the ES6 static-inheritance
    // semantics the kernel implements (its method/property lookups walk the
    // base chain, and the base's stub carries the base fqn).  Re-emitting an
    // inherited static here would bake the *derived* fqn into the kernel
    // call instead.  A child that overrides a static still gets its own
    // stub, because allMethods/allProperties yield the most-derived
    // declaration (see the StaticHelloParent/Child fixture in jsii-calc).
    const isOwnStatic = (m: reflect.Property | reflect.Method) =>
      m.definingType.fqn === typeSpec.fqn;

    const overridableMethods = resolvedAllMethods.filter((m) => !m.static);
    const overridableProps = resolvedAllProperties.filter((p) => !p.static);

    this.code.open('def self.jsii_overridable_methods');
    this.code.open('{');
    for (const prop of overridableProps) {
      const rubyName = this.rubyName(prop.name);
      const isOptional = prop.optional ? 'true' : 'false';
      this.code.line(
        `:${rubyName} => { kind: :property, name: "${rubyDq(prop.name)}", is_optional: ${isOptional} },`,
      );
    }
    for (const method of overridableMethods) {
      const rubyName = this.rubyName(method.name);
      this.code.line(
        `:${rubyName} => { kind: :method, name: "${rubyDq(method.name)}", is_optional: false },`,
      );
    }
    this.code.close('}');
    this.code.close('end');
    this.code.line('');

    for (const method of resolvedAllMethods) {
      if (!method.static || !isOwnStatic(method)) continue;

      const sigParams = method.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return p.optional ? `${rubyParam} = nil` : rubyParam;
        })
        .join(', ');

      const callParams = method.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return rubyParam;
        })
        .join(', ');

      this.emitDocs(method, {
        params: method.parameters,
        returns: method.spec?.returns,
        isMethod: true,
      });
      this.code.open(`def self.${this.rubyMethodName(method)}(${sigParams})`);
      for (const p of method.parameters) {
        const rubyParam = this.rubyName(p.name);
        this.emitStructCoercion(rubyParam, p.type, {
          variadic: p.variadic,
        });
        this.emitTypeChecking(rubyParam, p.type, p.name, {
          isOptional: p.optional,
          isVariadic: p.variadic,
        });
      }
      this.code.line(
        `Jsii::Kernel.instance.call_static("${rubyDq(typeSpec.fqn)}", "${rubyDq(method.name)}", [${callParams}])`,
      );
      this.code.close('end');
      this.code.line('');
    }

    for (const prop of resolvedAllProperties) {
      if (prop.static && !isOwnStatic(prop)) continue;

      const rubyName = this.rubyPropertyName(prop);

      if (prop.static) {
        this.emitDocs(prop, {
          propertyType: prop.type,
          propertyOptional: prop.optional,
        });
        this.code.open(`def self.${rubyName}()`);
        this.code.line(
          `Jsii::Kernel.instance.get_static("${rubyDq(typeSpec.fqn)}", "${rubyDq(prop.name)}")`,
        );
        this.code.close(`end`);
        this.code.line('');

        if (!prop.immutable) {
          this.code.open(`def self.${rubyName}=(value)`);
          this.emitStructCoercion('value', prop.type);
          this.emitTypeChecking('value', prop.type, prop.name, {
            isOptional: prop.optional,
          });
          this.code.line(
            `Jsii::Kernel.instance.set_static("${rubyDq(typeSpec.fqn)}", "${rubyDq(prop.name)}", value)`,
          );
          this.code.close('end');
          this.code.line('');
        }
      } else {
        this.emitDocs(prop, {
          propertyType: prop.type,
          propertyOptional: prop.optional,
        });
        this.code.open(`def ${rubyName}()`);
        this.code.line(`jsii_get_property("${rubyDq(prop.name)}")`);
        this.code.close(`end`);
        this.code.line('');

        if (!prop.immutable) {
          this.code.open(`def ${rubyName}=(value)`);
          this.emitStructCoercion('value', prop.type);
          this.emitTypeChecking('value', prop.type, prop.name, {
            isOptional: prop.optional,
          });
          this.code.line(`jsii_set_property("${rubyDq(prop.name)}", value)`);
          this.code.close('end');
          this.code.line('');
        }
      }
    }

    for (const method of resolvedAllMethods) {
      if (method.static) continue;

      const sigParams = method.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return p.optional ? `${rubyParam} = nil` : rubyParam;
        })
        .join(', ');

      const callParams = method.parameters
        .map((p) => {
          const rubyParam = this.rubyName(p.name);
          if (p.variadic) return `*${rubyParam}`;
          return rubyParam;
        })
        .join(', ');

      this.emitDocs(method, {
        params: method.parameters,
        returns: method.spec?.returns,
        isMethod: true,
      });
      this.code.open(`def ${this.rubyMethodName(method)}(${sigParams})`);
      for (const p of method.parameters) {
        const rubyParam = this.rubyName(p.name);
        this.emitStructCoercion(rubyParam, p.type, {
          variadic: p.variadic,
        });
        this.emitTypeChecking(rubyParam, p.type, p.name, {
          isOptional: p.optional,
          isVariadic: p.variadic,
        });
      }
      if (method.async) {
        this.code.line(
          `jsii_async_call_method("${rubyDq(method.name)}", [${callParams}])`,
        );
      } else {
        this.code.line(
          `jsii_call_method("${rubyDq(method.name)}", [${callParams}])`,
        );
      }
      this.code.close('end');
      this.code.line('');
    }

    this.code.close('end');
    this.code.line('');
  }

  private rubyFullTypeName(fqn: string): string {
    if (fqn === 'any') return 'Object';

    const segments = fqn.split('.');
    const assemblyName = segments[0];
    const config =
      assemblyName === this.assembly.name
        ? this.assembly
        : this.assembly.dependencyClosure?.[assemblyName];

    if (!config) {
      // Unknown assembly: no acronym configuration is available for it.
      const assemblyModule = this.rubyModuleName(assemblyName, []);
      return [
        assemblyModule,
        ...segments.slice(1).map((p) => this.rubyModuleName(p, [])),
      ].join('::');
    }

    // Names in this fqn belong to `config`'s assembly — apply *its*
    // acronym configuration, not the pooled closure's.
    const acronyms = this.assemblyAcronyms(config);
    const assemblyModule =
      config.targets?.ruby?.module ??
      this.rubyModuleName(assemblyName, acronyms);
    const result = [];

    for (let len = segments.length; len > 0; len--) {
      const submoduleFqn = segments.slice(0, len).join('.');

      if (submoduleFqn === assemblyName) {
        result.unshift(assemblyModule);
        break;
      }

      const submoduleConfig = config.submodules?.[submoduleFqn];
      const explicitModule = submoduleConfig?.targets?.ruby?.module;

      if (explicitModule) {
        result.unshift(explicitModule);
        break;
      }

      result.unshift(this.rubyModuleName(segments[len - 1], acronyms));
    }

    return result.join('::');
  }

  /**
   * The fully-qualified Ruby module that encloses a type — its full Ruby
   * name minus the final segment (e.g. `JsiiCalc::Composition` for
   * `CompositeOperation`).  Used to declare an `autoload` on the right
   * module and to emit compact `class A::B::C` headers in per-type files.
   */
  private rubyEnclosingModule(fqn: string): string {
    return this.rubyFullTypeName(fqn).split('::').slice(0, -1).join('::');
  }

  /**
   * The `require` path of a type's generated file, relative to `lib/`:
   * `<assembly-name>/<snake namespace.../snake type>` — e.g.
   * `jsii-calc/composition/composite_operation`.  Used both as the file
   * location and the argument to `autoload`/`register_autoload`, so the two
   * always agree.
   */
  private rubyRequirePath(fqn: string): string {
    const full = this.rubyFullTypeName(fqn).split('::');
    const asm = this.rubyModuleForAssembly(this.assembly.name).split('::');
    const rel = full.slice(asm.length).map((s) => toSnakeCase(s));
    return [this.assembly.name, ...rel].join('/');
  }

  private relativeRubyNamespace(fqn: string): string {
    const full = this.rubyFullTypeName(fqn).split('::');
    const asm = this.rubyModuleForAssembly(fqn.split('.')[0]).split('::');
    // Slicing the assembly-module prefix off the full path is only sound if
    // the full path actually starts with it.  An explicitly-configured
    // submodule module that *replaces* the root (e.g. `module: 'Flat'`)
    // would silently mis-slice — types would be emitted into the wrong
    // namespace.  Fail generation with a pointer at the config instead.
    if (!asm.every((part, i) => full[i] === part)) {
      throw new Error(
        `Ruby module for '${fqn}' resolves to '${full.join('::')}', which ` +
          `does not live under its assembly's module '${asm.join('::')}'. ` +
          `Explicit submodule targets.ruby.module values must extend the ` +
          `assembly module (e.g. '${asm.join('::')}::MySubmodule').`,
      );
    }
    return full.slice(asm.length, -1).join('::');
  }

  /**
   * Compute the set of Ruby paths (relative to the assembly module) that
   * will be declared as Ruby classes — jsii classes plus jsii interfaces
   * marked `datatype: true` (which generate as Ruby classes inheriting from
   * `Jsii::Struct`).  Used to suppress conflicting `module X; end`
   * pre-declarations of namespace fragments that share a Ruby name with a
   * class.
   */
  private collectClassRubyPaths(): Set<string> {
    const paths = new Set<string>();
    for (const type of this.reflectAssembly.allTypes) {
      const isClassEmit =
        type.isClassType() || (type.isInterfaceType() && type.spec.datatype);
      if (!isClassEmit) continue;

      const namespacePart = this.relativeRubyNamespace(type.fqn);
      const namePart = this.rubyModuleName(type.name);
      paths.add(namespacePart ? `${namespacePart}::${namePart}` : namePart);
    }
    return paths;
  }

  private rubyName(name: string): string {
    const snake = toSnakeCase(name);
    if (RUBY_RESERVED_NAMES.has(snake)) {
      return `_${snake}`;
    }
    // The `jsii_` prefix is reserved for the runtime's own API surface
    // (`jsii_ref`, `jsii_serialize`, `jsii_call_method`, ...) — prefix any
    // member that would land in it so generated code can never shadow a
    // runtime method, present or future.
    if (snake.startsWith('jsii_')) {
      return `_${snake}`;
    }
    // Names starting with a digit are invalid Ruby identifiers.
    if (/^\d/.test(snake)) {
      return `_${snake}`;
    }
    return snake;
  }

  /**
   * Build a Ruby expression that coerces plain Hashes into struct instances
   * anywhere a struct can appear inside `ref` — directly, as the element
   * type of an array/map (recursively), or as the single unambiguous struct
   * arm of a union.  Returns `undefined` when `ref` cannot contain a
   * coercible struct, so call sites can skip emission entirely.
   *
   * Coercion matters beyond ergonomics: an uncoerced Hash serializes with
   * its literal (snake_case) keys, while the kernel expects the struct's
   * camelCase wire form — so a Hash that misses coercion is silent wire
   * corruption, not a graceful fallback.
   *
   * Union rule: coerce only when exactly one arm is a struct AND no other
   * arm could legitimately be satisfied by a Hash (a map arm, or an
   * any/json arm) — otherwise the Hash is ambiguous and is passed through
   * unchanged for the runtime/kernel to interpret.
   *
   * Block parameters are named `jsii_v<depth>` — the `jsii_` prefix is
   * reserved (see RUBY_RESERVED_NAMES), so they can never collide with or
   * shadow a generated parameter name.
   */
  private coercionExpr(
    valueExpr: string,
    ref: spec.TypeReference | undefined,
    depth = 0,
  ): string | undefined {
    if (!ref) {
      return undefined;
    }

    if (spec.isNamedTypeReference(ref)) {
      if (!this.isStructFqn(ref.fqn)) {
        return undefined;
      }
      return this.structFromHashExpr(valueExpr, ref.fqn);
    }

    if (spec.isCollectionTypeReference(ref)) {
      const blockVar = `jsii_v${depth}`;
      const inner = this.coercionExpr(
        blockVar,
        ref.collection.elementtype,
        depth + 1,
      );
      if (!inner) {
        return undefined;
      }
      if (ref.collection.kind === spec.CollectionKind.Array) {
        return `${valueExpr}.is_a?(Array) ? ${valueExpr}.map { |${blockVar}| ${inner} } : ${valueExpr}`;
      }
      return `${valueExpr}.is_a?(Hash) ? ${valueExpr}.transform_values { |${blockVar}| ${inner} } : ${valueExpr}`;
    }

    if (spec.isUnionTypeReference(ref)) {
      const structArms = ref.union.types.filter(
        (t) => spec.isNamedTypeReference(t) && this.isStructFqn(t.fqn),
      ) as spec.NamedTypeReference[];
      const hashAmbiguous = ref.union.types.some(
        (t) =>
          (spec.isCollectionTypeReference(t) &&
            t.collection.kind === spec.CollectionKind.Map) ||
          (spec.isPrimitiveTypeReference(t) &&
            (t.primitive === spec.PrimitiveType.Any ||
              t.primitive === spec.PrimitiveType.Json)),
      );
      if (structArms.length === 1 && !hashAmbiguous) {
        return this.structFromHashExpr(valueExpr, structArms[0].fqn);
      }
      return undefined;
    }

    return undefined;
  }

  /**
   * Ruby expression coercing `valueExpr` into the struct `fqn` when it is a
   * Hash, passing anything else through.  Keys are symbolized before the
   * keyword splat: `**` requires Symbol keys, and JSON-shaped hashes carry
   * String keys — without `transform_keys` those raise a bare
   * `ArgumentError: wrong number of arguments` instead of constructing the
   * struct.  (Symbol keys pass through `to_sym` unchanged; unknown keys
   * still surface as Ruby's clear "unknown keyword" ArgumentError.)
   */
  private structFromHashExpr(valueExpr: string, fqn: string): string {
    const structType = this.rubyFullTypeName(fqn);
    return `${valueExpr}.is_a?(Hash) ? ::${structType}.new(**${valueExpr}.transform_keys(&:to_sym)) : ${valueExpr}`;
  }

  private emitStructCoercion(
    variableName: string,
    type: RubyTypeRef | undefined,
    options: { variadic?: boolean; assignment?: string } = {},
  ): void {
    const ref = this.typeRefSpec(type);

    if (options.variadic) {
      // For variadic parameters, `ref` is the element type already.
      const inner = this.coercionExpr('jsii_v0', ref, 1);
      if (inner) {
        this.code.line(`${variableName}.map! { |jsii_v0| ${inner} }`);
      }
      return;
    }

    const expr = this.coercionExpr(variableName, ref);
    if (!expr) {
      if (options.assignment) {
        this.code.line(`${options.assignment} = ${variableName}`);
      }
      return;
    }
    this.code.line(`${options.assignment ?? variableName} = ${expr}`);
  }

  private emitTypeChecking(
    variableName: string,
    type: RubyTypeRef | undefined,
    jsiiName: string,
    options: { isOptional?: boolean; isVariadic?: boolean } = {},
  ): void {
    if (!this.runtimeTypeChecking) {
      return;
    }

    // Normalize: initializer parameters carry raw spec type refs (no
    // `.spec`); reflect members wrap theirs.  Reading `.spec`
    // unconditionally made every constructor check validate against
    // `{primitive: 'any'}` — i.e. check nothing.
    const refSpec = this.typeRefSpec(type);

    if (options.isVariadic) {
      this.code.open(`${variableName}.each_with_index do |item, index|`);
      this.code.line(
        `Jsii::Type.check_type(item, ${rubyJsonLiteral(
          refSpec,
        )}, "${rubyDq(jsiiName)}[#{index}]")`,
      );
      this.code.close(`end`);
    } else {
      this.code.line(
        `Jsii::Type.check_type(${variableName}, ${rubyJsonLiteral(
          refSpec,
        )}, "${rubyDq(jsiiName)}")${options.isOptional ? ` unless ${variableName}.nil?` : ''}`,
      );
    }
  }

  /**
   * Emit-name for a property, accounting for the JSII `const: true` flag.
   * Const properties take an UPPER_SNAKE_CASE form (`maybeList` → `MAYBE_LIST`,
   * `PROPERTY` stays `PROPERTY`) — both idiomatic for Ruby constants and
   * distinct from any sibling snake_case property's lowercased name.
   * This matches Python's `toPythonPropertyName(name, constant=true)` which
   * uppercases the snake_case form for the same reason.
   *
   * Ruby parses `Foo.PROPERTY` and `Foo.property` as distinct method calls,
   * so both can coexist on the same class without ambiguity.
   */
  private rubyPropertyName(prop: { name: string; const?: boolean }): string {
    if (prop.const) return this.rubyConstName(prop.name);
    return this.rubyName(prop.name);
  }

  private rubyMethodName(method: { name: string }): string {
    return this.rubyName(method.name);
  }

  /**
   * Filter a member list to resolve Ruby-name collisions.  When two members
   * map to the same Ruby identifier, drop deprecated members; if exactly
   * one non-deprecated member survives, use it.  Throws if all colliding
   * members are deprecated, or if more than one non-deprecated member
   * remains (a generator bug — these cases shouldn't reach this point).
   *
   * Mirrors Python's `prepareMembers`.  See
   * https://github.com/aws/jsii/issues/2508 for the motivating fixture.
   */
  /**
   * Resolve *cross-category* Ruby-name collisions: a property and a method
   * (merged onto one type from different interfaces or across the
   * hierarchy) that map to the same Ruby identifier would otherwise emit
   * two `def foo` — last definition silently wins.  Runs after the
   * per-category {@link dedupByRubyName} passes, with the same policy:
   * deprecated members lose to non-deprecated ones; ambiguity throws.
   *
   * Statics and instance members live in different Ruby namespaces
   * (`def self.foo` vs `def foo`), so collisions are only checked within
   * the same staticness.
   */
  private dedupCrossCategory<P extends MemberLike, M extends MemberLike>(
    props: P[],
    methods: M[],
    propRubyName: (p: P) => string,
    methodRubyName: (m: M) => string,
    fqn: string,
  ): { props: P[]; methods: M[] } {
    const buckets = new Map<
      string,
      Array<{ member: P | M; isProp: boolean }>
    >();
    const add = (member: P | M, isProp: boolean, name: string) => {
      const key = `${member.static ? 'static' : 'instance'}:${name}`;
      const bucket = buckets.get(key) ?? [];
      bucket.push({ member, isProp });
      buckets.set(key, bucket);
    };
    for (const p of props) add(p, true, propRubyName(p));
    for (const m of methods) add(m, false, methodRubyName(m));

    const dropped = new Set<any>();
    for (const [key, bucket] of buckets) {
      if (bucket.length === 1) {
        continue;
      }
      const rubyKey = key.split(':')[1];
      const nonDeprecated = bucket.filter((e) => !isDeprecated(e.member));
      if (nonDeprecated.length === 0) {
        throw new Error(
          `All members mapping to Ruby name '${rubyKey}' on ${fqn} are ` +
            `deprecated; cannot pick a winner.  jsii names: ${bucket
              .map((e) => `'${e.member.name}'`)
              .join(', ')}`,
        );
      }
      if (nonDeprecated.length > 1) {
        throw new Error(
          `A property and a method on ${fqn} both map to Ruby name ` +
            `'${rubyKey}': ${nonDeprecated
              .map(
                (e) => `${e.isProp ? 'property' : 'method'} '${e.member.name}'`,
              )
              .join(
                ', ',
              )}.  Mark all but one deprecated (or rename) to disambiguate.`,
        );
      }
      for (const e of bucket) {
        if (e !== nonDeprecated[0]) {
          dropped.add(e.member);
        }
      }
    }

    return {
      props: props.filter((p) => !dropped.has(p)),
      methods: methods.filter((m) => !dropped.has(m)),
    };
  }

  private dedupByRubyName<T extends MemberLike>(
    members: readonly T[],
    rubyName: (m: T) => string,
    fqn: string,
  ): T[] {
    const byName = new Map<string, T[]>();
    for (const m of members) {
      const key = rubyName(m);
      const bucket = byName.get(key) ?? [];
      bucket.push(m);
      byName.set(key, bucket);
    }

    const out: T[] = [];
    for (const [rubyKey, bucket] of byName) {
      if (bucket.length === 1) {
        out.push(bucket[0]);
        continue;
      }
      const nonDeprecated = bucket.filter((m) => !isDeprecated(m));
      if (nonDeprecated.length === 0) {
        throw new Error(
          `All members mapping to Ruby name '${rubyKey}' on ${fqn} are ` +
            `deprecated; cannot pick a winner.  jsii names: ${bucket
              .map((m) => `'${m.name}'`)
              .join(', ')}`,
        );
      }
      if (nonDeprecated.length > 1) {
        throw new Error(
          `Multiple non-deprecated members map to Ruby name '${rubyKey}' ` +
            `on ${fqn}: ${nonDeprecated
              .map((m) => `'${m.name}'`)
              .join(
                ', ',
              )}.  Mark all but one deprecated (or rename) to disambiguate.`,
        );
      }
      out.push(nonDeprecated[0]);
    }
    return out;
  }

  private rubyModuleForAssembly(name: string): string {
    if (name === this.assembly.name) {
      return this.assembly.targets?.ruby?.module ?? this.rubyModuleName(name);
    }
    const depInfo = this.assembly.dependencyClosure?.[name];
    if (depInfo) {
      return (
        depInfo.targets?.ruby?.module ??
        this.rubyModuleName(name, this.assemblyAcronyms(depInfo))
      );
    }
    return this.rubyModuleName(name, []);
  }

  /**
   * The acronym list configured by a specific assembly
   * (`targets.ruby.acronyms`).  Acronyms are deliberately scoped to the
   * assembly that declared them: a dependency capitalizing `RAM` must not
   * rewrite an unrelated `RamUsage` type in the consuming assembly (or in
   * a sibling dependency).
   */
  private assemblyAcronyms(
    config: { targets?: spec.AssemblyTargets } | undefined,
  ): string[] {
    return (config?.targets?.ruby?.acronyms ?? []).filter(
      (a: unknown): a is string => typeof a === 'string' && a.length > 0,
    );
  }

  private rubyModuleName(name: string, acronyms?: string[]): string {
    // Default to the acronyms of the assembly being generated; callers
    // converting names that belong to a *dependency* pass that assembly's
    // own list (see rubyFullTypeName / rubyModuleForAssembly).
    acronyms ??= this.assemblyAcronyms(this.assembly);

    // Handle scoped packages: @scope/package -> Scope::Package
    if (name.startsWith('@')) {
      const parts = name.slice(1).split('/');
      return parts.map((p) => this.rubyModuleName(p, acronyms)).join('::');
    }

    // Handle hyphens: jsii-calc -> JsiiCalc
    if (name.includes('-')) {
      const parts = name.split('-');
      return parts.map((p) => this.rubyModuleName(p, acronyms)).join('');
    }

    const sanitized = name.replace(/[^a-zA-Z0-9_]/g, '');
    let pascal =
      sanitized.charAt(0) === sanitized.charAt(0).toUpperCase()
        ? sanitized
        : toPascalCase(sanitized);

    for (const acronym of acronyms) {
      // Find the acronym case-insensitively. A match is only considered a valid
      // word boundary if it starts with a capital letter and is followed by either
      // another capital letter, a digit, an 's' (for plurals), or the end of the string.
      // The acronym is config-supplied text, not a pattern — escape it.
      const regex = new RegExp(`(${escapeRegExp(acronym)})`, 'ig');
      pascal = pascal.replace(regex, (match, _p1, offset) => {
        if (match[0] !== match[0].toUpperCase()) return match;

        const nextChar = pascal[offset + match.length];
        if (nextChar) {
          // Must be uppercase, digit, or 's' followed by uppercase, digit, or end of string
          const isValid =
            /^[A-Z0-9]$/.test(nextChar) ||
            (nextChar === 's' &&
              (!pascal[offset + match.length + 1] ||
                /^[A-Z0-9]$/.test(pascal[offset + match.length + 1])));
          if (!isValid) return match;
        }

        return acronym;
      });
    }

    // Ruby constants must start with an uppercase letter.  npm allows
    // package names like `3d-tools` (and leading underscores), which would
    // otherwise produce invalid constants like `3dTools`.  Prefix with `V_`,
    // mirroring rubyConstName's treatment of digit-leading enum members.
    if (!/^[A-Z]/.test(pascal)) {
      pascal = `V_${pascal}`;
    }

    return pascal;
  }

  private rubyConstName(name: string): string {
    const constName = toSnakeCase(name)
      .toUpperCase()
      .replace(/[^A-Z0-9_]/g, '_');
    if (/^[0-9]/.test(constName)) {
      return `V_${constName}`;
    }
    return constName;
  }

  private async generateGemspec(outdir: string) {
    const assembly = this.reflectAssembly;
    const assemblySpec = assembly.spec;
    const gemName = rubyGemName(assemblySpec);
    const gemspecPath = path.join(outdir, `${gemName}.gemspec`);
    await fs.mkdir(outdir, { recursive: true });

    // author, license, description and homepage are all required fields of
    // a jsii assembly, so they can be emitted unconditionally; guards below
    // are belt-and-braces for hand-crafted assemblies.
    const gemspecContent = [
      `Gem::Specification.new do |s|`,
      `  s.name        = '${rubySq(gemName)}'`,
      `  s.version     = '${rubySq(toReleaseVersion(assembly.version, TargetName.RUBY))}'`,
      `  s.summary     = 'Ruby bindings for ${rubySq(assembly.name)}'`,
    ];
    if (assemblySpec.description) {
      gemspecContent.push(
        `  s.description = '${rubySq(assemblySpec.description)}'`,
      );
    }
    gemspecContent.push(
      `  s.authors     = ['${rubySq(assemblySpec.author?.name ?? 'JSII Generator')}']`,
    );
    if (assemblySpec.license) {
      gemspecContent.push(
        `  s.license     = '${rubySq(assemblySpec.license)}'`,
      );
    }
    if (assemblySpec.homepage) {
      gemspecContent.push(
        `  s.homepage    = '${rubySq(assemblySpec.homepage)}'`,
      );
    }
    gemspecContent.push(
      `  s.files       = Dir["lib/**/*"] + Dir["sig/**/*"]`,
      `  s.required_ruby_version = '>= 3.3.0'`,
      `  s.add_dependency 'jsii-ruby-runtime', ${toRubyVersionRange(`^${VERSION}`)}`,
      `  s.add_dependency 'base64', '~> 0.2'`,
    );

    if (this.assembly.dependencies) {
      for (const [depName, version] of Object.entries(
        this.assembly.dependencies,
      )) {
        const depInfo = this.assembly.dependencyClosure?.[depName];
        const depGem = depInfo?.targets?.ruby?.gem as string | undefined;
        if (depGem) {
          gemspecContent.push(
            `  s.add_dependency '${rubySq(depGem)}', ${toRubyVersionRange(version)}`,
          );
        }
      }
    }

    gemspecContent.push(`end`);

    await fs.writeFile(gemspecPath, `${gemspecContent.join('\n')}\n`, 'utf-8');
  }

  /**
   * Emit `sig/<assembly>.rbs` — RBS type signatures mirroring the generated
   * Ruby, so Steep/TypeProf users get static checking and editor completion.
   * Uses fully-qualified declaration headers (`class A::B::C`) with empty
   * namespace-module predeclarations, which keeps emission order-independent
   * (RBS resolves a file as a whole).  Names come from the same mappers the
   * `.rb` emission uses, so signatures line up with the real methods.
   */
  private async generateRbs(outdir: string, sortedTypes: reflect.Type[]) {
    const assembly = this.reflectAssembly;
    const lines: string[] = [];

    // Ruby paths that are emitted as classes (jsii classes + datatype
    // interfaces) — we must NOT also predeclare them as namespace modules.
    const classPaths = new Set<string>();
    for (const type of sortedTypes) {
      if (
        type.isClassType() ||
        (type.isInterfaceType() && type.spec.datatype)
      ) {
        classPaths.add(this.rubyFullTypeName(type.fqn));
      }
    }

    // Predeclare every pure-namespace module fragment (every fqn prefix that
    // isn't itself a class path).
    const namespaces = new Set<string>();
    for (const type of sortedTypes) {
      const parts = this.rubyFullTypeName(type.fqn).split('::');
      let current = '';
      for (let i = 0; i < parts.length - 1; i++) {
        current = current ? `${current}::${parts[i]}` : parts[i];
        if (!classPaths.has(current)) {
          namespaces.add(current);
        }
      }
    }
    for (const ns of Array.from(namespaces).sort(
      (a, b) => a.split('::').length - b.split('::').length,
    )) {
      lines.push(`module ${ns} end`);
    }
    if (namespaces.size > 0) {
      lines.push('');
    }

    for (const type of sortedTypes) {
      if (type.isEnumType()) {
        this.emitRbsEnum(type, lines);
      } else if (type.isInterfaceType()) {
        this.emitRbsInterface(type, lines);
      } else if (type.isClassType()) {
        this.emitRbsClass(type, lines);
      }
    }

    const sigPath = path.join(outdir, 'sig', `${assembly.name}.rbs`);
    await fs.mkdir(path.dirname(sigPath), { recursive: true });
    await fs.writeFile(sigPath, `${lines.join('\n')}\n`, 'utf-8');
  }

  /** RBS parameter list for a callable's parameters. */
  private rbsParams(params: readonly any[]): string {
    return params
      .map((p) => {
        const name = this.rubyName(p.name);
        if (p.variadic) {
          return `*${this.rbsTypeBare(this.typeRefSpec(p.type))} ${name}`;
        }
        const t = this.rbsType(this.typeRefSpec(p.type), p.optional);
        return p.optional ? `?${t} ${name}` : `${t} ${name}`;
      })
      .join(', ');
  }

  /** RBS return type for a method (`void` when it declares no return). */
  private rbsReturn(method: any): string {
    const ret = method.spec?.returns;
    return ret?.type
      ? this.rbsType(this.typeRefSpec(ret.type), ret.optional)
      : 'void';
  }

  private emitRbsEnum(typeSpec: reflect.EnumType, lines: string[]): void {
    const members = this.dedupByRubyName(
      typeSpec.members,
      (m) => this.rubyConstName(m.name),
      typeSpec.fqn,
    );
    lines.push(`module ${this.rubyFullTypeName(typeSpec.fqn)}`);
    for (const m of members) {
      lines.push(`  ${this.rubyConstName(m.name)}: ::Jsii::Enum`);
    }
    lines.push('end', '');
  }

  private emitRbsInterface(
    typeSpec: reflect.InterfaceType,
    lines: string[],
  ): void {
    const { props, methods } = this.dedupCrossCategory(
      this.dedupByRubyName(
        typeSpec.allProperties,
        (p) => this.rubyName(p.name),
        typeSpec.fqn,
      ),
      this.dedupByRubyName(
        typeSpec.allMethods,
        (m) => this.rubyName(m.name),
        typeSpec.fqn,
      ),
      (p) => this.rubyName(p.name),
      (m) => this.rubyName(m.name),
      typeSpec.fqn,
    );
    const full = this.rubyFullTypeName(typeSpec.fqn);

    if (typeSpec.datatype) {
      // Struct → value class with a kwargs constructor + readers.
      const bases = typeSpec.spec.interfaces ?? [];
      const base =
        bases.length > 0
          ? `::${this.rubyFullTypeName(bases[0])}`
          : '::Jsii::Struct';
      lines.push(`class ${full} < ${base}`);
      const kwargs = props
        .map((p) => {
          const t = this.rbsType(this.typeRefSpec(p.type), p.optional);
          return p.optional
            ? `?${this.rubyName(p.name)}: ${t}`
            : `${this.rubyName(p.name)}: ${t}`;
        })
        .join(', ');
      lines.push(`  def initialize: (${kwargs}) -> void`);
      for (const p of props) {
        lines.push(
          `  attr_reader ${this.rubyName(p.name)}: ${this.rbsType(this.typeRefSpec(p.type), p.optional)}`,
        );
      }
      lines.push('end', '');
      return;
    }

    // Behavioral interface → module of method/property signatures.
    lines.push(`module ${full}`);
    for (const p of props) {
      const t = this.rbsType(this.typeRefSpec(p.type), p.optional);
      lines.push(`  attr_reader ${this.rubyName(p.name)}: ${t}`);
      if (!p.immutable) {
        lines.push(`  attr_writer ${this.rubyName(p.name)}: ${t}`);
      }
    }
    for (const m of methods) {
      lines.push(
        `  def ${this.rubyName(m.name)}: (${this.rbsParams(m.parameters)}) -> ${this.rbsReturn(m)}`,
      );
    }
    lines.push('end', '');
  }

  private emitRbsClass(typeSpec: reflect.ClassType, lines: string[]): void {
    const { props, methods } = this.dedupCrossCategory(
      this.dedupByRubyName(
        typeSpec.allProperties,
        (p) => this.rubyPropertyName(p),
        typeSpec.fqn,
      ),
      this.dedupByRubyName(
        typeSpec.allMethods,
        (m) => this.rubyMethodName(m),
        typeSpec.fqn,
      ),
      (p) => this.rubyPropertyName(p),
      (m) => this.rubyMethodName(m),
      typeSpec.fqn,
    );
    const full = this.rubyFullTypeName(typeSpec.fqn);
    const base = typeSpec.spec.base
      ? `::${this.rubyFullTypeName(typeSpec.spec.base)}`
      : '::Jsii::Object';

    lines.push(`class ${full} < ${base}`);
    for (const iface of typeSpec.spec.interfaces ?? []) {
      lines.push(`  include ::${this.rubyFullTypeName(iface)}`);
    }

    const init = typeSpec.spec.initializer;
    if (init && init.parameters && init.parameters.length > 0) {
      lines.push(
        `  def initialize: (${this.rbsParams(init.parameters)}) -> void`,
      );
    } else if (init) {
      lines.push('  def initialize: () -> void');
    }

    for (const p of props) {
      const t = this.rbsType(this.typeRefSpec(p.type), p.optional);
      if (p.static) {
        // Statics (incl. const props) are generated as singleton getter/
        // setter methods, not Ruby attributes — emit `def self.` sigs.
        const name = this.rubyPropertyName(p);
        lines.push(`  def self.${name}: () -> ${t}`);
        if (!p.immutable) {
          lines.push(`  def self.${name}=: (${t}) -> ${t}`);
        }
        continue;
      }
      lines.push(`  attr_reader ${this.rubyName(p.name)}: ${t}`);
      if (!p.immutable) {
        lines.push(`  attr_writer ${this.rubyName(p.name)}: ${t}`);
      }
    }
    for (const m of methods) {
      const recv = m.static ? 'self.' : '';
      lines.push(
        `  def ${recv}${this.rubyMethodName(m)}: (${this.rbsParams(m.parameters)}) -> ${this.rbsReturn(m)}`,
      );
    }
    lines.push('end', '');
  }

  protected getAssemblyOutputDir(_mod: spec.Assembly) {
    return path.join('lib', path.dirname(_mod.name)).replace(/\\/g, '/');
  }

  protected onBeginInterface(_ifc: spec.InterfaceType) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onEndInterface(_ifc: spec.InterfaceType) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onInterfaceMethodOverload(
    _ifc: spec.InterfaceType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onInterfaceProperty(
    _ifc: spec.InterfaceType,
    _prop: spec.Property,
  ) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onProperty(_cls: spec.ClassType, _prop: spec.Property) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onStaticProperty(_cls: spec.ClassType, _prop: spec.Property) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onUnionProperty(
    _cls: spec.ClassType,
    _prop: spec.Property,
    _union: spec.UnionTypeReference,
  ) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onMethod(_cls: spec.ClassType, _method: spec.Method) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onStaticMethod(_cls: spec.ClassType, _method: spec.Method) {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected onStaticMethodOverload(
    _cls: spec.ClassType,
    _overload: spec.Method,
    _originalMethod: spec.Method,
  ) {} // eslint-disable-line @typescript-eslint/no-empty-function
}

export default RubyTarget;
