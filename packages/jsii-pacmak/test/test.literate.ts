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
            '/// !relevant',
            'console.log(x);',
            '/// !detail',
            'console.log("It worked")'
        ], [
            '```ts',
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

    'can do example inclusion': function(test: Test) {
        const inputMarkDown = [
            'This is a preamble',
            '[example here](test/something.ts)',
            'This is a postamble'
        ];

        const fakeLoader = function(fileName: string) {
            test.equal('test/something.ts', fileName);
            return [
                'const x = 1;',
                '/// This is how we print x',
                'console.log(x);',
            ];
        }

        const rendered = includeAndRenderExamples(inputMarkDown, fakeLoader);

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