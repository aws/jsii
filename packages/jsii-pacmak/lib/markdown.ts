import commonmark = require('commonmark');

/**
 * Convert MarkDown to RST
 *
 * This is hard, and I'm doing it very hackily to get something out quickly.
 *
 * Preferably, the next person to look at this should a little more OO
 * instead of procedural.
 */
export function md2rst(text: string) {
    const parser = new commonmark.Parser({ smart: false });
    const ast = parser.parse(text);

    const ret = new Array<string>();

    let indent = 0;
    function line(...xs: string[]) {
      for (const x of xs) {
        ret.push((' '.repeat(indent) + x).trimRight());
      }
    }

    function directive(name: string, opening: boolean) {
      if (opening)  {
        line(`.. ${name}::`);
        brk();
        indent += 3;
      } else {
        indent -= 3;
      }
    }

    function brk() {
      if (ret.length > 0 && ret[ret.length - 1].trim() !== '') { ret.push(''); }
    }

    function textOf(node: commonmark.Node) {
      return node.literal || '';
    }

    let para = new Paragraph(); // Where to accumulate text fragments
    let lastParaLine: number; // Where the last paragraph ended, in order to add ::
    let nextParaPrefix: string | undefined;

    pump(ast, {
      block_quote(_node, entering) {
        directive('epigraph', entering);
      },

      heading(node, _entering) {
        line(node.literal || '');
        line(headings[node.level - 1].repeat(textOf(node).length));
      },

      paragraph(node, entering) {
        if (entering) {
          para = new Paragraph(nextParaPrefix);
          nextParaPrefix = undefined;
        } else {
          // Don't break inside list item
          if (node.parent == null || node.parent.type !== 'item') {
            brk();
          }
          line(...para.lines());
          lastParaLine = ret.length - 1;
        }
      },

      text(node) { para.add(textOf(node)); },
      softbreak() { para.newline(); },
      linebreak() { para.newline(); },
      thematic_break() { line('------'); },
      code(node) { para.add('``' + textOf(node) + '``'); },
      strong() { para.add('**'); },
      emph() { para.add('*'); },

      list() {
        brk();
      },

      link(node, entering) {
        if (entering) {
          para.add('`');
        } else {
          para.add(' <' + (node.destination || '') + '>`_');
        }
      },

      item(node, _entering) {
        // AST hierarchy looks like list -> item -> paragraph -> text
        if (node.listType === 'bullet') {
          nextParaPrefix = '- ';
        } else {
          nextParaPrefix = `${node.listStart}. `;
        }

      },

      code_block(node) {
        // Poke a double :: at the end of the previous line as per ReST "literal block" syntax.
        if (lastParaLine !== undefined) {
          const lastLine = ret[lastParaLine];
          ret[lastParaLine] = lastLine.replace(/[\W]$/, '::');
          if (ret[lastParaLine] === lastLine) { ret[lastParaLine] = lastLine + '::'; }
        } else {
          line('Example::');
        }

        brk();

        indent += 3;

        for (const l of textOf(node).split('\n')) {
          line(l);
        }

        indent -= 3;
      }

    });

    return ret.join('\n').trimRight();
}

class Paragraph {
  private readonly parts = new Array<string>();

  constructor(text?: string) {
    if (text !== undefined) { this.parts.push(text); }
  }

  public add(text: string) {
    this.parts.push(text);
  }

  public newline() {
    this.parts.push('\n');
  }

  public lines(): string[] {
    return this.parts.length > 0 ? this.toString().split('\n') : [];
  }

  public toString() {
    return this.parts.join('').trimRight();
  }
}

const headings = ['=', '-', '^', '"'];

type Handler = (node: commonmark.Node, entering: boolean) => void;
type Handlers = {[key in commonmark.NodeType]?: Handler };

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