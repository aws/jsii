import {
  toMavenVersionRange,
  toNuGetVersionRange,
  toPythonVersionRange,
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
    maven: '(0.1.2,]',
    nuget: '(0.1.2,]',
    python: '>0.1.2',
  },
  '>=0.1.2': {
    maven: '[0.1.2,]',
    nuget: '[0.1.2,]',
    python: '>=0.1.2',
  },
  '<0.1.2': {
    maven: '[,0.1.2)',
    nuget: '[,0.1.2)',
    python: '<0.1.2',
  },
  '<=0.1.2': {
    maven: '[,0.1.2]',
    nuget: '[,0.1.2]',
    python: '<=0.1.2',
  },
};

describe(toMavenVersionRange, () => {
  for (const [semver, { maven }] of Object.entries(examples)) {
    test(`${semver} translates to ${maven}`, () =>
      expect(toMavenVersionRange(semver)).toEqual(maven));
  }
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
