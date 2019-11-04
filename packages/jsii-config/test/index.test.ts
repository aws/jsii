import * as fs from 'fs';
import * as inquirer from 'inquirer';
import buildQuestions from '../lib/questions';
import main from '../lib';
import { findQuestions, findQuestion } from './util';

describe('jsii-config', () => {
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

  describe('no existing configuration', () => {
    const promptMock = jest.fn();
    const readJsonMock = jest.fn();
    const writeJsonMock = jest.fn();

    const packageJson = {
      key1: 'value1',
    };

    const config = {
      outdir: 'dist',
      versionFormat: 'short',
    };

    beforeEach(() => {
      promptMock.mockResolvedValueOnce({
        jsiiTargets: [],
        ...config
      }).mockResolvedValueOnce({
        confirm: true
      });

      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from(JSON.stringify(packageJson)));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });

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

    it('prompts user for top level jsii config and language targets', async () => {
      await main();
      const questions = promptMock.mock.calls[0][0];
      const [outdir, versionFormat, targets] = findQuestions(['outdir', 'versionFormat', 'jsiiTargets'], questions);
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
        'targets.java.package',
        'targets.java.maven.groupId',
        'targets.java.maven.artifactId',
        'targets.java.maven.versionSuffix'
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
        'targets.python.module',
        'targets.python.distName'
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
        'targets.dotnet.namespace',
        'targets.dotnet.packageId',
        'targets.dotnet.iconUrl',
        'targets.dotnet.versionSuffix',
        'targets.dotnet.signAssembly'
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
      const subject = findQuestion('targets.dotnet.assemblyOriginatorKeyFile', questions);
      const enabled = {
        jsiiTargets: ['dotnet'],
        targets: {
          dotnet: {
            signAssembly: true
          }
        }
      };

      const disabled = {
        jsiiTargets: ['dotnet'],
        targets: {
          dotnet: {
            signAssembly: false
          }
        }
      };

      expect(subject.when(enabled)).toBe(true);
      expect(subject.when(disabled)).toBe(false);
    });

    it('writes new config to package.json passed', async () => {
      await main();

      expect(writeJsonMock).toHaveBeenCalledWith('./package.json', JSON.stringify({
        ...packageJson,
        jsii: config
      }, null, 2), expect.anything());
    });
  });

  describe('existing configuration', () => {
    const promptMock = jest.fn();
    const readJsonMock = jest.fn();
    const writeJsonMock = jest.fn();
    
    const existingConfig = {
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
    };

    const config = {
      outdir: 'dist',
      versionFormat: 'short'
    };

    beforeEach(() => {
      promptMock
        .mockResolvedValueOnce(config)
        .mockResolvedValueOnce({
          confirm: true
        });

      readJsonMock.mockImplementation((_path, cb) => {
        cb(null, Buffer.from(JSON.stringify({
          jsii: existingConfig
        })));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });

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

    it('uses existing values as prompt defaults', async () => {
      await main();
      const defaultMap: { [key: string]: any } = {
        outdir: 'OUTDIR',
        versionFormat: 'short',
        jsiiTargets: ['java', 'dotnet', 'python'],
        ['targets.java.package']: 'JAVA_PACKAGE',
        ['targets.java.maven.groupId']: 'JAVA_MAVEN_GROUPID',
        ['targets.java.maven.artifactId']: 'JAVA_MAVEN_ARTIFACTID',
        ['targets.python.distName']: 'PYTHON_DISTNAME',
        ['targets.python.module']: 'PYTHON_MODULE',
        ['targets.dotnet.namespace']: 'DOTNET_NAMESPACE',
        ['targets.dotnet.packageId']: 'DOTNET_PACKAGEID',
        ['targets.dotnet.iconUrl']: 'DOTNET_ICONURL'
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
        jsii: {
          ...config,
          metadata: {
            'jsii:boolean': true,
            'jsii:number': 1337
          }
        }
      }, null, 2), expect.anything());
    });
  });

  describe('edit config', () => {
    const promptMock = jest.fn();
    const readJsonMock = jest.fn();
    const writeJsonMock = jest.fn();
    const answers = {
      jsiiTargets: ['python'],
      outdir: 'OUTDIR',
      versionFormat: 'short',
      targets: {
        python: {
          distName: 'PYTHON_DISTNAME',
          module: 'PYTHON_MODULE'
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
        cb(null, Buffer.from(JSON.stringify({})));
      });

      writeJsonMock.mockImplementation((_path, _data, cb) => {
        cb(null);
      });

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
      writeJsonMock.mockRestore();
    });

    it('prompts user again with previous answers if confirmation is declined', async () => {
      await main();
      const defaultMap: { [key: string]: any } = {
        outdir: 'OUTDIR',
        versionFormat: 'short',
        jsiiTargets: ['python'],
        ['targets.python.distName']: 'PYTHON_DISTNAME',
        ['targets.python.module']: 'PYTHON_MODULE',
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
    it('builds prompt questions with no current config', () => {
      const subject = buildQuestions();
      expect(subject).toMatchSnapshot();
    });

    it('builds prompt questions with current config values as defaults', () => {
      const subject = buildQuestions({
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
      });
      expect(subject).toMatchSnapshot();
    });
  });
});
