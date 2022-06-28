import * as ts from 'typescript';

import { Span } from '../o-tree';

/**
 * A class representing a set of non-overlapping Spans.
 */
export class Spans {
  /**
   * Derive visible spans from marked source (`/// !show` and `/// !hide` directives).
   */
  public static visibleSpansFromSource(source: string) {
    return new Spans(calculateMarkedSpans(source).filter((s) => s.visible));
  }

  public constructor(private readonly _spans: Span[]) {
    _spans.sort((a, b) => a.start - b.start);

    // Merge adjacent spans
    let i = 0;
    while (i < this._spans.length - 1) {
      const current = this._spans[i];
      const next = this._spans[i + 1];

      if (current.end === next.start) {
        // Replace these two with a new, merged one
        this._spans.splice(i, 2, {
          start: current.start,
          end: next.end,
        });
      } else {
        // Else advance
        i++;
      }
    }
  }

  public get spans(): readonly Span[] {
    return this._spans;
  }

  /**
   * Whether another span is fully contained within this set of spans
   */
  public fullyContainsSpan(span: Span) {
    const candidate = this.findSpan(span.start);
    return !!candidate && spanInside(span, candidate);
  }

  public containsPosition(pos: number) {
    const candidate = this.findSpan(pos);
    return !!candidate && spanContains(candidate, pos);
  }

  /**
   * Return whether the START of the given node is visible
   *
   * For nodes that potentially span many lines (like class declarations)
   * this will check the first line.
   */
  public containsStartOfNode(node: ts.Node) {
    return this.containsPosition(node.getStart());
  }

  /**
   * Find the span that would contain the given position, if any
   *
   * Returns the highest span s.t. span.start <= position. Uses the fact that
   * spans are non-overlapping.
   */
  private findSpan(position: number): Span | undefined {
    // For now, using linear search as the amount of spans is rather trivial.
    // Change to binary search if this ever becomes an issue
    if (this.spans.length === 0 || position < this._spans[0].start) {
      return undefined;
    }

    let candidate = this._spans[0];
    let i = 1;
    while (i < this.spans.length && this.spans[i].start <= position) {
      candidate = this._spans[i];
      i++;
    }
    return candidate;
  }
}

export function trimCompleteSourceToVisible(source: string): string {
  const spans = Spans.visibleSpansFromSource(source);

  return spans.spans
    .map((span) => source.substring(span.start, span.end))
    .join('')
    .trimRight();
}

export interface MarkedSpan {
  start: number;
  end: number;
  visible: boolean;
}

function calculateMarkedSpans(source: string): MarkedSpan[] {
  const regEx = /^[ \t]*[/]{3}[ \t]*(!(?:show|hide))[ \t]*$/gm;

  const ret = new Array<MarkedSpan>();
  let match;
  let spanStart;
  let visible = true;
  while ((match = regEx.exec(source)) != null) {
    const directiveStart = match.index;
    const directive = match[1].trim();
    if (['!hide', '!show'].includes(directive)) {
      const isShow = directive === '!show';
      if (spanStart === undefined) {
        // Add a span at the start which is the reverse of the actual first directive
        ret.push({ start: 0, end: directiveStart, visible: !isShow });
      } else {
        // Else add a span for the current directive
        ret.push({ start: spanStart, end: directiveStart, visible });
      }
      visible = isShow;

      // A directive eats its trailing newline.
      spanStart = match.index + match[0].length + 1;
    }
  }

  // Add the remainder under the last visibility
  ret.push({ start: spanStart ?? 0, end: source.length, visible });

  // Filter empty spans and return
  return ret.filter((s) => s.start < s.end);
}

/**
 * Whether span a is fully inside span b
 */
export function spanInside(a: Span, b: Span) {
  return b.start <= a.start && a.end <= b.end;
}

export function spanContains(a: Span, position: number) {
  return a.start <= position && position < a.end;
}
