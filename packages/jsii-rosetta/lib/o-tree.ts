export interface OTreeOptions {
  /**
   * Adjust indentation with the given number
   *
   * Indentation affects children.
   *
   * @default 0
   */
  indent?: number;

  /**
   * Separate children with the given string
   *
   * @default ''
   */
  separator?: string;

  /**
   * Suffix the token after outdenting
   *
   * @default ''
   */
  suffix?: string;

  /**
   * Whether this part of the generated syntax is okay to insert newlines and comments
   *
   * @default false
   */
  canBreakLine?: boolean;

  /**
   * If set, a unique key which will cause only one node with the given key to be rendered.
   *
   * The outermost key is the one that will be rendered.
   *
   * Used to make it easier to keep the state necessary to render comments
   * only once in the output tree, rather than keep the state in the
   * language rendered.
   *
   * @default No conditional rendering
   */
  renderOnce?: string;
}

/**
 * "Output" Tree
 *
 * Tree-like structure that holds sequences of trees and strings, which
 * can be rendered to an output stream.
 */
export class OTree implements OTree {
  public static simplify(xs: Array<OTree | string | undefined>): Array<OTree | string> {
    return xs.filter(notUndefined).filter(notEmpty);
  }

  public readonly attachComment: boolean;

  private readonly prefix: Array<OTree | string>;
  private readonly children: Array<OTree | string>;
  private span?: Span;

  constructor(
    prefix: Array<OTree | string | undefined>,
    children?: Array<OTree | string | undefined>,
    private readonly options: OTreeOptions = {}) {

    this.prefix = OTree.simplify(prefix);
    this.children = OTree.simplify(children || []);
    this.attachComment = !!options.canBreakLine;
  }

  /**
   * Set the span in the source file this tree node relates to
   */
  public setSpan(start: number, end: number) {
    this.span = { start, end };
  }

  public write(sink: OTreeSink) {
    if (!sink.tagOnce(this.options.renderOnce)) { return; }

    const meVisible = sink.renderingForSpan(this.span);

    for (const x of this.prefix) {
      sink.write(x);
    }

    const popIndent = sink.requestIndentChange(meVisible ? this.options.indent || 0 : 0);
    let mark = sink.mark();
    for (const child of this.children || []) {
      if (this.options.separator && mark.wroteNonWhitespaceSinceMark) {
        sink.write(this.options.separator);
      }
      mark = sink.mark();

      sink.write(child);
    }
    popIndent();

    if (this.options.suffix) {
      sink.renderingForSpan(this.span);
      sink.write(this.options.suffix);
    }
  }

  public get isEmpty() {
    return this.prefix.length + this.children.length === 0;
  }

  public toString() {
    return `<INCORRECTLY STRINGIFIED ${this.prefix}>`;
  }
}

export const NO_SYNTAX = new OTree([]);

export class UnknownSyntax extends OTree {
}

export interface SinkMark {
  readonly wroteNonWhitespaceSinceMark: boolean;
}

export interface OTreeSinkOptions {
  visibleSpans?: Span[];
}

export class OTreeSink {
  private readonly indentLevels: number[] = [0];
  private readonly fragments = new Array<string>();
  private singletonsRendered = new Set<string>();
  private pendingIndentChange = 0;
  private rendering = true;

  constructor(private readonly options: OTreeSinkOptions = {}) {
  }

  public tagOnce(key: string | undefined): boolean {
    if (key === undefined) { return true; }
    if (this.singletonsRendered.has(key)) { return false; }
    this.singletonsRendered.add(key);
    return true;
  }

  /**
   * Get a mark for the current sink output location
   *
   * Marks can be used to query about things that have been written to output.
   */
  public mark(): SinkMark {
    const self = this;
    const markIndex = this.fragments.length;

    return {
      get wroteNonWhitespaceSinceMark(): boolean {
        return self.fragments.slice(markIndex).some(s => !!s.match(/[^\s]/));
      }
    };
  }

  public write(text: string | OTree) {
    if (text instanceof OTree) {
      text.write(this);
    } else {
      if (!this.rendering) { return; }

      if (containsNewline(text)) {
        this.applyPendingIndentChange();
      }
      this.append(text.replace(/\n/g, '\n' + ' '.repeat(this.currentIndent)));
    }
  }

  public renderingForSpan(span?: Span): boolean {
    if (span && this.options.visibleSpans) {
      this.rendering = this.options.visibleSpans.some(v => inside(span, v));
    }
    return this.rendering;
  }

  public requestIndentChange(x: number): () => void {
    if (x === 0) { return () => undefined; }

    this.pendingIndentChange = x;
    const currentIndentState = this.indentLevels.length;
    const self = this;

    // Return a pop function which will reset to the current indent state,
    // regardless of whether the indent was actually applied or not.
    return () => {
      self.indentLevels.splice(currentIndentState);
      self.pendingIndentChange = 0;
    };
  }

  public toString() {
    // Strip trailing whitespace from every line, and empty lines from the start and end
    return this.fragments.join('').replace(/[ \t]+$/gm, '').replace(/^\n+/, '').replace(/\n+$/, '');
  }

  private append(x: string) {
    this.fragments.push(x);
  }

  private applyPendingIndentChange() {
    if (this.pendingIndentChange !== 0) {
      this.indentLevels.push(this.currentIndent + this.pendingIndentChange);
      this.pendingIndentChange = 0;
    }
  }

  private get currentIndent() {
    return this.indentLevels[this.indentLevels.length - 1];
  }
}

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

function notEmpty(x: OTree | string) {
  return x instanceof OTree ? !x.isEmpty : x !== '';
}

export function renderTree(tree: OTree, options?: OTreeSinkOptions): string {
  const sink = new OTreeSink(options);
  tree.write(sink);
  return sink.toString();
}

function containsNewline(x: string) {
  return x.indexOf('\n') !== -1;
}

export interface Span {
  start: number;
  end: number
}

function inside(a: Span, b: Span) {
  return b.start <= a.start && a.end <= b.end;
}