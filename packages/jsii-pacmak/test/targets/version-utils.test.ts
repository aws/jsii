import { TargetName } from '../../lib/targets';
import {
  toMavenVersionRange,
  toNuGetVersionRange,
  toPythonVersionRange,
  toReleaseVersion,
} from '../../lib/targets/version-utils';

const examples: Record<
  string,
  { maven: string; nuget: string; python: string }
> = {
  // Regular versions, "classic" ranges
  '1.2.3': {
    maven: '[1.2.3]',
    nuget: '[1.2.3]',
    python: '==1.2.3',
  },
  '~1.2.3': {
    maven: '[1.2.3,1.3.0)',
    nuget: '[1.2.3,1.3.0)',
    python: '>=1.2.3, <1.3.0',
  },
  '^1.2.3': {
    maven: '[1.2.3,2.0.0)',
    nuget: '[1.2.3,2.0.0)',
    python: '>=1.2.3, <2.0.0',
  },

  // Pre-1.0 versions, "classic" ranges
  '0.1.2': {
    maven: '[0.1.2]',
    nuget: '[0.1.2]',
    python: '==0.1.2',
  },
  '~0.1.2': {
    maven: '[0.1.2,0.2.0)',
    nuget: '[0.1.2,0.2.0)',
    python: '>=0.1.2, <0.2.0',
  },
  '^0.1.2': {
    maven: '[0.1.2,0.2.0)',
    nuget: '[0.1.2,0.2.0)',
    python: '>=0.1.2, <0.2.0',
  },

  // Less usual ranges
  '>0.1.2': {
    maven: '(0.1.2,)',
    nuget: '(0.1.2,)',
    python: '>0.1.2',
  },
  '>=0.1.2': {
    maven: '[0.1.2,)',
    nuget: '[0.1.2,)',
    python: '>=0.1.2',
  },
  '<0.1.2': {
    maven: '(,0.1.2)',
    nuget: '(,0.1.2)',
    python: '<0.1.2',
  },
  '<=0.1.2': {
    maven: '(,0.1.2]',
    nuget: '(,0.1.2]',
    python: '<=0.1.2',
  },

  // Somewhat unusual ranges
  '*': {
    maven: '[0.0.0,)',
    nuget: '[0.0.0,)',
    python: '>=0.0.0',
  },
  '1.2.*': {
    maven: '[1.2.0,1.3.0)',
    nuget: '[1.2.0,1.3.0)',
    python: '>=1.2.0, <1.3.0',
  },
  '1.*': {
    maven: '[1.0.0,2.0.0)',
    nuget: '[1.0.0,2.0.0)',
    python: '>=1.0.0, <2.0.0',
  },
};

describe(toMavenVersionRange, () => {
  for (const [semver, { maven }] of Object.entries(examples)) {
    test(`${semver} translates to ${maven}`, () =>
      expect(toMavenVersionRange(semver)).toEqual(maven));
  }
});

test('Maven dependency on jsii-runtime for a development version is workable', () => {
  expect(toMavenVersionRange('^0.0.0')).toEqual('[0.0.0,)');
});

describe(toNuGetVersionRange, () => {
  for (const [semver, { nuget }] of Object.entries(examples)) {
    test(`${semver} translates to ${nuget}`, () =>
      expect(toNuGetVersionRange(semver)).toEqual(nuget));
  }
});

describe(toPythonVersionRange, () => {
  for (const [semver, { python }] of Object.entries(examples)) {
    test(`${semver} translates to ${python}`, () =>
      expect(toPythonVersionRange(semver)).toEqual(python));
  }
});

describe(toReleaseVersion, () => {
  type Expectations = { readonly [K in TargetName]: string | RegExp };
  const examples: Record<string, Expectations> = {
    '1.2.3': {
      dotnet: '1.2.3',
      go: '1.2.3',
      java: '1.2.3',
      js: '1.2.3',
      python: '1.2.3',
    },
    '1.2.3-pre': {
      dotnet: '1.2.3-pre',
      go: '1.2.3-pre',
      java: '1.2.3-pre',
      js: '1.2.3-pre',
      python:
        /Unable to map prerelease identifier \(in: 1\.2\.3-pre\) components to python: \[ 'pre' \]/,
    },
    '1.2.3-dev.123.0+abc123.foo.bar': {
      dotnet: '1.2.3-dev.123.0+abc123.foo.bar',
      go: '1.2.3-dev.123.0+abc123.foo.bar',
      java: '1.2.3-dev.123.0+abc123.foo.bar',
      js: '1.2.3-dev.123.0+abc123.foo.bar',
      python: '1.2.3.dev123+abc123.foo.bar',
    },
    '1.2.3-alpha.1337': {
      dotnet: '1.2.3-alpha.1337',
      go: '1.2.3-alpha.1337',
      java: '1.2.3-alpha.1337',
      js: '1.2.3-alpha.1337',
      python: '1.2.3.a1337',
    },
    '1.2.3-beta.42': {
      dotnet: '1.2.3-beta.42',
      go: '1.2.3-beta.42',
      java: '1.2.3-beta.42',
      js: '1.2.3-beta.42',
      python: '1.2.3.b42',
    },
    '1.2.3-rc.9': {
      dotnet: '1.2.3-rc.9',
      go: '1.2.3-rc.9',
      java: '1.2.3-rc.9',
      js: '1.2.3-rc.9',
      python: '1.2.3.rc9',
    },
    '1.2.3-rc.123.post.456.dev.789': {
      dotnet: '1.2.3-rc.123.post.456.dev.789',
      go: '1.2.3-rc.123.post.456.dev.789',
      java: '1.2.3-rc.123.post.456.dev.789',
      js: '1.2.3-rc.123.post.456.dev.789',
      python: '1.2.3.rc123.post456.dev789',
    },
    '1.2.3-rc.alpha': {
      dotnet: '1.2.3-rc.alpha',
      go: '1.2.3-rc.alpha',
      java: '1.2.3-rc.alpha',
      js: '1.2.3-rc.alpha',
      python:
        /Unable to map prerelease identifier \(in: 1.2.3-rc.alpha\) components to python: \[ 'rc', 'alpha' \]/,
    },
  };

  for (const [version, targets] of Object.entries(examples)) {
    test(`"${version}" translations`, () => {
      for (const [target, expectedResult] of Object.entries(targets)) {
        if (typeof expectedResult === 'string') {
          expect(toReleaseVersion(version, target as TargetName)).toBe(
            expectedResult,
          );
        } else {
          expect(() => toReleaseVersion(version, target as TargetName)).toThrow(
            expectedResult,
          );
        }
      }
    });
  }
});
