import * as prompts from '@inquirer/prompts';
import { Stability } from '@jsii/spec';
import * as fs from 'fs';

import jsiiConfig from '../lib';
import { packageJsonObject, findQuestions, findQuestion } from './util';
import getQuestions from '../lib/questions';

// Mock individual @inquirer/prompts functions
// @inquirer/prompts v8 is ESM-only, so we provide a full manual mock
jest.mock('@inquirer/prompts', () => {
  class Separator {
    public separator: string;
    public type = 'separator';
    public constructor(separator = '--------') {
      this.separator = separator;
    }
  }
  return {
    Separator,
    input: jest.fn(),
    select: jest.fn(),
    checkbox: jest.fn(),
    confirm: jest.fn(),
  };
});

const inputMock = prompts.input as jest.MockedFunction<typeof prompts.input>;
const selectMock = prompts.select as jest.MockedFunction<typeof prompts.select>;
const checkboxMock = prompts.checkbox as jest.MockedFunction<
  typeof prompts.checkbox
>;
const confirmMock = prompts.confirm as jest.MockedFunction<
  typeof prompts.confirm
>;

describe('jsii-config', () => {
  const readJsonMock = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line no-import-assign
    Object.defineProperty(fs, 'readFile', { value: readJsonMock });
    jest.clearAllMocks();
  });

  describe('errors', () => {
    it('throws when no readFile fails', async () => {
      const message = 'Err Message';
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(new Error(message));
        },
      );
      await expect(jsiiConfig('unknown.json')).rejects.toThrow(message);
    });

    it('throws when package.json is invalid', async () => {
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(null, Buffer.from('INVALID JSON STRING'));
        },
      );

      await expect(jsiiConfig('package.json')).rejects.toThrow(
        new RegExp(
          [
            // Error produced by JSON.parse in Node < 19
            'Unexpected token I in JSON at position 0',
            // Error produced by JSON.parse in Node >= 19
            `Unexpected token 'I', "INVALID JSON STRING" is not valid JSON`,
          ].join('|'),
        ),
      );
    });
  });

  describe('missing top level package fields', () => {
    const mockMissingField = (field: string) =>
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(
            null,
            Buffer.from(
              JSON.stringify({
                ...packageJsonObject,
                [field]: undefined,
              }),
            ),
          );
        },
      );

    const requiredNpmFields = [
      'name',
      'version',
      'repository',
      'main',
      'author',
    ];

    requiredNpmFields.forEach((field) => {
      it(`warns user on missing ${field} in package.json and exits`, async () => {
        mockMissingField(field);
        await expect(jsiiConfig('./package.json')).rejects.toThrow(
          `package.json is missing required fields:${'\n'}- ${field}${'\n'}run "npm init" or configure manually and retry jsii-config`,
        );
      });
    });
  });

  describe('question structure', () => {
    // These tests verify the question descriptors directly without running prompts
    const questions = getQuestions(packageJsonObject);

    it('prompts user for top level jsii config and language targets', () => {
      const [stability, types, tscOutDir, versionFormat, targets, tsconfig] =
        findQuestions(
          [
            'stability',
            'types',
            'jsii.tsc.outDir',
            'jsii.versionFormat',
            'jsiiTargets',
            'tsconfig',
          ],
          questions,
        );
      expect(stability).toHaveProperty('type', 'list');
      expect(stability).toHaveProperty('choices', [
        'deprecated',
        'experimental',
        'stable',
        'external',
      ]);
      expect(stability).toHaveProperty('default', 'experimental');

      expect(types).toHaveProperty('type', 'input');
      expect(types).toHaveProperty('default', 'index.d.ts');

      expect(tscOutDir).toHaveProperty('type', 'input');
      expect(tscOutDir).toHaveProperty('default', 'dist');

      expect(versionFormat).toHaveProperty('type', 'list');
      expect(versionFormat.choices).toContain('full');
      expect(versionFormat.choices).toContain('short');

      expect(targets).toHaveProperty('type', 'checkbox');
      expect(targets).toHaveProperty('choices', [
        'java',
        'python',
        'dotnet',
        'go',
      ]);

      expect(tsconfig).toHaveProperty('type', 'list');
      expect(tsconfig.choices).toContain('jsii-managed');
      expect(tsconfig.choices).toContain('user-provided');
    });

    it('prompts for java specific values when only target enabled', () => {
      const enabled = { jsiiTargets: ['java'] };
      const disabled = { jsiiTargets: [] };
      const subject = findQuestions(
        [
          'jsii.targets.java.package',
          'jsii.targets.java.maven.groupId',
          'jsii.targets.java.maven.artifactId',
          'jsii.targets.java.maven.versionSuffix',
        ],
        questions,
      );

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for python specific values only when target enabled', () => {
      const enabled = { jsiiTargets: ['python'] };
      const disabled = { jsiiTargets: [] };
      const subject = findQuestions(
        ['jsii.targets.python.module', 'jsii.targets.python.distName'],
        questions,
      );

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for dotnet specific values only when target enabled', () => {
      const enabled = { jsiiTargets: ['dotnet'] };
      const disabled = { jsiiTargets: [] };
      const subject = findQuestions(
        [
          'jsii.targets.dotnet.namespace',
          'jsii.targets.dotnet.packageId',
          'jsii.targets.dotnet.iconUrl',
          'jsii.targets.dotnet.versionSuffix',
        ],
        questions,
      );

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for tsc.outDir only when jsii-managed tsconfig is enabled', () => {
      const enabled = { tsconfig: 'jsii-managed' };
      const disabled = { tsconfig: 'user-provided' };
      const subject = findQuestions(['jsii.tsc.outDir'], questions);

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for user-provided tsconfig settings only when user-provided tsconfig is enabled', () => {
      const enabled = { tsconfig: 'user-provided' };
      const disabled = { tsconfig: 'jsii-managed' };
      const subject = findQuestions(
        ['jsii.tsconfig', 'jsii.validateTsconfig'],
        questions,
      );

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    [
      'types',
      'jsii.tsc.outDir',
      'jsii.targets.java.package',
      'jsii.targets.java.maven.groupId',
      'jsii.targets.java.maven.artifactId',
      'jsii.targets.python.distName',
      'jsii.targets.python.module',
      'jsii.targets.dotnet.namespace',
      'jsii.targets.dotnet.packageId',
    ].forEach((field) => {
      it(`shows error message when empty ${field} is submitted`, () => {
        const subject = findQuestion(field, questions);

        expect(subject.validate()).toEqual('Please enter a value');
        expect(subject.validate('')).toEqual('Please enter a value');
      });
    });

    it('shows error message when dotnet version suffix is submitted empty or without a "-"', () => {
      const subject = findQuestion(
        'jsii.targets.dotnet.versionSuffix',
        questions,
      );

      expect(subject.validate('xxx')).toEqual(
        'versionSuffix must begin with "-"',
      );
      expect(subject.validate('-xxx')).toEqual(true);
    });
  });

  describe('no existing jsii configuration', () => {
    it('returns new config with empty values removed', async () => {
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(null, Buffer.from(JSON.stringify(packageJsonObject)));
        },
      );

      // checkbox for targets
      checkboxMock.mockResolvedValueOnce([]);
      // selects: tsconfig, stability, versionFormat
      selectMock
        .mockResolvedValueOnce('jsii-managed')
        .mockResolvedValueOnce('experimental')
        .mockResolvedValueOnce('short');
      // inputs: types, tsc.outDir
      inputMock
        .mockResolvedValueOnce('index.d.ts')
        .mockResolvedValueOnce('dist');
      // confirm
      confirmMock.mockResolvedValueOnce(true);

      const subject = await jsiiConfig('./package.json');
      expect(subject).toEqual({
        ...packageJsonObject,
        stability: 'experimental',
        types: 'index.d.ts',
        jsii: {
          versionFormat: 'short',
          tsc: {
            outDir: 'dist',
          },
        },
      });
    });
  });

  describe('existing configuration', () => {
    const existingConfig = {
      stability: Stability.Experimental,
      types: 'TYPES',
      jsii: {
        tsc: {
          outDir: 'OUTDIR',
        },
        versionFormat: 'short' as const,
        targets: {
          java: {
            package: 'JAVA_PACKAGE',
            maven: {
              groupId: 'JAVA_MAVEN_GROUPID',
              artifactId: 'JAVA_MAVEN_ARTIFACTID',
            },
          },
          dotnet: {
            namespace: 'DOTNET_NAMESPACE',
            packageId: 'DOTNET_PACKAGEID',
            iconUrl: 'DOTNET_ICONURL',
          },
          python: {
            distName: 'PYTHON_DISTNAME',
            module: 'PYTHON_MODULE',
          },
        },
        metadata: {
          'jsii:boolean': true,
          'jsii:number': 1337,
        },
      },
    };

    it('uses existing values as prompt defaults', () => {
      const questions = getQuestions({
        ...packageJsonObject,
        ...existingConfig,
      });
      const defaultMap: { [key: string]: any } = {
        jsiiTargets: ['java', 'dotnet', 'python'],
        stability: 'experimental',
        types: 'TYPES',
        ['jsii.tsc.outDir']: 'OUTDIR',
        ['jsii.versionFormat']: 'short',
        ['jsii.targets.java.package']: 'JAVA_PACKAGE',
        ['jsii.targets.java.maven.groupId']: 'JAVA_MAVEN_GROUPID',
        ['jsii.targets.java.maven.artifactId']: 'JAVA_MAVEN_ARTIFACTID',
        ['jsii.targets.python.distName']: 'PYTHON_DISTNAME',
        ['jsii.targets.python.module']: 'PYTHON_MODULE',
        ['jsii.targets.dotnet.namespace']: 'DOTNET_NAMESPACE',
        ['jsii.targets.dotnet.packageId']: 'DOTNET_PACKAGEID',
        ['jsii.targets.dotnet.iconUrl']: 'DOTNET_ICONURL',
      };

      Object.entries(defaultMap).forEach((entry: [string, any]) => {
        const [name, defaultVal] = entry;
        const subject = findQuestion(name, questions);

        expect(subject).toHaveProperty('default', defaultVal);
      });
    });

    it('preserves existing jsii metadata fields', async () => {
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(
            null,
            Buffer.from(
              JSON.stringify({
                ...packageJsonObject,
                ...existingConfig,
              }),
            ),
          );
        },
      );

      // checkbox for targets (java, dotnet, python are current)
      checkboxMock.mockResolvedValueOnce([]);
      // selects: tsconfig, stability, versionFormat
      selectMock
        .mockResolvedValueOnce('jsii-managed')
        .mockResolvedValueOnce('stable')
        .mockResolvedValueOnce('short');
      // inputs: types, tsc.outDir
      inputMock
        .mockResolvedValueOnce('new_types.d.ts')
        .mockResolvedValueOnce('dist');
      // confirm
      confirmMock.mockResolvedValueOnce(true);

      const subject = await jsiiConfig('./package.json');
      expect(subject).toEqual({
        ...packageJsonObject,
        stability: 'stable',
        types: 'new_types.d.ts',
        jsii: {
          tsc: {
            outDir: 'dist',
          },
          versionFormat: 'short',
          metadata: {
            'jsii:boolean': true,
            'jsii:number': 1337,
          },
        },
      });
    });
  });

  describe('edit config', () => {
    it('prompts user again with previous answers if confirmation is declined', async () => {
      readJsonMock.mockImplementation(
        (_path: string, cb: (...args: any[]) => void) => {
          cb(null, Buffer.from(JSON.stringify(packageJsonObject)));
        },
      );

      // First round
      checkboxMock.mockResolvedValueOnce(['python']);
      selectMock
        .mockResolvedValueOnce('jsii-managed')
        .mockResolvedValueOnce('experimental')
        .mockResolvedValueOnce('short');
      inputMock
        .mockResolvedValueOnce('index.d.ts')
        .mockResolvedValueOnce('PYTHON_DISTNAME')
        .mockResolvedValueOnce('PYTHON_MODULE')
        .mockResolvedValueOnce('OUTDIR');
      // Decline first confirmation
      confirmMock.mockResolvedValueOnce(false);

      // Second round (re-prompted with previous answers as defaults)
      checkboxMock.mockResolvedValueOnce(['python']);
      selectMock
        .mockResolvedValueOnce('jsii-managed')
        .mockResolvedValueOnce('experimental')
        .mockResolvedValueOnce('short');
      inputMock
        .mockResolvedValueOnce('index.d.ts')
        .mockResolvedValueOnce('PYTHON_DISTNAME')
        .mockResolvedValueOnce('PYTHON_MODULE')
        .mockResolvedValueOnce('OUTDIR');
      // Accept second confirmation
      confirmMock.mockResolvedValueOnce(true);

      const subject = await jsiiConfig('./package.json');
      expect(subject).toHaveProperty(
        'jsii.targets.python.distName',
        'PYTHON_DISTNAME',
      );
      expect(subject).toHaveProperty(
        'jsii.targets.python.module',
        'PYTHON_MODULE',
      );
    });
  });
});
