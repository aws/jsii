import * as fs from 'fs';
import * as inquirer from 'inquirer';
import buildQuestions from '../lib/questions';
import main from '../lib';
import { packageJsonObject, findQuestions, findQuestion } from './util';

describe('jsii-config', () => {
  const promptMock = jest.fn();
  const readJsonMock = jest.fn();
  const writeJsonMock = jest.fn();

  beforeEach(() => {
    Object.defineProperty(fs, 'readFile', { value: readJsonMock });
    Object.defineProperty(inquirer, 'prompt', { value: promptMock });
    Object.defineProperty(fs, 'writeFile', { value: writeJsonMock });
  });

  afterEach(() => {
    promptMock.mockClear();
    readJsonMock.mockClear();
    writeJsonMock.mockClear();
  });

  afterAll(() => {
    promptMock.mockRestore();
    readJsonMock.mockRestore();
    writeJsonMock.mockClear();
  });

  describe('errors', () => {
    const readJsonMock = jest.fn();
    it('throws when package.json is invalid', async () => {
      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from('INVALID JSON STRING'));
      });
      Object.defineProperty(fs, 'readFile', { value: readJsonMock });

      await expect(main()).rejects.toThrow('Unexpected token I in JSON at position 0');
    });
  });

  describe('missing top level package fields', () => {
    const mockMissingField = (field: string) => readJsonMock.mockImplementation((_path, cb) => {
      cb(null, Buffer.from(JSON.stringify({
        ...packageJsonObject,
        [field]: undefined
      })));
    });

    const requiredNpmFields = [
      'name',
      'version',
      'repository',
      'main',
      'author'
    ];

    requiredNpmFields.forEach(field => {
      it(`warns user on missing ${field} in package.json and exits`, async () => {
        mockMissingField(field);
        await expect(main()).rejects.toThrow(
          `package.json is missing required fields:${'\n'
          }- ${field}${'\n'
          }run "npm init" or configure manually and retry jsii-config`
        );
      });
    });

  });

  describe('no existing jsii configuration', () => {
    const configAnswers = {
      stability: 'experimental',
      types: 'index.d.ts',
      jsii: {
        outdir: 'dist',
        versionFormat: 'short',
      }
    };

    beforeEach(() => {
      promptMock.mockResolvedValueOnce({
        jsiiTargets: [],
        ...configAnswers
      }).mockResolvedValueOnce({
        confirm: true
      });

      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from(JSON.stringify(packageJsonObject)));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });
    });

    it('prompts user for top level jsii config and language targets', async () => {
      await main();
      const questions = promptMock.mock.calls[0][0];
      const [
        stability,
        types,
        outdir,
        versionFormat,
        targets
      ] = findQuestions([
        'stability',
        'types',
        'jsii.outdir',
        'jsii.versionFormat',
        'jsiiTargets'
      ], questions);
      expect(stability).toHaveProperty('type', 'list');
      expect(stability).toHaveProperty('choices', ['experimental', 'stable', 'deprecated', 'external']);
      expect(stability).toHaveProperty('default', 'experimental');

      expect(types).toHaveProperty('type', 'input');
      expect(types).not.toHaveProperty('default');

      expect(outdir).toHaveProperty('type', 'input');
      expect(outdir).toHaveProperty('default', 'dist');

      expect(versionFormat).toHaveProperty('type', 'list');
      expect(versionFormat).toHaveProperty('choices', ['full', 'short']);

      expect(targets).toHaveProperty('type', 'checkbox');
      expect(targets).toHaveProperty('choices', ['java', 'python', 'dotnet']);
    });

    it('prompts for java specific values when only target enabled', async () => {
      await main();
      const enabled = { jsiiTargets: ['java'] };
      const disabled = { jsiiTargets: [] };
      const questions = promptMock.mock.calls[0][0];
      const subject = findQuestions([
        'jsii.targets.java.package',
        'jsii.targets.java.maven.groupId',
        'jsii.targets.java.maven.artifactId',
        'jsii.targets.java.maven.versionSuffix'
      ], questions);

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for python specific values only when target enabled', async () => {
      await main();
      const enabled = { jsiiTargets: ['python'] };
      const disabled = { jsiiTargets: [] };
      const questions = promptMock.mock.calls[0][0];
      const subject = findQuestions([
        'jsii.targets.python.module',
        'jsii.targets.python.distName'
      ], questions);

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for dotnet specific values only when target enabled', async () => {
      await main();
      const enabled = { jsiiTargets: ['dotnet'] };
      const disabled = { jsiiTargets: [] };
      const questions = promptMock.mock.calls[0][0];
      const subject = findQuestions([
        'jsii.targets.dotnet.namespace',
        'jsii.targets.dotnet.packageId',
        'jsii.targets.dotnet.iconUrl',
        'jsii.targets.dotnet.versionSuffix',
        'jsii.targets.dotnet.signAssembly'
      ], questions);

      subject.forEach((question: any) => {
        expect(question.when(enabled)).toBe(true);
      });

      subject.forEach((question: any) => {
        expect(question.when(disabled)).toBe(false);
      });
    });

    it('prompts for dotnet assembly originator file when target and signAssembly are enabled', async () => {
      await main();
      const questions = promptMock.mock.calls[0][0];
      const subject = findQuestion('jsii.targets.dotnet.assemblyOriginatorKeyFile', questions);
      const enabled = {
        jsiiTargets: ['dotnet'],
        jsii: {
          targets: {
            dotnet: {
              signAssembly: true
            }
          }
        }
      };

      const disabled = {
        jsiiTargets: ['dotnet'],
        jsii: {
          targets: {
            dotnet: {
              signAssembly: false
            }
          }
        }
      };

      expect(subject.when(enabled)).toBe(true);
      expect(subject.when(disabled)).toBe(false);
    });

    it('writes new config to package.json passed', async () => {
      await main();

      expect(writeJsonMock).toHaveBeenCalledWith('./package.json', JSON.stringify({
        ...packageJsonObject,
        ...configAnswers,
      }, null, 2), expect.anything());
    });
  });

  describe('existing configuration', () => {
    const existingConfig = {
      stability: 'experimental',
      types: 'TYPES',
      jsii: {
        outdir: 'OUTDIR',
        versionFormat: 'short',
        targets: {
          java: {
            package: 'JAVA_PACKAGE',
            maven: {
              groupId: 'JAVA_MAVEN_GROUPID',
              artifactId: 'JAVA_MAVEN_ARTIFACTID'
            }
          },
          dotnet: {
            namespace: 'DOTNET_NAMESPACE',
            packageId: 'DOTNET_PACKAGEID',
            iconUrl: 'DOTNET_ICONURL'
          },
          python: {
            distName: 'PYTHON_DISTNAME',
            module: 'PYTHON_MODULE'
          }
        },
        metadata: {
          'jsii:boolean': true,
          'jsii:number': 1337
        }
      }
    };

    const configAnswers = {
      stability: 'stable',
      types: 'new_types.d.ts',
      jsii: {
        outdir: 'dist',
        versionFormat: 'short'
      }
    };

    beforeEach(() => {
      promptMock
        .mockResolvedValueOnce(configAnswers)
        .mockResolvedValueOnce({
          confirm: true
        });

      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from(JSON.stringify({
          ...packageJsonObject,
          ...existingConfig
        })));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });
    });

    it('uses existing values as prompt defaults', async () => {
      await main();
      const defaultMap: { [key: string]: any } = {
        jsiiTargets: ['java', 'dotnet', 'python'],
        stability: 'experimental',
        types: 'TYPES',
        ['jsii.outdir']: 'OUTDIR',
        ['jsii.versionFormat']: 'short',
        ['jsii.targets.java.package']: 'JAVA_PACKAGE',
        ['jsii.targets.java.maven.groupId']: 'JAVA_MAVEN_GROUPID',
        ['jsii.targets.java.maven.artifactId']: 'JAVA_MAVEN_ARTIFACTID',
        ['jsii.targets.python.distName']: 'PYTHON_DISTNAME',
        ['jsii.targets.python.module']: 'PYTHON_MODULE',
        ['jsii.targets.dotnet.namespace']: 'DOTNET_NAMESPACE',
        ['jsii.targets.dotnet.packageId']: 'DOTNET_PACKAGEID',
        ['jsii.targets.dotnet.iconUrl']: 'DOTNET_ICONURL'
      };
      const questions = promptMock.mock.calls[0][0];

      Object.entries(defaultMap).forEach((entry: [string, any]) => {
        const [name, defaultVal] = entry;
        const subject = findQuestion(name, questions);

        expect(subject).toHaveProperty('default', defaultVal);
      });
    });

    it('preserves existing jsii metadata fields', async () => {
      await main();
      expect(writeJsonMock).toHaveBeenCalledWith('./package.json', JSON.stringify({
        ...packageJsonObject,
        ...configAnswers,
        jsii: {
          ...configAnswers.jsii,
          metadata: {
            'jsii:boolean': true,
            'jsii:number': 1337
          }
        }
      }, null, 2), expect.anything());
    });
  });

  describe('edit config', () => {
    const answers = {
      jsiiTargets: ['python'],
      jsii: {
        outdir: 'OUTDIR',
        versionFormat: 'short',
        targets: {
          python: {
            distName: 'PYTHON_DISTNAME',
            module: 'PYTHON_MODULE'
          }
        }
      }
    };

    beforeEach(() => {
      promptMock
        .mockResolvedValueOnce(answers)
        .mockResolvedValueOnce({
          confirm: false
        })
        .mockResolvedValueOnce(answers)
        .mockResolvedValueOnce({
          confirm: true
        });

      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from(JSON.stringify(packageJsonObject)));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });
    });

    it('prompts user again with previous answers if confirmation is declined', async () => {
      await main();
      const defaultMap: { [key: string]: any } = {
        jsiiTargets: ['python'],
        ['jsii.outdir']: 'OUTDIR',
        ['jsii.versionFormat']: 'short',
        ['jsii.targets.python.distName']: 'PYTHON_DISTNAME',
        ['jsii.targets.python.module']: 'PYTHON_MODULE',
      };
      const questions = promptMock.mock.calls[2][0];

      Object.entries(defaultMap).forEach((entry: [string, any]) => {
        const [name, defaultVal] = entry;
        const subject = findQuestion(name, questions);

        expect(subject).toHaveProperty('default', defaultVal);
      });
    });
  });

  describe('snapshots', () => {
    it('builds prompt questions with no current jsii config', () => {
      const subject = buildQuestions(packageJsonObject);
      expect(subject).toMatchSnapshot();
    });

    it('builds prompt questions with current config values as defaults', () => {
      const subject = buildQuestions({
        ...packageJsonObject,
        jsii: {
          outdir: 'dist',
          targets: {
            java: {
              package: 'software.amazon.jsii.tests.calculator.base',
              maven: {
                groupId: 'software.amazon.jsii.tests',
                artifactId: 'calculator-base'
              }
            },
            dotnet: {
              namespace: 'Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace',
              packageId: 'Amazon.JSII.Tests.CalculatorPackageId.BasePackageId'
            },
            python: {
              distName: 'scope.jsii-calc-base',
              module: 'scope.jsii_calc_base'
            }
          },
          versionFormat: 'short'
        }
      });
      expect(subject).toMatchSnapshot();
    });
  });
});
