import { fixturize } from '../lib/fixtures';
import { SnippetParameters } from '../lib/snippet';

describe('fixturize', () => {
  test('snippet retains properties', () => {
    const snippet = {
      visibleSource: 'visibleSource',
      where: 'where',
      parameters: {
        [SnippetParameters.$PROJECT_DIRECTORY]: 'directory',
        [SnippetParameters.NO_FIXTURE]: '',
        key: 'value',
      },
      strict: true,
    };

    expect(fixturize(snippet)).toEqual(expect.objectContaining(snippet));
  });
});
