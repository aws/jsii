import * as commonmark from 'commonmark';

/**
 * Convert MarkDown to RST
 */
export function md2rst(text: string) {
  const parser = new commonmark.Parser({ smart: false });
  const ast = parser.parse(text);

  const doc = new DocumentBuilder();

  function directive(name: string, opening: boolean) {
    if (opening) {
      doc.appendLine(`.. ${name}::`);
      doc.paraBreak();
      doc.pushPrefix('   ');
    } else {
      doc.popPrefix();
    }
  }

  function textOf(node: commonmark.Node) {
    return node.literal?.replace(/\\/g, '\\\\') ?? '';
  }

  pump(ast, {
    block_quote(_node, entering) {
      directive('epigraph', entering);
    },

    heading(node, _entering) {
      doc.appendLine(node.literal ?? '');
      doc.appendLine(headings[node.level - 1].repeat(textOf(node).length));
    },

    paragraph(node, entering) {
      // If we're going to a paragraph that's not in a list, open a block.
      if (entering && node.parent && node.parent.type !== 'item') {
        doc.paraBreak();
      }

      // If we're coming out of a paragraph that's being followed by
      // a code block, make sure the current line ends in '::':
      if (!entering && node.next && node.next?.type === 'code_block') {
        doc.transformLastLine((lastLine) => {
          const appended = lastLine.replace(/[\W]$/, '::');
          if (appended !== lastLine) {
            return appended;
          }

          return `${lastLine} Example::`;
        });
      }

      // End of paragraph at least implies line break.
      if (!entering) {
        doc.newline();
      }
    },

    text(node) {
      doc.append(textOf(node));
    },
    softbreak() {
      doc.newline();
    },
    linebreak() {
      doc.newline();
    },
    thematic_break() {
      doc.appendLine('------');
    },
    code(node) {
      doc.append(`\`\`${textOf(node)}\`\``);
    },
    strong() {
      doc.append('**');
    },
    emph() {
      doc.append('*');
    },

    list() {
      doc.paraBreak();
    },

    link(node, entering) {
      if (entering) {
        doc.append('`');
      } else {
        doc.append(` <${node.destination ?? ''}>\`_`);
      }
    },

    item(node, entering) {
      // AST hierarchy looks like list -> item -> paragraph -> text
      if (entering) {
        if (node.listType === 'bullet') {
          doc.pushBulletPrefix('- ');
        } else {
          doc.pushBulletPrefix(`${node.listStart}. `);
        }
      } else {
        doc.popPrefix();
      }
    },

    code_block(node) {
      doc.paraBreak();

      // If there's no paragraph just before me, add the word "Example::".
      if (!node.prev || node.prev.type !== 'paragraph') {
        doc.appendLine('Example::');
        doc.paraBreak();
      }

      doc.pushBulletPrefix('   ');

      for (const l of textOf(node).replace(/\n+$/, '').split('\n')) {
        doc.appendLine(l);
      }

      doc.popPrefix();
    },
  });

  return doc.toString();
}

export function md2html(text: string): string {
  const parser = new commonmark.Parser({ smart: false });
  const renderer = new commonmark.HtmlRenderer({ smart: false, safe: true });
  return renderer.render(parser.parse(text));
}

/**
 * Build a document incrementally
 */
class DocumentBuilder {
  private readonly prefix = new Array<string>();
  private readonly lines = new Array<string[]>();
  private queuedNewline = false;

  public constructor() {
    this.lines.push([]);
  }

  public pushPrefix(prefix: string) {
    this.prefix.push(prefix);
  }

  public popPrefix() {
    this.prefix.pop();
  }

  public paraBreak() {
    if (this.lines.length > 0 && partsToString(this.lastLine) !== '') {
      this.newline();
    }
  }

  public get length() {
    return this.lines.length;
  }

  public get lastLine() {
    return this.lines[this.length - 1];
  }

  public append(text: string) {
    this.flushQueuedNewline();
    this.lastLine.push(text);
  }

  public appendLine(...lines: string[]) {
    for (const line of lines) {
      this.append(line);
      this.newline();
    }
  }

  public pushBulletPrefix(prefix: string) {
    this.append(prefix);
    this.pushPrefix(' '.repeat(prefix.length));
  }

  public transformLastLine(block: (x: string) => string) {
    if (this.length >= 0) {
      this.lines[this.length - 1].splice(
        0,
        this.lastLine.length,
        block(partsToString(this.lastLine)),
      );
    } else {
      this.lines.push([block('')]);
    }
  }

  public newline() {
    this.flushQueuedNewline();
    // Don't do the newline here, wait to apply the correct indentation when and if we add more text.
    this.queuedNewline = true;
  }

  public toString() {
    return this.lines.map(partsToString).join('\n').replace(/\n+$/, '');
  }

  private flushQueuedNewline() {
    if (this.queuedNewline) {
      this.lines.push([...this.prefix]);
      this.queuedNewline = false;
    }
  }
}

/**
 * Turn a list of string fragments into a string
 */
function partsToString(parts: string[]) {
  return parts.join('').trimRight();
}

const headings = ['=', '-', '^', '"'];

type Handler = (node: commonmark.Node, entering: boolean) => void;
type Handlers = { [key in commonmark.NodeType]?: Handler };

/**
 * Pump a CommonMark AST tree through a set of handlers
 */
function pump(ast: commonmark.Node, handlers: Handlers) {
  const walker = ast.walker();
  let event = walker.next();
  while (event) {
    const h = handlers[event.node.type];
    if (h) {
      h(event.node, event.entering);
    }

    event = walker.next();
  }
}

/*
  A typical AST looks like this:

  document
   ├─┬ paragraph
   │ └── text
   └─┬ list
     ├─┬ item
     │ └─┬ paragraph
     │   ├── text
     │   ├── softbreak
     │   └── text
     └─┬ item
       └─┬ paragraph
         ├── text
         ├─┬ emph
         │ └── text
         └── text

 */
