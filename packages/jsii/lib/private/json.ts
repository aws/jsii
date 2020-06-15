import { promises as fs } from 'fs';
import * as ts from 'typescript';
import { inspect } from 'util';
import { JSII_DIAGNOSTICS_CODE } from '../utils';

/**
 * Shared attributes of a JSON file.
 */
export abstract class JsonNode<T extends ts.Node = ts.Node, R = any> {
  /** Diagnostic messages generated while parsing this JSON node. */
  public abstract readonly diagnostics: readonly ts.Diagnostic[];

  private _raw?: R;

  /** @internal */
  protected constructor(
    private readonly sourceFile: ts.SourceFile,
    private readonly node: T,
  ) {}

  /** @internal */
  public diagnostic(
    messageText: string,
    category: ts.DiagnosticCategory = ts.DiagnosticCategory.Error,
    ...context: ts.DiagnosticRelatedInformation[]
  ): ts.Diagnostic {
    const start = this.node.getStart(this.sourceFile);
    const length = this.node.getEnd() - start;
    return {
      category,
      code: JSII_DIAGNOSTICS_CODE,
      file: this.sourceFile,
      length,
      messageText,
      start,
      relatedInformation: context,
    };
  }

  /**
   * @returns the "raw" value represented by this JSON node.
   */
  public get raw(): R {
    return (
      this._raw ??
      (this._raw = JSON.parse(
        // Stipping trailing commas and semis to ensure validity
        this.node.getText(this.sourceFile).replace(/[,;]$/, ''),
      ))
    );
  }

  public map<V>(cb: (value: this) => V): V {
    return cb(this);
  }

  /**
   * Create a custom representation of this value for inspection in a Node
   * debugger or interactive shell. While not strictly necessary, this makes the
   * debugging experience a lot nicer than when using the default rendering.
   *
   * @internal
   */
  public abstract [inspect.custom](depth: number, options: any): string;
}

/**
 * A JSON file that can contain one or more documents.
 */
export class JsonFile extends JsonNode<ts.JsonSourceFile> {
  /**
   * Loads the JSON file at the designated path.
   *
   * @param filePath the path to load a JSON file from.
   *
   * @return the loaded JSON file.
   */
  public static async load(filePath: string): Promise<JsonFile> {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const file = ts.parseJsonText(filePath, data);
    return new JsonFile(filePath, file);
  }

  /** The documents included in this JSON file */
  public readonly documents: readonly JsonNode[];

  private constructor(
    public readonly filePath: string,
    file: ts.JsonSourceFile,
  ) {
    super(file, file);
    this.documents = file.statements.map((stmt) => parseValue(file, stmt));
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return new Array<ts.Diagnostic>().concat(
      ...this.documents.map((doc) => doc.diagnostics),
    );
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    const inner = inspect(this.documents, {
      ...options,
      depth: options.depth && options.depth - 1,
    });
    return `${options.stylize('JsonFile', 'special')} documents = ${inner}`;
  }
}

/**
 * A JSON object is a collection of named properties.
 */
export class JsonObject extends JsonNode<ts.ObjectLiteralExpression> {
  /** The properties included in this JSON object. */
  public readonly properties: readonly JsonObjectProperty[];
  private readonly _diagnostics = new Array<ts.Diagnostic>();

  /** @internal */
  public constructor(
    sourceFile: ts.SourceFile,
    node: ts.ObjectLiteralExpression,
  ) {
    super(sourceFile, node);
    this.properties = node.properties
      .map((prop) => {
        if (!ts.isPropertyAssignment(prop)) {
          this._diagnostics.push(
            new UnsupportedNode(sourceFile, node).diagnostic(
              'Unsupported node for a JsonObject property',
              ts.DiagnosticCategory.Warning,
            ),
          );
          // Cheating the invalid sutff out
          return (undefined as any) as JsonObjectProperty;
        }
        return new JsonObjectProperty(sourceFile, prop);
      })
      .filter((val) => val != null);
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return new Array<ts.Diagnostic>().concat(
      this._diagnostics,
      ...this.properties.map((prop) => prop.diagnostics),
    );
  }

  /**
   * Access on of this object's properties by its name.
   *
   * @param name the name of the property being looked up.
   *
   * @returns the property named `name`, if there is one.
   */
  public get(name: string): JsonObjectProperty | undefined {
    return this.properties.find((prop) => prop.name?.text === name);
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    const inner = this.properties
      .map((prop) =>
        inspect(prop, {
          ...options,
          depth: options.depth && options.depth - 1,
        }),
      )
      .join(',\n')
      .replace(/\n/g, '\n  ');
    return `${options.stylize('JsonObject', 'special')} {\n  ${inner}\n}`;
  }
}

/**
 * A property of a JSON object.
 */
export class JsonObjectProperty extends JsonNode<ts.ObjectLiteralElement> {
  /** The name of the property. */
  public readonly name: JsonPropertyName;
  /** The value of the property. */
  public readonly value: JsonNode;

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.PropertyAssignment) {
    super(sourceFile, node);
    this.name = new JsonPropertyName(sourceFile, node.name);
    this.value = parseValue(sourceFile, node.initializer);
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return [...this.name.diagnostics, ...this.value.diagnostics];
  }

  public get raw() {
    return { [this.name.text]: this.value.raw };
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    const newOpts = {
      ...options,
      depth: options.depth && options.depth - 1,
    };
    return `${inspect(this.name, newOpts)}: ${inspect(this.value, newOpts)}`;
  }
}

