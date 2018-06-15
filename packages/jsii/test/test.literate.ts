import { Test } from 'nodeunit';
import { typescriptSourceToMarkdown, includeAndRenderExamples } from '../lib/literate';

export = {
    'simple file gets wrapped in tags': function(test: Test) {
        assertRendersTo(test, [
            'const x = 1;',
            'console.log(x);'
        ], [
            '```ts',
            'const x = 1;',
            'console.log(x);',
            '```'
        ]);
        test.done();
    },

    'can switch on and off': function(test: Test) {
        assertRendersTo(test, [
            'const x = 1;',
            '/// !show',
            'console.log(x);',
            '/// !hide',
            'console.log("It worked")'
        ], [
            '```ts',
            'console.log(x);',
            '```'
        ]);
        test.done();
    },

    'common whitespace in a single block gets stripped': function(test: Test) {
        assertRendersTo(test, [
            'const x = 1;',
            'if (x) {',
            '    /// !show',
            '    console.log(x);',
            '    /// !hide',
            '}',
        ], [
            '```ts',
            'console.log(x);',
            '```'
        ]);
        test.done();
    },

    'inline markdown with indentation still gets rendered': function(test: Test) {
        assertRendersTo(test, [
            'const x = 1;',
            'if (x) {',
            '    /// This is how we render x',
            '    console.log(x);',
            '}',
        ], [
            '```ts',
            'const x = 1;',
            'if (x) {',
            '```',
            'This is how we render x',
            '```ts',
            '    console.log(x);',
            '}',
            '```'
        ]);
        test.done();
    },

    'subsequent code blocks get joined': function(test: Test) {
        assertRendersTo(test, [
            '/// !show',
            'let x = 1;',
            '/// !hide',
            'x += 1;',
            '/// !show',
            'console.log(x);',
            '/// !hide',
        ], [
            '```ts',
            'let x = 1;',
            'console.log(x);',
            '```'
        ]);
        test.done();

    },

    'can add inline MarkDown': function(test: Test) {
        assertRendersTo(test, [
            'const x = 1;',
            '/// This is how we print x',
            'console.log(x);',
        ], [
            '```ts',
            'const x = 1;',
            '```',
            'This is how we print x',
            '```ts',
            'console.log(x);',
            '```'
        ]);
        test.done();
    },

    'can do example inclusion': async function(test: Test) {
        const inputMarkDown = [
            'This is a preamble',
            '[included here](test/something.lit.ts)',
            'This is a postamble'
        ];

        const fakeLoader = async function(fileName: string): Promise<string[]> {
            test.equal('test/something.lit.ts', fileName);
            return [
                'const x = 1;',
                '/// This is how we print x',
                'console.log(x);',
            ];
        }

        const rendered = await includeAndRenderExamples(inputMarkDown, fakeLoader);

        test.deepEqual(rendered, [
            'This is a preamble',
            '```ts',
            'const x = 1;',
            '```',
            'This is how we print x',
            '```ts',
            'console.log(x);',
            '```',
            'This is a postamble'
        ]);
        test.done();
    }
};

function assertRendersTo(test: Test, source: string[], expected: string[]) {
    const rendered = typescriptSourceToMarkdown(source);
    test.deepEqual(expected, rendered);
}