/**
 * A tiny module to include annotated (working!) code snippets into the documentation
 *
 * Not using 'literate-programming' or 'erasumus' projects because they work
 * the other way around: take code from MarkDown, save it as a file, then
 * execute that.
 *
 * We do the opposite: start from source code annotated with MarkDown and
 * extract it into (larger) MarkDown files.
 *
 * Including into README
 * ---------------------
 *
 * To include the examples directly into the README, make a link to the
 * annotated TypeScript file on a line by itself, and make sure the
 * extension of the file ends in `.lit.ts`.
 *
 * For example:
 *
 *    [example](test/integ.bucket.lit.ts)
 *
 * Annotating source
 * -----------------
 *
 * We use the triple-slash comment for our directives, since it's valid TypeScript
 * and are treated as regular comments if not the very first thing in the file.
 *
 * By default, the whole file is included, unless the source contains the statement
 * "/// !show". For example:
 *
 *     a
 *     /// !show
 *     b
 *     /// !hide
 *     c
 *
 * In this example, only 'b' would be included in the output. A single file may
 * switching including and excluding on and off multiple times in the same file.
 *
 * Other lines starting with triple slashes will be rendered as Markdown in between
 * the source lines. For example:
 *
 *     const x = 1;
 *     /// Now we're going to print x:
 *     console.log(x);
 *
 * Will be rendered as:
 *
 *     ```ts
 *     const x = 1;
 *     ```
 *
 *     Now we're going to print x:
 *
 *     ```ts
 *     console.log(x);
 *     ```
 */
import fs = require('fs-extra');
import path = require('path');

/**
 * Convert an annotated TypeScript source file to MarkDown
 */
export function typescriptSourceToMarkdown(lines: string[]): string[] {
    const relevantLines = findRelevantLines(lines);
    const markdownLines = markdownify(relevantLines);
    return markdownLines;
}

export type FileLoader = (relativePath: string) => Promise<string[]>;

/**
 * Given MarkDown source, find source files to include and render
 *
 * We recognize links on a line by themselves if the link text starts
 * with the string "example" (case insensitive). For example:
 *
 *     [example](test/integ.bucket.ts)
 */
export async function includeAndRenderExamples(lines: string[], loader: FileLoader): Promise<string[]> {
    const ret: string[] = [];

    const regex = /^\[([^\]]*)\]\(([^)]+\.lit\.ts)\)/i;
    for (const line of lines) {
        const m = regex.exec(line);
        if (m) {
            // Found an include
            const source = await loader(m[2]);
            const imported = typescriptSourceToMarkdown(source);
            ret.push(...imported);
        } else {
            ret.push(line);
        }
    }

    return ret;
}

/**
 * Load a file into a string array
 */
export async function loadFromFile(fileName: string): Promise<string[]> {
    const content = await fs.readFile(fileName, { encoding: 'utf-8' });
    return contentToLines(content);
}

/**
 * Turn file content string into an array of lines ready for processing using the other functions
 */
export function contentToLines(content: string): string[] {
    return content.split('\n').map(x => x.trimRight());
}

/**
 * Return a file system loader given a base directory
 */
export function fileSystemLoader(directory: string): FileLoader {
    return fileName => loadFromFile(path.resolve(directory, fileName));
}

const RELEVANT_TAG = '/// !show';
const DETAIL_TAG = '/// !hide';
const INLINE_MD_REGEX = /^\s*\/\/\/ (.*)$/;

/**
 * Find the relevant lines of the input source
 *
 * Respects switching tags, returns everything if no switching found.
 *
 * Strips common indentation from the blocks it finds.
 */
function findRelevantLines(lines: string[]): string[] {
    let inRelevant = false;
    let didFindRelevant = false;
    const ret: string[] = [];

    for (const line of lines) {
        if (line.trim() === RELEVANT_TAG) {
            inRelevant = true;
            didFindRelevant = true;
        } else if (line.trim() === DETAIL_TAG) {
            inRelevant = false;
        } else {
            if (inRelevant) { ret.push(line); }
        }
    }

    // Return full lines list if no switching found
    return stripCommonIndent(didFindRelevant ? ret : lines);
}

/**
 * Remove common leading whitespace from the given lines
 */
function stripCommonIndent(lines: string[]): string[] {
    const leadingWhitespace = /^(\s*)/;
    const indents = lines.map(l => leadingWhitespace.exec(l)![1].length);
    const commonIndent = Math.min(...indents);
    return lines.map(l => l.substr(commonIndent));
}

/**
 * Turn source lines into Markdown, starting in TypeScript mode
 */
function markdownify(lines: string[]): string[] {
    const typescriptLines: string[] = [];
    const ret: string[] = [];

    for (const line of lines) {
        const m = INLINE_MD_REGEX.exec(line);
        if (m) {
            // Literal MarkDown line
            flushTS();
            ret.push(m[1]);
        } else {
            typescriptLines.push(line);
        }
    }

    flushTS();

    return ret;

    /**
     * Flush typescript lines with a triple-backtick-ts block around it.
     */
    function flushTS() {
        if (typescriptLines.length !== 0) {
            ret.push('```ts', ...typescriptLines, '```');
            typescriptLines.splice(0); // Clear
        }
    }
}
