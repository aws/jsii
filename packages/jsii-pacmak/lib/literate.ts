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
 * To include the examples directly
 * into the README, make a link to the annotated TypeScript file on a line
 * by itself, and name the link something starting with "example" (case insensitive).
 *
 * For example:
 *
 *    [example](test/integ.bucket.ts)
 *
 * Annotating source
 * -----------------
 *
 * We use the triple-slash comment for our directives, since it's valid TypeScript
 * and are treated as regular comments if not the very first thing in the file.
 *
 * By default, the whole file is included, unless the source contains the statement
 * "/// !relevant". For example:
 *
 *     a
 *     /// !relevant
 *     b
 *     /// !detail
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
import fs = require('fs');
import path = require('path');

/**
 * Convert an annotated TypeScript source file to MarkDown
 */
export function typescriptSourceToMarkdown(lines: string[]): string[] {
    const relevantLines = findRelevantLines(lines);
    const markdownLines = markdownify(relevantLines);
    return markdownLines;
}

export type FileLoader = (relativePath: string) => string[];

/**
 * Given MarkDown source, find source files to include and render
 *
 * We recognize links on a line by themselves if the link text starts
 * with the string "example" (case insensitive). For example:
 *
 *     [example](test/integ.bucket.ts)
 */
export function includeAndRenderExamples(lines: string[], loader: FileLoader): string[] {
    const ret: string[] = [];

    const regex = /^\[example([^\]]*)\]\(([^)]+)\)/i;
    for (const line of lines) {
        const m = regex.exec(line);
        if (m) {
            // Found an include
            const source = loader(m[2]);
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
export function loadFromFile(fileName: string): string[] {
    const content = fs.readFileSync(fileName, { encoding: 'utf-8' });
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
    return function(fileName: string) {
        return loadFromFile(path.resolve(directory, fileName));
    };
}

const RELEVANT_TAG = '/// !relevant';
const DETAIL_TAG = '/// !detail';
const MD_PREFIX = '/// ';

/**
 * Find the relevant lines of the input source
 *
 * Respects switching tags, returns everything if no switching found.
 */
function findRelevantLines(lines: string[]): string[] {
    let inRelevant = false;
    let didFindRelevant = false;
    const ret: string[] = [];

    for (const line of lines) {
        if (line === RELEVANT_TAG) {
            inRelevant = true;
            didFindRelevant = true;
        } else if (line === DETAIL_TAG) {
            inRelevant = false;
        } else {
            if (inRelevant) ret.push(line);
        }
    }

    // Return full lines list if no switching found
    return didFindRelevant ? ret : lines;
}

/**
 * Turn source lines into Markdown, starting in TypeScript mode
 */
function markdownify(lines: string[]): string[] {
    const typescriptLines: string[] = [];
    const ret: string[] = [];

    for (const line of lines) {
        if (line.startsWith(MD_PREFIX)) {
            // Literal MarkDown line
            flushTS();
            ret.push(line.substr(MD_PREFIX.length));
        } else {
            typescriptLines.push(line);
        }
    }

    flushTS();

    return ret;

    /**
     * Flush typescript lines with a ``` block around it.
     */
    function flushTS() {
        if (typescriptLines.length !== 0) {
            ret.push('```ts');
            ret.push(...typescriptLines);
            ret.push('```');

            typescriptLines.splice(0); // Clear
        }
    }
}