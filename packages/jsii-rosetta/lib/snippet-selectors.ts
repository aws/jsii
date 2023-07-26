import { TranslatedSnippet } from './tablets/tablets';

export type SnippetSelector = (snippets: TranslatedSnippet[]) => TranslatedSnippet;

class SnippetScore {
  public constructor(
    public readonly snippet: TranslatedSnippet,
    public readonly score: number,
  ) {}
}

/**
 * Returns the longest available snippet.
 */
export function longest(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length === 0) {
    throw new Error('longest: array cannot be empty');
  }
  const snippetScores: SnippetScore[] = [];
  for (const snippet of snippets) {
    snippetScores.push({ snippet: snippet, score: snippet.originalSource.source.length });
  }
  return getMaxScore(snippetScores).snippet;
}

/**
 * Returns the shortest available snippet.
 */
export function shortest(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length === 0) {
    throw new Error('shortest: array cannot be empty');
  }
  const snippetScores: SnippetScore[] = [];
  for (const snippet of snippets) {
    snippetScores.push({ snippet: snippet, score: snippet.originalSource.source.length });
  }
  return getMinScore(snippetScores).snippet;
}

/**
 * Returns the snippet with the length closest to the mean length of the available snippets.
 */
export function meanLength(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length === 0) {
    throw new Error('meanLength: array cannot be empty');
  }

  const mean = snippets.reduce((x, y) => x + y.originalSource.source.length, 0) / snippets.length;
  const snippetScores: SnippetScore[] = [];
  for (const snippet of snippets) {
    snippetScores.push({ snippet: snippet, score: Math.abs(snippet.originalSource.source.length - mean) });
  }
  return getMinScore(snippetScores).snippet;
}

/**
 * Finds and returns the mean sparse vector of available snippets for each type.
 */
export function mean(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length === 0) {
    throw new Error('mean: array cannot be empty');
  }

  // Find mean counter.
  const counters: Array<Record<string, number>> = [];
  snippets.map((snippet) => {
    counters.push(snippet.snippet.syntaxKindCounter ?? {});
  });
  const meanCounter = findCenter(counters);
  // Find counter with closest euclidian distance.
  const snippetScores: SnippetScore[] = [];
  for (let i = 0; i < snippets.length; i++) {
    snippetScores.push({ snippet: snippets[i], score: euclideanDistance(meanCounter, counters[i]) });
  }
  return getMinScore(snippetScores).snippet;
}

/**
 * Given a list of Records, outputs a Record that averages all the items in each Record.
 */
function findCenter(counters: Array<Record<string, number>>): Record<string, number> {
  const centerCounter: Record<string, number> = {};
  for (const counter of counters) {
    for (const [key, value] of Object.entries(counter)) {
      centerCounter[key] = value + (centerCounter[key] ?? 0);
    }
  }
  const total = counters.length;
  Object.entries(centerCounter).map(([key, value]) => {
    centerCounter[key] = value / total;
  });
  return centerCounter;
}

/**
 * Finds the euclidean distance between two sparse vectors.
 * !!! This function assumes that the center parameter is a superset of the counter parameter. !!!
 */
function euclideanDistance(center: Record<string, number>, counter: Record<string, number>): number {
  const individualDistances: number[] = [];
  Object.entries(center).map(([key, value]) => {
    individualDistances.push(value - (counter[key] ?? 0));
  });
  return individualDistances.reduce((acc, curr) => acc + Math.sqrt(Math.pow(curr, 2)), 0);
}

function getMaxScore(snippetScores: SnippetScore[]): SnippetScore {
  return snippetScores.reduce((x, y) => {
    return x.score >= y.score ? x : y;
  });
}

function getMinScore(snippetScores: SnippetScore[]): SnippetScore {
  return snippetScores.reduce((x, y) => {
    return x.score <= y.score ? x : y;
  });
}
