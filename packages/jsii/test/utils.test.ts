import { parsePerson, parseRepository } from '../lib/utils';

describe('parsePerson', () => {
  test('correctly parses NPM documentation example', () => {
    const parsed = parsePerson('Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)');
    expect(parsed).toEqual({
      name: 'Barney Rubble',
      email: 'b@rubble.com',
      url: 'http://barnyrubble.tumblr.com/',
    });
  });

  test('correctly parses NPM documentation example (minus URL)', () => {
    const parsed = parsePerson('Barney Rubble <b@rubble.com>');
    expect(parsed).toEqual({
      name: 'Barney Rubble',
      email: 'b@rubble.com',
    });
  });

  test('correctly parses NPM documentation example (minus email)', () => {
    const parsed = parsePerson('Barney Rubble (http://barnyrubble.tumblr.com/)');
    expect(parsed).toEqual({
      name: 'Barney Rubble',
      url: 'http://barnyrubble.tumblr.com/',
    });
  });

  test('correctly parses NPM documentation example (minus email and URL)', () => {
    const parsed = parsePerson('Barney Rubble');
    expect(parsed).toEqual({
      name: 'Barney Rubble',
    });
  });
});

describe('parseRepository', () => {
  test('correctly parses npm/npm', () => {
    const parsed = parseRepository('npm/npm');
    expect(parsed).toEqual({
      url: 'https://github.com/npm/npm.git'
    });
  });

  test('correctly parses github:user/repo', () => {
    const parsed = parseRepository('github:user/repo');
    expect(parsed).toEqual({
      url: 'https://github.com/user/repo.git'
    });
  });

  test('correctly parses gist:user/11081aaa281', () => {
    const parsed = parseRepository('gist:user/11081aaa281');
    expect(parsed).toEqual({
      url: 'https://gist.github.com/user/11081aaa281.git'
    });
  });

  test('correctly parses bitbucket:user/repo', () => {
    const parsed = parseRepository('bitbucket:user/repo');
    expect(parsed).toEqual({
      url: 'https://bitbucket.org/user/repo.git'
    });
  });

  test('correctly parses gitlab:user/repo', () => {
    const parsed = parseRepository('gitlab:user/repo');
    expect(parsed).toEqual({
      url: 'https://gitlab.com/user/repo.git'
    });
  });

  test('passes through other values', () => {
    const parsed = parseRepository('not-even-a-url-:sadface:');
    expect(parsed).toEqual({
      url: 'not-even-a-url-:sadface:'
    });
  });
});