/**
 * The name of a JSON property.
 */
export class JsonPropertyName extends JsonNode<ts.PropertyName> {
  /** The string representation of a property's name. */
  public readonly text: string;

  private readonly _diagnostics = new Array<ts.Diagnostic>();

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.PropertyName) {
    super(sourceFile, node);

    if (ts.isIdentifier(node)) {
      this.text = node.text;
    } else if (ts.isStringLiteral(node)) {
      this.text = node.text;
    } else if (ts.isNumericLiteral(node)) {
      this.text = node.text;
    } else if (ts.isComputedPropertyName(node)) {
      this.text = node.getText();
    } else if (ts.isPrivateIdentifier(node)) {
      this.text = node.text;
    } else {
      // Explicit casts here because we've tested all known members of the ts.PropertyName union, so it's "never" now.
      this._diagnostics.push(
        this.diagnostic(
          `Unexpected node kind for a JSON property name: ${
            ts.SyntaxKind[(node as ts.PropertyName).kind]
          }`,
          ts.DiagnosticCategory.Warning,
        ),
      );
      this.text = (node as ts.PropertyName).getText();
    }
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return this._diagnostics;
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return inspect(this.text, {
      ...options,
      depths: options.depth && options.depth - 1,
    });
  }
}

/**
 * A JSON array is a collection of JSON elements.
 */
export class JsonArray extends JsonNode<ts.ArrayLiteralExpression> {
  /** The elements contained in this array. */
  public readonly elements: readonly JsonNode[];

  /** @internal */
  public constructor(
    sourceFile: ts.SourceFile,
    node: ts.ArrayLiteralExpression,
  ) {
    super(sourceFile, node);
    this.elements = node.elements.map((elt) => parseValue(sourceFile, elt));
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return new Array<ts.Diagnostic>().concat(
      ...this.elements.map((elt) => elt.diagnostics),
    );
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return `${options.stylize('JsonArray', 'special')} ${inspect(
      this.elements,
      { ...options, depth: options.depth && options.depth - 1 },
    )}`;
  }
}

/**
 * The JSON representation of a boolean.
 */
export class JsonBoolean extends JsonNode<ts.BooleanLiteral, boolean> {
  public readonly diagnostics: readonly ts.Diagnostic[] = [];

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.BooleanLiteral) {
    super(sourceFile, node);
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return inspect(this.raw, {
      ...options,
      depths: options.depth && options.depth - 1,
    });
  }
}

/**
 * The JSON representation of a number.
 */
export class JsonNumber extends JsonNode<ts.NumericLiteral, number> {
  public readonly diagnostics: readonly ts.Diagnostic[] = [];

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.NumericLiteral) {
    super(sourceFile, node);
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return inspect(this.raw, {
      ...options,
      depths: options.depth && options.depth - 1,
    });
  }
}

/**
 * The JSON representation of a String.
 */
export class JsonString extends JsonNode<ts.StringLiteral, string> {
  public readonly diagnostics: readonly ts.Diagnostic[] = [];

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.StringLiteral) {
    super(sourceFile, node);
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return inspect(this.raw, {
      ...options,
      depths: options.depth && options.depth - 1,
    });
  }
}

/**
 * a JSON node that we do not yet support.
 */
export class UnsupportedNode extends JsonNode {
  /** The TypeScript SyntaxKind for this unsupported node. */
  public readonly kind: ts.SyntaxKind;
  /** The source code corresponding to this unsupported node. */
  public readonly code: string;
  public readonly diagnostics: readonly ts.Diagnostic[] = [];

  /** @internal */
  public constructor(sourceFile: ts.SourceFile, node: ts.Node) {
    super(sourceFile, node);
    this.kind = node.kind;
    this.code = node.getText(sourceFile);
  }

  /** @internal */
  /* istanbul ignore next */
  public [inspect.custom](_depth: number, options: any) {
    return `${options.stylize('Unsupported', 'special')}<${options.stylize(
      ts.SyntaxKind[this.kind],
      'undefined',
    )} = \n${this.code}\n>`;
  }
}

function parseValue(sourceFile: ts.SourceFile, node: ts.Node): JsonNode {
  if (ts.isExpressionStatement(node)) {
    return parseValue(sourceFile, node.expression);
  }
  if (ts.isStringLiteral(node)) {
    return new JsonString(sourceFile, node);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return new JsonArray(sourceFile, node);
  }
  if (ts.isObjectLiteralExpression(node)) {
    return new JsonObject(sourceFile, node);
  }
  if (ts.isNumericLiteral(node)) {
    return new JsonNumber(sourceFile, node);
  }
  if (
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  ) {
    return new JsonBoolean(sourceFile, node as ts.BooleanLiteral);
  }
  return new UnsupportedNode(sourceFile, node);
}
