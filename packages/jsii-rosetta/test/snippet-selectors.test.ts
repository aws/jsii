import { typeScriptSnippetFromSource } from '../lib/snippet';
import { longest, mean, meanLength, shortest } from '../lib/snippet-selectors';
import { TranslatedSnippet } from '../lib/tablets/tablets';
import { testSnippetLocation } from './testutil';

const snippets: TranslatedSnippet[] = [];
const sources: string[] = [
  `export class ClassA {
    public someMethod() {
    }
  }`,
  `export class ClassA {
    public someMethod() {
    }
  }
  export interface BeeArgs { readonly value: string; }
  `,
  `export class ClassA {
    public someMethod() {
    }
  }
  export class ClassB {
    public argumentMethod(args: BeeArgs) {
      Array.isArray(args);
    }
  }
  export interface BeeArgs { readonly value: string; }
  `,
];
beforeAll(() => {
  for (const source of sources) {
    const snippet = TranslatedSnippet.fromTypeScript(
      typeScriptSnippetFromSource(source, testSnippetLocation('selectors'), false),
    );
    snippets.push(snippet);
  }
});

test('longest', () => {
  const result = longest(snippets);
  expect(result).toEqual(snippets[2]);
});

test('meanLength', () => {
  const result = meanLength(snippets);
  expect(result).toEqual(snippets[1]);
});

test('shortest', () => {
  const result = shortest(snippets);
  expect(result).toEqual(snippets[0]);
});

test('mean', () => {
  // Add fake syntax counters to ensure that snippets[1] is the closest euclidean distance.
  snippets[0].addSyntaxKindCounter({ 1: 1, 2: 5, 3: 1 });
  snippets[1].addSyntaxKindCounter({ 1: 1, 2: 3, 3: 2 });
  snippets[2].addSyntaxKindCounter({ 1: 1, 2: 1, 3: 4 });
  const result = mean(snippets);
  expect(result).toEqual(snippets[1]);
});
