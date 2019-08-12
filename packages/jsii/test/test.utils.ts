import nodeunit = require('nodeunit');
import { parsePerson, parseRepository } from '../lib/utils';

export = nodeunit.testCase({
  parsePerson: {
    'correctly parses NPM documentation example'(test: nodeunit.Test) {
      const parsed = parsePerson("Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)");
      test.deepEqual(parsed, {
        name: 'Barney Rubble',
        email: 'b@rubble.com',
        url: 'http://barnyrubble.tumblr.com/',
      });
      test.done();
    },

    'correctly parses NPM documentation example (minus URL)'(test: nodeunit.Test) {
      const parsed = parsePerson("Barney Rubble <b@rubble.com>");
      test.deepEqual(parsed, {
        name: 'Barney Rubble',
        email: 'b@rubble.com',
      });
      test.done();
    },

    'correctly parses NPM documentation example (minus email)'(test: nodeunit.Test) {
      const parsed = parsePerson("Barney Rubble (http://barnyrubble.tumblr.com/)");
      test.deepEqual(parsed, {
        name: 'Barney Rubble',
        url: 'http://barnyrubble.tumblr.com/',
      });
      test.done();
    },

    'correctly parses NPM documentation example (minus email and URL)'(test: nodeunit.Test) {
      const parsed = parsePerson("Barney Rubble");
      test.deepEqual(parsed, {
        name: 'Barney Rubble',
      });
      test.done();
    },
  },

  parseRepository: {
    'correctly parses npm/npm'(test: nodeunit.Test) {
      const parsed = parseRepository('npm/npm');
      test.deepEqual(parsed, {
        url: 'https://github.com/npm/npm.git'
      });
      test.done();
    },

    'correctly parses github:user/repo'(test: nodeunit.Test) {
      const parsed = parseRepository('github:user/repo');
      test.deepEqual(parsed, {
        url: 'https://github.com/user/repo.git'
      });
      test.done();
    },

    'correctly parses gist:user/11081aaa281'(test: nodeunit.Test) {
      const parsed = parseRepository('gist:user/11081aaa281');
      test.deepEqual(parsed, {
        url: 'https://gist.github.com/user/11081aaa281.git'
      });
      test.done();
    },

    'correctly parses bitbucket:user/repo'(test: nodeunit.Test) {
      const parsed = parseRepository('bitbucket:user/repo');
      test.deepEqual(parsed, {
        url: 'https://bitbucket.org/user/repo.git'
      });
      test.done();
    },

    'correctly parses gitlab:user/repo'(test: nodeunit.Test) {
      const parsed = parseRepository('gitlab:user/repo');
      test.deepEqual(parsed, {
        url: 'https://gitlab.com/user/repo.git'
      });
      test.done();
    },

    'passes through other values'(test: nodeunit.Test) {
      const parsed = parseRepository('not-even-a-url-:sadface:');
      test.deepEqual(parsed, {
        url: 'not-even-a-url-:sadface:'
      });
      test.done();
    }
  }
});
